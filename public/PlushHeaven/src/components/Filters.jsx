import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from  './Forminput'
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

const Filters = () => {
  const  {meta,params}= useLoaderData()

  const {name,company ,category ,freeShipping,sort,priceRange} =params
  console.log(name,company,category,freeShipping,sort,priceRange);
  console.log(params);
  
  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:
    grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>

      {/* SEARCH */}
      <FormInput type='search' label='search product' name='name' size='input-sm' 
      defaultValue={name}
      />
      {/* CATEGORIES */}
       <FormSelect label='select cateogry'
      name='cateogry' list={meta.categories}
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
      <FormRange name='priceRange' label='select price' size='range-sm'
      price={priceRange}></FormRange>
      {/* SHIPPING */}
      <FormCheckbox name='freeShipping' label='free shipping'  size ='checkbox-sm'
      defaultValue={freeShipping} />
      
      {/* BUTTONS */}
      <button type='submit' className='btn btn-primary btn-sm'>
        search
      </button>
      <Link to='/products' className='btn btn-accent btn-sm'>reset</Link>
    </Form>
  )
}
export default Filters