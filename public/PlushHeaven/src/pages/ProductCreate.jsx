import { useSelector } from "react-redux"
import {toast} from 'react-toastify'
import { redirect } from "react-router-dom"
import { CreateProduct, Forminput } from "../components"
import { Form  } from "react-router-dom"
import FormCheckbox from "../components/FormCheckbox"

 export const loader = (store) => () =>{
  const user = store.getState().userState.user
  // console.log(user.role);
  if(!user){
    toast.warn('You must be logged in');
    return redirect('/login')
  }

   if (user?.role !== 'seller') {
    toast.warn('Only seller is allowed to createProduct');
    return redirect('/');
  }
  return null;
}

const ProductCreate = () => {

 
  return (
    <CreateProduct/>
    
  )
}
export default ProductCreate