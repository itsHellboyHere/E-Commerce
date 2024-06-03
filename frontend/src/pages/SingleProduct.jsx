import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { formatPrice, customFetch, generateAmountOptions } from '../utils';
import { useState } from 'react';
import { addItem } from '../features/cart/cartSlice';
import axios from 'axios';
import { toast } from "react-toastify";

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/api/v1/products/${id}`),
  };
};

export const loader = (queryClient) => async ({ params }) => {
  const response = await queryClient.ensureQueryData(singleProductQuery(params.id));
  return { product: response.data };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, name, price, description, colors, company, id, numOfReviews, averageRating ,category } = product.product;

  const user = useSelector((state) => state.userState.user);
  const dollarAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: id + productColor,
    product: id,
    image,
    name,
    price,
    company,
    productColor,
    amount,
  };

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  const renderRatingStars = () => {
    const filledStars = Math.floor(averageRating);
    const emptyStars = 5 - filledStars;
    const ratingStars = [];

    for (let i = 0; i < filledStars; i++) {
      ratingStars.push(<input key={`star-${i}`} type="radio" name="rating" className="mask mask-star-2 bg-orange-400" checked readOnly />);
    }

    for (let i = 0; i < emptyStars; i++) {
      ratingStars.push(<input key={`star-${filledStars + i}`} type="radio" name="rating" className="mask mask-star-2 bg-gray-300" readOnly />);
    }

    return <div className="rating">{ratingStars}</div>;
  };

  const handleDelete = async () => {
    try {
      await customFetch.delete(`/api/v1/products/${id}`);
      toast.success('Product deleted')
      navigate('/');
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleUpdate = () => {
    navigate(`/seller/products/${id}/edit`);
  };

  return (
    <section className='align-element p-12'>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          
          {user?.role === 'seller' ? (
            <li>
              <Link to='/seller'>MyProducts</Link>
            </li>
          ) : (
            <li>
              <Link to='/products'>Product</Link>
            </li>
          )}
        </ul>
      </div>
      {/* PRODUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE */}
        <img src={image} alt={name} className='w-96 h-96 object-cover rounded-lg lg:w-full' />
        {/* PRODUCT */}
        <div>
          <h1 className='capitalize text-3xl font-bold '>{name}</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2'>{company}</h4>
          <h4 className='text-xl text-neutral-content font-bold mt-2'><span className="text-xl text-sky-900">Type </span>{category}</h4>
          <p className='mt-3 text-xl '>{dollarAmount}</p>
          <p className='mt-6 leading-8'>{description}</p>
          {/* COLORS */}
          <div className='mt-6'>
            <h4 className='text-md font-medium tracking-wider capitalize'>
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button key={color} type='button' className={`badge w-6 h-6 mr-2 ${color === productColor && 'border-2 border-secondary'}`} style={{ backgroundColor: color }} onClick={() => setProductColor(color)}></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className='form-control w-full max-w-xs '>
            <label className='label' htmlFor='amount'>
              <h4 className='text-md font-medium tracking-wider capitalize'>
                amount
              </h4>
            </label>
            <select className='select select-secondary select-bordered select-md' id='amount' value={amount} onChange={handleAmount} >
              {generateAmountOptions(20)}
            </select>
          </div>
          {/* RATING */}
          <div className='flex items-center mt-4'>
            {renderRatingStars()}
            <span className='text-sm ml-2'>{numOfReviews} Ratings</span>
          </div>
          {/* CART BUTTON */}
          {((user?.role !== 'seller') && (user?.role !== 'admin')) && (
            <div className="mt-10">
              <button className='btn btn-secondary btn-md' onClick={addToCart}>
                Add to bag
              </button>
            </div>
          )}
          
          {/* UPDATE & DELETE BUTTONS FOR SELLER */}
          {user?.role === 'seller' && (
            <div className="mt-4 flex gap-4">
              <button className='btn btn-warning btn-md' onClick={handleUpdate}>
                Update
              </button>
              <button className='btn btn-error btn-md' onClick={() => setIsModalOpen(true)}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-4">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                No
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleProduct;
