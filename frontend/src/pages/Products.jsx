import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
import axios from "axios";
const url ='/api/v1/products'

console.log(import.meta.env.VITE_API_URL );
const allProductsQuery =(params) =>{
  const {name,company,cateogry,freeShipping,page,priceRange,sort} =params;
  return {
    queryKey :['products',
      name?? "",
      cateogry??"all",
      company?? "all",
      sort??'a-z',
      priceRange?? 0,
      freeShipping ??false,
      page??1
  ],
    queryFn: () => customFetch(url,{params})
  }
}
export const loader = (queryClient)=> async ({request}) =>{
 
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries(),])

   
const response =await queryClient.ensureQueryData(allProductsQuery(params))

const products = response.data.products;
const meta = response.data.metadata

  return {products,meta ,params}
}

const Products = () => {
  return (
   <>
   <Filters></Filters>
   <ProductsContainer/>
   <PaginationContainer/>
   </>
  )
}
export default Products