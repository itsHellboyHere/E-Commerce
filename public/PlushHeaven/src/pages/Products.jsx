import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
import axios from "axios";
const url ='/api/v1/products'


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
  // console.log(request);
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries(),])
 
  
  console.log(params);

   
const response =await queryClient.ensureQueryData(allProductsQuery(params))
// console.log(response);
const products = response.data.products;
const meta = response.data.metadata
console.log(meta);
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