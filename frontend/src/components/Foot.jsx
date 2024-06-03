import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Foot = () => {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2">Email: <a href="mailto:visalkr976@gmail.com" className="text-blue-400 hover:underline">visalkr976@gmail.com</a></p>
            <p className="mb-2">Phone: <a href="tel:+917004671676" className="text-blue-400 hover:underline">+91 700 467 1676 </a></p>
            <p className="mb-2">WhatsApp: <a href="https://wa.me/+917004671676" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">+91 700 467 1676</a></p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link to ="/" className="text-blue-400 hover:underline">Home</Link></li>
              <li className="mb-2"><Link to ="/products" className="text-blue-400 hover:underline">Products</Link></li>
              <li className="mb-2"><Link to ="/about" className="text-blue-400 hover:underline">About</Link></li>
              {/* <li className="mb-2"><Link to ="/" className="text-blue-400 hover:underline">Contact</Link></li> */}
              <li className="mb-2"><Link to ="/privacypolicy" className="text-blue-400 hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500"><FaFacebook size={24} /></a> */}
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500"><FaTwitter size={24} /></a> */}
              <a href="https://www.instagram.com/_visaal_/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500"><FaInstagram size={24} /></a>
              {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500"><FaLinkedin size={24} /></a> */}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2024 Plushheaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
