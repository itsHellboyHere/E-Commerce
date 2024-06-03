
import axios from "axios"
import { FeaturedProducts, Foot, Footer, Hero, SellerHome, Services } from "../components"
import { customFetch } from "../utils"
import { useSelector } from "react-redux"
import DashBoard from "./DashBoard"
import AdminHome from "../components/AdminHome"
const url = '/api/v1/products?featured=true'

const featuredProductsQuery = {
  queryKey:['featuredProducts'],
  queryFn: ()=> customFetch(url),
}


export const loader = (queryClient)=> async() =>{

 const response = await queryClient.ensureQueryData(featuredProductsQuery);
//  console.log(response);
const products = response.data.products;

 return {products };
}
const Landing = () => {
  const user = useSelector((state) => state.userState.user);
    if(user && user.role ==='admin'){
      return <AdminHome/>
    }
   if (user && user.role === 'seller') {
    // If user is a seller, hide the landing page
    return <SellerHome/>;
  }
  return (
    <>
    <Hero/>
    <FeaturedProducts/>
    <Services/>
    <Foot/>
    </>
  )
}
export default Landing