import React from 'react';
import styled, { keyframes } from 'styled-components';

import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
import {services} from '../utils/const'
import SectionTitle from './SectionTitle';
// Define the rotatingBackground animation
const rotatingBackground = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Styled component for the header
const Header = styled.article`
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
   
    line-height: 1.6;
  }
`

// Styled component with Tailwind CSS classes
const Card = styled.div`
  width: 260px;
  height: 300px;
  background: #1c021d;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  /* @apply bg-primary-800 rounded-lg shadow-md relative flex justify-center items-center overflow-hidden; */

  h2 {
    z-index: 1;
    color: white;
    font-size: 2em;
  }

  &:before {
    content: '';
    position: absolute;
    width: 80px;
    background-image: linear-gradient(180deg, rgb(1, 20, 28), rgb(255, 48, 255));
    height: 130%;
    animation: ${rotatingBackground} 4s linear infinite;
    transition: all 0.2s linear;
  }

  &:after {
    content: '';
    position: absolute;
    background: #0f376b;
    opacity: 0.3;
    inset: 5px;
    border-radius: 15px;
  }
`;

const Services = ()=>{
  return (
    
    <section className="align-element py-20 mt-10">
      <SectionTitle text='Services'/>
       <Header className='text-secondary mt-5'>
        <h3 className='text-2xl'>
          Welcome to <span className='text-3xl font-serif leading-10 -tracking-tighter text-secondary'>PlushHeaven</span> <br /> built only for you
        </h3>
      </Header>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {services.map((service) => (
            
           <Card key={service.id} className=' mt-04 pr-6 pt-12 pb-8'>
              
              <span className="text-4xl text-blue-600 pr-1 px-1">{service.icon}</span>
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-white tracking-tight font-semibold">{service.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  
  );
};

export default Services;
