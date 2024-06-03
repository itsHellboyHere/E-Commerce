import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  {id:3,url:'dashboard',text:'dashboard'},
  { id: 4, url: 'createproduct', text: 'Create' },
  { id: 5, url: 'products', text: 'products' },
  {id:6 , url:'seller' ,text:'myproducts'},
  { id: 7, url: 'cart', text: 'cart' },
  { id: 8 ,url: 'checkout', text: 'checkout' },
  { id: 9, url: 'orders/showAllMyOrders', text: 'orders' },
  
];

const NavLinks = () => {
  const user = useSelector((state)=>state.userState.user);
 
  return (
    <>
    {links.map((link)=>{
        const {id,url,text} =link;
        // if ((user?.role === 'seller' && (url === 'checkout'|| url=== 'cart' || url==='about' || url==='dashboard' || url ==='orders/showAllMyOrders')) ||
        //     (!user && (url === 'checkout' || url==='cart') || url==='dashboard' )) {
        //   return null;
        // }
        // if ((user?.role === 'admin' && (url === 'checkout'|| url=== 'createproduct' || url==='about' || url==='cart' )) ||
        //     (!user && (url === 'checkout' || url==='cart') )) {
        //   return null;
        // }
        // // if ((user?.role === 'admin' && (url==='cart'))||
        // //     (!user && (url === 'dashboard') )) {
        // //   return null;
        // // }
        // if ((user?.role === 'user' && (url==='dashboard' || url==='createproduct') ) ||
        //     (!user && (url === 'dashboard') )) {
        //   return null;
        // }
        // if (user?.role === 'admin' && (url === 'checkout' || url === 'createproduct' || url === 'about' || url === 'cart')) {
        //   return null;
        // }
        // if((!user || user?.role==='user' || user?.role==='admin') && url ==='createproduct' ){
        //   return null;
        // }
        if (user?.role === 'seller' && (url === 'checkout' || url === 'cart' || url === 'about' || url === 'dashboard' || url === 'orders/showAllMyOrders' || url==='products')) {
          return null;
        }

        if (user?.role === 'admin' && (url === 'checkout' || url === 'createproduct' || url === 'about' || url === 'cart')) {
          return null;
        }

        if (user?.role === 'user' && (url === 'dashboard' || url === 'createproduct')) {
          return null;
        }

        if (!user && (url === 'checkout' || url === 'cart' || url === 'dashboard')) {
          return null;
        }

        if ((!user || user?.role === 'user' || user?.role === 'admin') && url === 'createproduct') {
          return null;
        }
        if (url === 'seller' && user?.role !== 'seller') {
          return null;
        }
        return <li key={id}>
            <NavLink className='capitalize' to={url}>
                {text}
            </NavLink>
        </li>
    })}
    </>
  )
}
export default NavLinks