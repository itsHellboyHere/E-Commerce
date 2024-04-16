import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'createproduct', text: 'Create' },
  { id: 4, url: 'products', text: 'products' },
  { id: 5, url: 'cart', text: 'cart' },
  { id: 6 ,url: 'checkout', text: 'checkout' },
  { id: 7, url: 'orders/showAllMyOrders', text: 'orders' },
];

const NavLinks = () => {
  const user = useSelector((state)=>state.userState.user);
  if(user){
    console.log(user.role);
  }
  return (
    <>
    {links.map((link)=>{
        const {id,url,text} =link;
        if ((user?.role === 'seller' && (url === 'checkout'|| url=== 'cart' || url==='about')) ||
            (!user && (url === 'checkout' || url==='cart'))) {
          return null;
        }
        if((!user || user?.role==='user') && url ==='createproduct'){
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