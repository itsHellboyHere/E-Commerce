import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { clearCart } from "../features/cart/cartSlice"
import { logoutUser } from "../features/user/userSlice"
import {useQueryClient} from '@tanstack/react-query'
import { customFetch } from "../utils"
import {toast} from 'react-toastify'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = useSelector((state)=>state.userState.user);
  const handleLogout = async()=>
  {
    try {
       const response= await customFetch.get('/api/v1/auth/logout',{
      // withCredentials:true,
    })
    if(response.status=== 200){
      console.log(response);
    navigate('/')
    dispatch(clearCart())
    dispatch(logoutUser())
    queryClient.removeQueries();
    }
    } catch (error) {
      const errroMessage=error?.response?.data;
      toast.error(errroMessage)
    }
   
   
  }
  return (
    <header className="bg-neutral py-2 text-neutral-content">
        <div className="align-element flex justify-center sm:justify-end"> 
        {user ? (<div className="flex gap-x-2 sm:gap-x-8 items-center">
          <p className="text-xs sm:text-sm"> Hello, {user.name}
            </p> 
            <button className="btn btn-xs btn-outline btn-primary" onClick={handleLogout}>
            logout
            </button>
            </div>):(
              <div className="flex gap-x-6 justify-center items-center">
       <Link to='/login' className='link link-hover text-xs sm:text-sm'>
        Sign in
       </Link>
       <Link to='/register' className='link link-hover text-xs sm:text-sm'>
        Create Account
       </Link>
       </div>
            )
            }
       {/* USER */}
       {/* LINK */}
       

        </div>
    </header>
  )
}
export default Header