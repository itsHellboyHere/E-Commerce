import { useLoaderData } from 'react-router-dom';
import { formatPrice, customFetch ,genrateAmountOptions} from '../utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';


const singleProductQuery =(id) =>{
  return {
    queryKey :['singleProduct',id],
    queryFn : () => customFetch( `/api/v1/products/${id}`),
  };
}
export const loader = (queryClient) => async ({params}) =>{
  const response = await queryClient.ensureQueryData(singleProductQuery(params.id));
  return {product:response.data};
}
const SingleProduct = () => {
  const {product} = useLoaderData();
  const {image,name,price ,description ,colors ,company ,id ,numOfReviews ,averageRating} =product.product
  
  console.log(numOfReviews);
  const dollarAmount = formatPrice(price);
  const[productColor,setProductColor] =useState(colors[0])
  const[amount,setAmount] =useState(1)
  const handleAmount =(e) =>{
    setAmount(parseInt(e.target.value))
  }
  const cartProduct ={
    cartID: id + productColor,
    product:id,
    image,
    name,
    price,
    company,
    productColor,
    amount,
  }
console.log(cartProduct);
  const dispatch =useDispatch()

  const addToCart =()=>{
    dispatch(addItem({product:cartProduct}))
  }

  const renderRatingStars = () => {
    const filledStars = Math.floor(averageRating);
    const emptyStars = 5 - filledStars;
    const ratingStars = [];

    for (let i = 0; i < filledStars; i++) {
      ratingStars.push(<input key={`star-${i}`} type="radio" name="rating" className="mask mask-star-2 bg-orange-400" checked />);
    }

    for (let i = 0; i < emptyStars; i++) {
      ratingStars.push(<input key={`star-${filledStars + i}`} type="radio" name="rating" className="mask mask-star-2 bg-gray-300" />);
    }

    return <div className="rating">{ratingStars}</div>;
  };


  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Product</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE */}
        <img src={image} alt={name} className='w-96 h-96 object-cover rounded-lg lg:w-full'/>
        {/* PRODUCT */}
        <div>
          <h1 className='capitalize text-3xl font-bold '>{name}</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2'>{company}</h4>
          <p className='mt-3 text-xl '>{dollarAmount}</p>
          <p className='mt-6 leading-8'>{description}</p>
          {/* COLORS */}
          <div className='mt-6'>
            <h4 className='text-md font-medium tracking-wider capitalize'>
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color)=>{
                return <button key={color} type='button' className={`badge w-6 h-6 
                mr-2 ${color === productColor && 'border-2 border-secondary'}`}
                style={{backgroundColor:color}}
                onClick={()=>setProductColor(color)}
                ></button>
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className='form-control w-full max-w-xs '>
            <label  className='label' htmlFor='amount'>
              <h4 className='text-md font-medium tracking-wider capitalize'>
                amount
              </h4>
            </label>
              <select className='select select-secondary select-bordered select-md' id='amount'
              value={amount} onChange={handleAmount} >
               {genrateAmountOptions(20)}
              </select>
            
          </div>
          {/* RATING */}
          <div className='flex items-center mt-4'>
            {renderRatingStars()}
            <span className='text-sm ml-2'>{numOfReviews} Ratings</span>
          </div>
          {/* CART BUTTON */}
          <div className="mt-10">
            <button  className='btn btn-secondary btn-md'
            onClick={addToCart}>
              Add to bag
            </button>
          </div>
          
        </div>
      </div>
    </section>
  )
}
export default SingleProduct