import { Link } from "react-router";
import { FaArrowLeft, FaGhost } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-lg w-full text-center relative z-10">
                <div className="mb-10 animate-bounce inline-block">
                    <FaGhost className="text-8xl text-primary-200" />
                </div>
                
                <h1 className="text-9xl font-black text-gray-900 leading-none mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Page Not Found</h2>
                
                <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link 
                    to="/" 
                    className="btn btn-primary btn-lg rounded-full px-10 hover:shadow-xl transition-all flex items-center gap-3 w-fit mx-auto"
                >
                    <FaArrowLeft /> Back to Homepage
                </Link>

                <div className="mt-16 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <div className="text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Helpful Links</p>
                        <ul className="mt-3 space-y-2">
                            <li><Link to="/about-us" className="text-sm text-primary-600 hover:underline">About Us</Link></li>
                            <li><Link to="/contact" className="text-sm text-primary-600 hover:underline">Contact Support</Link></li>
                        </ul>
                    </div>
                     <div className="text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dashboard</p>
                        <ul className="mt-3 space-y-2">
                            <li><Link to="/dashboard" className="text-sm text-primary-600 hover:underline">Go to Dashboard</Link></li>
                            <li><Link to="/login" className="text-sm text-primary-600 hover:underline">Sign In</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
