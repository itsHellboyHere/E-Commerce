import { redirect ,useLoaderData,} from "react-router-dom"
import { toast } from "react-toastify"
import { ComplexPaginationContainer, OrdersList,PaginationContainer ,SectionTitle } from "../components"
import axios from "axios"
import { customFetch } from "../utils"
import { useSelector } from "react-redux"

const ordersQuery =(params,user) =>{
  return {
    queryKey :['orders',user.name,params.page?parseInt(params.page) :1.,
  ],
  queryFn :()=> user.role ==='admin'?customFetch.get('/api/v1/orders',{ params:params}):customFetch.get('/api/v1/orders/showAllMyOrders',{
      withCredentials:true,
      params: params,
  })
  }
}
export const loader =(store ,queryClient) =>async({request}) =>{
  
  const user = store.getState().userState.user
  // console.log(user.name);
  if(!user){
    toast.warn('You must be logged in to view the orders')
    return redirect('/login')
    
  }
  if(user?.role==='seller'){
    toast.warn('seller are not allowed to see orders')
    return redirect('/')
    
  }
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries(),])
  try {
    const response = await queryClient.ensureQueryData(ordersQuery(params,user))

    return {orders:response.data.orders,meta:response.data.meta.pagination ,params ,totalOrders:response.data.totalOrders}

   
  } catch (error) {
    console.log(error);
     const errorMessage = error?.response?.data?.msg || 'there was an error placing your order'
    toast.error(errorMessage);
    if(error?.response.status === 401 || 403){
      return redirect(
        '/login'
      )
    }
    return null;
  }
  
}
const Orders = () => {
  const user = useSelector((state)=>state.userState.user)
  
  const {orders,params}=useLoaderData()
  const {meta} =useLoaderData()
  const {totalOrders} =useLoaderData()
  if(meta.total <1){
    return <SectionTitle text='plase make an order' />
  }
  
  return (<>
    {user?.role==='admin'?<SectionTitle text='UserOrders'/>:<SectionTitle text='Your Orders'/>}
    <h3 className="font-medium text-center text-xl mt-4 " >TotalOrders: {totalOrders}</h3>
    <OrdersList/>
    <ComplexPaginationContainer/>
    </>
  )
}
export default Orders