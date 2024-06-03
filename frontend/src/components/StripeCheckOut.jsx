import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import {useNavigate } from "react-router-dom"
import { customFetch } from '../utils';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import {clearCart}  from '../features/cart/cartSlice'
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';


const promise = loadStripe("pk_test_51P3DfASAPzvmDmqwGHKbK8awfaVHvwJv3Ih5ThDBd5tgTwFR37XVA5xTFlw8WFMdZRuMMjdetxXjviNs6KDxGpZl00nIJOMU65");
const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
   const user = useSelector((state)=>state.userState.user);
      const cartItems = useSelector((state)=>state.cartState.cartItems);
      const tax = useSelector((state)=>state.cartState.tax);
      const shipping = useSelector((state)=>state.cartState.shipping);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    const info = {
      items:cartItems,
      tax,
      shippingFee:shipping,
      address,
      name,
    }
  
    const cardElement = elements.getElement(CardElement);
    
    setProcessing(true);
    
    try {
      const res = await customFetch.post('api/v1/orders',info,{withCredentials:true})
      
      const client_secret = res.data.clientSecret;
   
      const { error, paymentMethod } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
        },
      });
      
      if (error) {
        setError(error.message);
        toast.error(error.message,'Order Failed')
      } else {
       
        // Payment successful
            const orderId = res.data.order._id; // Extract order ID from the response
            const paymentIntentId = res.data.clientSecret; // Assuming paymentMethod contains the payment intent ID
            updateOrderStatus(orderId, paymentIntentId);
            toast.success('Order Placed  Successfully!')
            dispatch(clearCart());
            navigate('/orders/showAllMyOrders');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };
  const updateOrderStatus = async (orderId, paymentIntentId) => {
    try {
        // Send a request to update the order status with the payment intent ID
       const res= await customFetch.patch(`api/v1/orders/${orderId}`, { paymentIntentId }, { withCredentials: true });
       
    } catch (error) {
        console.error('Error updating order status:', error);
        
    }
};
  return (
    <form onSubmit={handleSubmit} className='px-10 align-element'>
      <div>
        <label htmlFor="name">Name</label>
        <input 
          className='text-neutral'
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
        className='text-neutral'
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <CardElement className='text-base-200 mt-7 p-6 h-4  shadow-md'/>
        <div className="mt-4 mb-4">
        <p>Use the following test card for payment:</p>
        <p className="font-bold">Card Number: 4000 0035 6000 0008</p>
        <p>Exp: 12/34  CVC: 123</p>
      </div>
      <button type="submit" disabled={!stripe || processing} className='mt-4'>
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

const StripeCheckOut = () => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
    background-color: #ffffff; /* Set background color to white */
    color: #333333; /* Set text color to dark */
  }
  
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: #ffffff; /* Set input background color to white */
    color: #333333; /* Set input text color to dark */
    box-sizing: border-box;
  }
   @media (prefers-color-scheme: dark) {
    form {
      background-color: #333333; /* Set background color to dark */
      color: #ffffff; /* Set text color to light */
    }
    
    input {
      background: #333333; /* Set input background color to dark */
      color: #ffffff; /* Set input text color to light */
      border-color: #666666; /* Set input border color to a lighter shade */
    }
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

export default StripeCheckOut;