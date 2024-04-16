import { useSelector } from "react-redux"
import {toast} from 'react-toastify'
import { redirect } from "react-router-dom"
import { FormDesc, Forminput, SubmitBtn } from "../components"
import { Form  } from "react-router-dom"
import FormCheckbox from "./FormCheckbox"
import FormSelect from "./FormSelect"
import { customFetch } from "../utils"

// export const action =  (store) => async ({request})=>{
//   const formData = await request.formData()
//   const data = Object.fromEntries(formData)
//   console.log(data);

// }


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
    featured: formData.get('featured') === 'false', // Convert string to boolean
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
    const BASE_IMAGE_URL = 'http://localhost:5000';
    const fullImageUrl = `${BASE_IMAGE_URL}${imageUrl}`;
    
  
    productData.image = fullImageUrl;
    console.log(productData);
    // send the product data to create the product
    const productResponse = await customFetch.post('/api/v1/products', productData, {
      withCredentials: true,
    });
    console.log(productResponse);
    // Reset the form after successful submission
    form.reset();
  } catch (error) {
    console.log(error);
  }
};

const CreateProduct = () => {
  return (
    <section className="h-screen flex flex-col justify-start">
      <Form onSubmit={handleSubmit} className="card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Create Product</h4>
        <Forminput type ='text' label='name' name='name'  />
        <Forminput type ='number' label='price' name='price' />
        {/* <Forminput type ='text' label='image' name='image'/> */}
        <Forminput type ='file' label='image' name='image'/> {/* Change input type to file */}

        <FormCheckbox name='featured' label='featureed' size ='checkbox-sm'
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
    </section>
  )
}


export default CreateProduct