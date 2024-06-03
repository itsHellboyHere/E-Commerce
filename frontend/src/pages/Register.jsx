import {Forminput,SubmitBtn}  from "../components"
import { Form ,Link, redirect } from "react-router-dom"
// import { customFetch } from "../utils"
import { toast } from "react-toastify"

import { customFetch } from "../utils"
import register from '../assets/register.png'

export const action = async ({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const response = await customFetch.post('/api/v1/auth/register',data,{withCredentials:true})

    toast.success('Account Created Successfully')
    return redirect('/login')
  } catch (error) {
    
    const errorMessage = error?.response?.data?.msg || 'please double check your credentials'
    toast.error(errorMessage);
     return null;
  }
 
}

const Register = () => {
  return (
    <section className="h-screen grid place-items-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold"> Register</h4>
        <Forminput type ='text' label='name' name='name'  />
        <Forminput type ='email' label='email' name='email'  />
        <Forminput type ='password' label='password' name='password'  />
        <div className="mt-4">
          <SubmitBtn text='register'></SubmitBtn>
        </div>
        <p className="text-center ">
            Already a member? <Link to='/login' className="ml-2 link link-hover link-primary capitalize">
              login
              </Link>
          </p>
          <p className="text-center ">
            Register as a Seller? <Link to='/register/seller' className="ml-2 link link-hover link-primary capitalize">
              Register
              </Link>
          </p>
      </Form>
      <div className="hidden md:flex justify-center items-center">
          <img src={register} alt="Register" className="w-auto object-cover" /> 
        </div>
</div>
    </section>
  )
}
export default Register