
import { Link } from 'react-router-dom';

import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';
import { PiHandHeartFill } from "react-icons/pi";
const carouselImages =[hero1,hero2,hero3,hero4];
const Hero = () => {
  return (
    <div className='grid lg:grid-cols-2 gap-24 items-center'>
        <div>
            <h1 className='max-w-2xl text-2xl font-bold tracking-tight sm:text-6xl '>
              We are Changing shopping, one<span><PiHandHeartFill /></span> at a time
            </h1>
            
           
            <p className='mt-8 max-w-xl text-lg leading-8'> Turning houses into homes, with love stitched into every seam of our furniture.</p>
            <div className="mt-10">
                <Link to='/products' className='btn btn-primary'>
                    Our Products
                </Link>
            </div>
             </div>
        <div className=' hidden h-full lg:carousel carousel-end  p-4 space-x-4 
        bg-neutral rounded-box '>
         {
            carouselImages.map((img)=>{
                return <div key={img} className='carousel-item'>
                    <img src={img} alt="" className='rounded-box h-full w-80 '/> 
                </div>
            })
         }    
        </div>
    </div>
  )
}
export default Hero