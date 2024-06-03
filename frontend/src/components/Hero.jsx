import { Link } from 'react-router-dom';
import { PiHandHeartFill } from "react-icons/pi";
import hero from '../assets/hero.mp4';

const Hero = () => {
   
  return (
    <div className=" grid lg:grid-cols-2 gap-24 items-center relative -mt-20">
      <video autoPlay loop muted  className="absolute inset-0 object-cover w-full h-full z-0" >
        <source src='https://res.cloudinary.com/dmbn3ddbl/video/upload/v1713682834/samples/hero.mp4' type="video/mp4" />
      </video>
      <div className="bg-black bg-opacity-50 z-10 p-8 rounded-lg">
        <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight ">
          We are Changing shopping, one<span className="text-primary"><PiHandHeartFill /></span> at a time
        </h1>
        <p className="mt-8 md:mt-8 text-white text-lg md:text-xl lg:text-2xl leading-10">
          Turning houses into homes, with love stitched into every seam of our furniture.
        </p>
        <div className="mt-6">
          <Link to="/products" className="btn btn-primary mt-8">
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
