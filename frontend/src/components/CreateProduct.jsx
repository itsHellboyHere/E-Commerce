import { useSelector } from "react-redux"
import {toast} from 'react-toastify'
import { redirect, useNavigate } from "react-router-dom"
import { FormDesc, Forminput, SubmitBtn } from "../components"
import { Form  } from "react-router-dom"
import FormCheckbox from "./FormCheckbox"
import FormSelect from "./FormSelect"
import { customFetch } from "../utils"
import create from '../assets/create.png'




 
const CreateProduct = () => {
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const colorsInput = formData.get('colors');
  const colors = colorsInput.split(',').map(color => color.trim());
  
  // Get the file from the input field
  const imageFile = formData.get('image');
  // Create a new FormData object to send the image file separately
  const imageFormData = new FormData();
  imageFormData.append('image', imageFile);

  const productData = {
    name: formData.get('name'),
    price: formData.get('price'),
    colors: colors,
    featured: formData.get('featured'), // Convert string to boolean
    description: formData.get('description'),
    category: formData.get('category'),
    company: formData.get('company'),

  };

  try {
    // First, upload the image file
    const imageResponse = await customFetch.post('/api/v1/products/uploadImage', imageFormData, {
      withCredentials: true,
    });
    const imageUrl = imageResponse.data.image;

    // Combine the base URL with the image URL
    // const BASE_IMAGE_URL = 'https://plushheaven.onrender.com';
    const BASE_IMAGE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const fullImageUrl = `${BASE_IMAGE_URL}${imageUrl}`;
    // console.log(fullImageUrl);
  
    productData.image = fullImageUrl;
    // console.log(productData);
    // send the product data to create the product
    const productResponse = await customFetch.post('/api/v1/products', productData, {
      withCredentials: true,
    });
    toast.success('Product Created ')
    // Reset the form after successful submission
    form.reset();
    navigate('/seller');
  } catch (error) {
    toast.error('please try again');
  }
};

  return (
    <section className="align-element  h-screen  grid grid-cols-2 gap-3">
      <Form onSubmit={handleSubmit} className="card min-w-fit p-4 bg-base-100 shadow-lg flex flex-col gap-y-2">
        <h4 className="text-center text-3xl font-bold">Create Product</h4>
        <Forminput type ='text' label='name' name='name'  />
        <Forminput type ='number' label='price' name='price' />
        {/* <Forminput type ='text' label='image' name='image'/> */}
        <Forminput type ='file' label='image' name='image'/> {/* Change input type to file */}

        <FormCheckbox name='featured' label='featured' size ='checkbox-sm'
      defaultValue={false} />
      <Forminput type= 'text' label="colors"  name='colors' placeholder='separate by comma' id='colors' />
      <FormDesc label="Description" name="description" defaultValue="" size="small" rows={5} />
      <FormSelect label='company'
      name='company' list={['ikea','liddy','marcos',]}
      size='select-sm'
      defaultValue=''
      ></FormSelect>
      <FormSelect label='category'
      name='category' list={['office', 'kitchen', 'bedroom', 'dining', 'home']}
      size='select-sm'
      defaultValue=''
      ></FormSelect>
      <div className="mt-4">
          <SubmitBtn text='create' />
          
        </div>
    </Form>
      <div> 
      <img src={create} className="hidden  md:flex object-cover"></img>
    </div>
    </section>
  )
}


export default CreateProduct