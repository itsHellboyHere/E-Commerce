
import { useSelector } from "react-redux"
import { SectionTitle ,CartTotals, StripeCheckOut } from "../components"
import {toast} from 'react-toastify'
import { redirect } from "react-router-dom"
import axios from "axios"



export const loader = (store) => () =>{
  const user = store.getState().userState.user
  if(!user){
    toast.warn('You must be logged in to checkout');
    return redirect('/login')
  }
   if (user?.role === 'seller' || user?.role ==='admin') {
    toast.warn('Not allowed to checkout');
    return redirect('/');
  }
  return null;
}





const Checkout = () => {
  const cartTotal = useSelector((state)=>state.cartState.cartTotal)
  
  const cartItems=useSelector((state)=>state.cartState.cartItems)
  
  if(cartTotal === 0 || cartTotal <=0){
    return <SectionTitle text='Your Cart is Empty'/>
  }
  return (
    <>
    <SectionTitle text='place your order'/>
    <div className="mt-8 grid gap-8 md:grid-cols-2 items-start align-element">
      <StripeCheckOut />
      <CartTotals/>
    </div>
    </>
  )
}
export default Checkout