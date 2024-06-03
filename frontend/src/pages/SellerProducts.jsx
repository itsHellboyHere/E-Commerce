import { useSelector } from "react-redux";
import { Filters, PaginationContainer} from "../components";
import SellerProductsContainer from "../components/SellerProductsContainer";
import { customFetch } from "../utils";
import axios from "axios";
const url ='/api/v1/products/seller'


const allProductsQuery =(params) =>{
  const {name,company,cateogry,freeShipping,page,priceRange,sort} =params;
  return {
    queryKey :['sellerproducts',
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

const SellerProducts = () => {
    const user = useSelector((state)=>state.userState.user);
    if(!user && user?.role!=='seller'){
        return <Navigate to="/login" replace={true} />
    }
  return (
   <>
   <Filters></Filters>
   <SellerProductsContainer/>
   <PaginationContainer/>
   </>
  )
}
export default SellerProducts