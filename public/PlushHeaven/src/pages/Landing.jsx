
import axios from "axios"
import { FeaturedProducts, Hero } from "../components"
import { customFetch } from "../utils"

const url = '/api/v1/products?featured=true'

const featuredProductsQuery = {
  queryKey:['featuredProducts'],
  queryFn: ()=> customFetch(url),
}

export const loader = (queryClient)=> async() =>{
 const response = await queryClient.ensureQueryData(featuredProductsQuery);
 console.log(response);
const products = response.data.products;

 return {products};
}
const Landing = () => {
  return (
    <>
    <Hero/>
    <FeaturedProducts/>
    </>
  )
}
export default Landing