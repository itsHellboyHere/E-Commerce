import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import {About,Cart,Checkout,Error,HomeLayout,Landing,Login,Orders,Products,Register,SingleProduct,ProductCreate ,Privacy ,DashBoard, RegisterSeller} from './pages';
import { EditProduct, ErrorElement } from './components';
//loaders
import {loader as landingLoader} from './pages/Landing';
import {loader as singleProductLoader} from './pages/SingleProduct';
import {loader as productsLoader} from './pages/Products';
import {loader as checkoutLoader} from './pages/Checkout';
import {loader as ordersLoader} from './pages/Orders';
import {loader as createLoader} from './pages/ProductCreate';
import {loader as cartLoader} from './pages/Cart'
import {loader as dashboardLoader} from './pages/DashBoard'

import SellerProducts, {loader as sellerproductsLoader} from './pages/SellerProducts'
//actions
import {action as registerAction} from './pages/Register'
import {action as loginAction} from './pages/Login'
import { action as registerSellerAction } from './pages/RegisterSeller';
// import {action as createAction} from './components/CreateProduct'
// import {action as checkoutAction} from './components/CheckoutForm'
import { store } from './store';
//reactQuery
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createAction } from '@reduxjs/toolkit';




const queryClient = new QueryClient({
  defaultOptions: {
    queries :{
      staleTime:1000 * 60 *5,
    }
  }
})

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout/>,
      errorElement :<Error/>,
      children :[
        {
          index: true,
          element :<Landing/>,
          errorElement:<ErrorElement/>,
          loader:landingLoader(queryClient),
          
        },
        
        {
          path:'products',
          element :<Products/>,
          errorElement:<ErrorElement/>,
          loader:productsLoader(queryClient),
        },
        {
          path:'products/:id',
          element :<SingleProduct/>,
           errorElement:<ErrorElement/>,
          loader:singleProductLoader(queryClient),

        },
        {
          path:'/createproduct',
          element :<ProductCreate/>,
          loader :createLoader(store),
          // action: createAction(store),
        },
        {
          path:'seller',
          element:<SellerProducts/>,
          errorElement:<ErrorElement/>,
          loader:sellerproductsLoader(queryClient),
        },
        {
          path:'seller/products/:id/edit',
          element:<EditProduct/>,
          errorElement:<ErrorElement/>,
        }
        ,
        {
          path:'cart',
          element :<Cart/>,
          loader: cartLoader(store),
        },
        {
          path:'about',
          element :<About/>,
        },
        {
          path:'checkout',
          element :<Checkout/>,
          loader: checkoutLoader(store),
        //  action :checkoutAction(store ,queryClient),
        },
        {
          path:'orders/showAllMyOrders',
          element :<Orders/>,
          loader: ordersLoader(store ,queryClient),
        },
        {
          path :'privacypolicy',
          element:<Privacy/>
        },
       
         {
      path:'/dashboard',
      element:<DashBoard/>,
      errorElement:<Error/>,
      loader:dashboardLoader(store),
    },
      ]
    },
    
    {
      path:'/login',
      element: <Login/>,
      errorElement :<Error/>,
      action :loginAction(store),
    },
    {
      path:'/register',
      element: <Register/>,
      errorElement :<Error/>,
      action :registerAction,
    },
    {
      path:'/register/seller',
      element: <RegisterSeller/>,
      errorElement :<Error/>,
      action :registerSellerAction,
    },
    
   
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient} >
    <RouterProvider router={router} />
    {/* <ReactQueryDevtools initialIsOpen={false}/> */}
    </QueryClientProvider>
  )
}
export default App