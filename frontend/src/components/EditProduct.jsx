import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import FormSelect from './FormSelect';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    colors: [],
    company: '',
    category:'',
    image: '',
    featured:false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await customFetch(`/api/v1/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [id]);

   const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customFetch.patch(`/api/v1/products/${id}`, product);
      toast.success('Product updated')
      navigate('/seller');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors</label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={product.colors.join(', ')}
            onChange={(e) => setProduct({ ...product, colors: e.target.value.split(', ') })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
       <div className='form-control w-full'>
            <label className='label' htmlFor='company'>
              <span className='label-text'>Company</span>
            </label>
            <select
              id='company'
              name='company'
              value={product.company}
              onChange={handleChange}
              className='select select-bordered select-sm w-full'
            >
              <option value='' disabled>Select Company</option>
              <option value='ikea'>Ikea</option>
              <option value='liddy'>Liddy</option>
              <option value='marcos'>Marcos</option>
            </select>
          </div>
          <div className='form-control w-full'>
            <label className='label' htmlFor='category'>
              <span className='label-text'>Category</span>
            </label>
            <select
              id='category'
              name='category'
              value={product.category}
              onChange={handleChange}
              className='select select-bordered select-sm w-full'
            >
              <option value='' disabled>Select Category</option>
              <option value='office'>Office</option>
              <option value='kitchen'>Kitchen</option>
              <option value='bedroom'>Bedroom</option>
              <option value='dining'>Dining</option>
              <option value='home'>Home</option>
            </select>
          </div>
        <div className="form-group">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="featured" className="block text-sm font-medium text-gray-700">Featured</label>
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={product.featured}
            onChange={handleChange}
            className="mt-1 block"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
