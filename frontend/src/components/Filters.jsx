import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from  './Forminput'
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';
import { useSelector } from 'react-redux';

const Filters = () => {
  const  {meta,params}= useLoaderData()
  const user = useSelector((state) => state.userState.user);

  const {name,company ,category,freeShipping,sort,priceRange} =params

  return (
    <Form className='align-element bg-base-200 rounded-md px-8 py-4 grid gap-x-2 gap-y-3 sm:
    grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>

      {/* CATEGORIES */}
       <FormSelect label='select category'
      name='category' list={meta.categories}
      size='select-sm'
      defaultValue={category}
      ></FormSelect>
      {/* COMPANIES */}
       <FormSelect label='select company'
      name='company' list={meta.companies}
      size='select-sm'
      defaultValue={company}
      ></FormSelect>
      {/* ORDER */}
        <FormSelect label='sort by'
      name='sort' list={['a-z','z-a','high','low']}
      size='select-sm'
      defaultValue={sort}
      ></FormSelect>
      {/* PRICE */}
      <FormRange name='priceRange' label='price range' size='range-sm'
      price={priceRange}></FormRange>
      {/* SEARCH */}
      <FormInput type='search' label='search product' name='name' size='input-sm' 
      defaultValue={name}
      
      />
      {/* SHIPPING */}
      <FormCheckbox name='freeShipping' label='free shipping'  size ='checkbox-sm'
      defaultValue={freeShipping} />
      
      {/* BUTTONS */}
      <button type='submit' className='btn btn-secondary btn-sm text-white'>
        search
      </button>
      {user?.role==='seller'?(
           <Link to='/seller' className='btn btn-error btn-sm'>reset</Link>
      ):(
         <Link to='/products' className='btn btn-error btn-sm'>reset</Link>
      )}
     
    </Form>
  )
}
export default Filters