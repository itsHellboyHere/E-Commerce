import React from 'react';
import { FaInstagram ,FaWhatsapp} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-base-200 py-8 mt-28">
      <div className="container mx-auto flex justify-between px-6">
        <div className="w-1/4">
          <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
          <ul>
            <li>Help Center</li>
             <li><a href="mailto:visalkr976@gmail.com" className="hover:link">Contact Us</a></li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="w-1/4">
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul>
            <Link to='/about'><li className='hover:link'>About Us</li> </Link>
            <Link to='/privacypolicy'><li className='hover:link'>Privacy Policy</li></Link>
            
          </ul>
        </div>
        <div className="w-1/4">
          <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
          <ul className="flex space-x-4">
          
          <Link to='https://www.instagram.com/_visaal_/'><li><FaInstagram className="text-pink-600" /></li> </Link>
          <Link to='https://wa.me/917004671676'><li><FaWhatsapp className='text-green-600'/></li></Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
