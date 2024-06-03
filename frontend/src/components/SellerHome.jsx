import React from 'react';
import { Link } from 'react-router-dom';
import seller1 from '../assets/seller1.png';

const SellerHome = () => {
  return (
    <section className='align-element grid grid-cols-2'>
      <div className='flex flex-col justify-center'>
        <h1 className='text-3xl font-bold mb-4'>Welcome, Seller!</h1>
        <p className='text-lg mb-6'>This is your seller home page. Manage products from here.</p>
        <Link to='/createproduct' className='btn btn-primary'>Go to Create Product</Link>
      </div>
      <div className='flex justify-center'>
        <img src={seller1} alt='Seller' className='object-cover w-full max-h-full' />
      </div>
    </section>
  );
};

export default SellerHome;
