
import {  useSelector } from "react-redux/es/hooks/useSelector"
import { CartItemsList ,SectionTitle ,CartTotals } from "../components"
import { Link } from "react-router-dom"
import {toast} from 'react-toastify'
import { redirect } from "react-router-dom"

export const loader = (store) => () =>{
  const user = store.getState().userState.user
   if (user?.role === 'seller') {
    toast.warn('seller can not see cart');
    return redirect('/');
  }
  return null;
}

const Cart = () => {
  const user = useSelector((state)=>state.userState.user);
   
  const numItemsInCart =useSelector( (state)=> state.cartState.numItemsInCart)
  
  if(numItemsInCart === 0){
    return <SectionTitle text='Your cart is empty' />
  }
  return (
    <>
    <SectionTitle text='Shopping Cart'/>
    <div className="mt-8 grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <CartItemsList/>
      </div>
      <div className="lg:col-span-4 lg:pl-4">
        <CartTotals/>
        {user? (
        <Link to='/checkout' className="btn btn-primary btn-block mt-8 capitalize">
          proceed to checkout
        </Link> 
        ):(
         <Link to='/login' className="btn btn-primary btn-block mt-8 capitalize">
         please login 
        </Link> 
        )}
      </div>
    </div>
    </>
  )
}
export default Cart