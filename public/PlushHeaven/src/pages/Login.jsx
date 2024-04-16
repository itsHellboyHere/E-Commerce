import {Forminput,SubmitBtn}  from "../components"
import { Form ,Link } from "react-router-dom"
import {toast} from 'react-toastify'
import { loginUser } from "../features/user/userSlice" 
import { useDispatch } from "react-redux"
import { redirect } from "react-router-dom"
import axios from 'axios'
import { customFetch } from "../utils"


export const action =  (store) => async ({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  // console.log(data);
  try {
    const login = await customFetch.post('/api/v1/auth/login',data,{
      withCredentials:true,
    })
    console.log(login);
 
    const response = await customFetch.get('api/v1/users/showMe',{
      withCredentials:true,
    })
    console.log(response);
    store.dispatch(loginUser(login.data))
    toast.success('logged in successfully')
    return redirect('/')
    
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.msg || 'please double check your credentials'
    toast.error(errorMessage);
     return null;
  }
}

const Login = () => {
  
  return (
    <section className="h-screen grid place-items-center">
      <Form method="post" className="card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold ">Login</h4>
        <Forminput type= 'email' label='email' name='email' />
        <Forminput type='password' 
        label='password'
         name='password'
        />
        <div className="mt-4">
          <SubmitBtn text='login' />
          
        </div>
        {/* <button type='button' className="btn btn-secondary btn-block">
            guest user
          </button> */}
          <p className="text-center ">
            Not a member yet? <Link to='/register' className="ml-2 link link-hover link-primary capitalize">
              register
              </Link>
          </p>
    </Form>
    </section>
  )
}
export default Login