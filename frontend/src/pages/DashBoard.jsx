import { useSelector } from "react-redux"
import { DashBoardCom } from "../components"
import { toast } from "react-toastify"
import { redirect, useLoaderData } from "react-router-dom"
import { customFetch } from "../utils"
export const loader = (store) => async () =>{
  const user = store.getState().userState.user
  
  if(!user){
    toast.warn('You must be logged in to see the dashboard');
    return redirect('/login')
  }
  
   if (user.role === 'user' || user.role === 'sellers') {
    toast.warn(' cannot see dashboard');
    return redirect('/');
  }
  const res = await customFetch.get('/api/v1/users',{
    withCredentials:true,
  })
  const orders = await customFetch.get('/api/v1/orders',{withCredentials:true})
  const totalOrders =orders.data.totalOrders
  // console.log(totalOrders);
  const products = await customFetch.get('/api/v1/products')

  const {total} =products.data.metadata;
  
  return {res,totalOrders,total};
}
const DashBoard = () => {
//   const user = useSelector((state) => state.userState.user);

//   if(user&&  user.role==='sller'){
//     return null;
//   } 

  return (
    <DashBoardCom/>
  )
}
export default DashBoard