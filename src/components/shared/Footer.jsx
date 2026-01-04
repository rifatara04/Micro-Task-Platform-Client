import { Link } from "react-router";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Task<span className="text-secondary-500">Master</span></h3>
            <p className="text-gray-400">
              The best platform to earn money by completing simple tasks. 
              Join thousands of workers and buyers today.
            </p>
          </div>

          <div>
             <h4 className="text-xl font-semibold mb-4 text-gray-200">Quick Links</h4>
             <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                <li><Link to="/about-us" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
             </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-gray-200">Connect With Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://github.com/ashikurahman1" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-all duration-300">
                <FaGithub className="text-xl" />
              </a>
              <a href="https://linkedin.com/in/ashikur-dev" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://www.facebook.com/ashikurrdev" className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition-all duration-300">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition-all duration-300">
                <FaTwitter className="text-xl" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
                © {new Date().getFullYear()} TaskMaster. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
