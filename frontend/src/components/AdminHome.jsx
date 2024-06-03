import React from 'react';
import { Link } from 'react-router-dom';
import admin from '../assets/admin.png';

const AdminHome = () => {
  return (
    <section className='align-element grid grid-cols-2'>
      <div className='flex flex-col justify-center'>
        <h1 className='text-3xl font-bold mb-4'>Welcome, Admin!</h1>
        <p className='text-lg mb-6'>This is your Admin home page. Manage products, users,orders from here.</p>
        <Link to='/dashboard' className='btn btn-primary'>Go to DashBoard</Link>
      </div>
      <div className='flex justify-center'>
        <img src={admin} alt='Seller' className='object-cover w-full max-h-full' />
      </div>
    </section>
  );
};

export default AdminHome;
