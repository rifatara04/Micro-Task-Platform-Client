import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { FaHome, FaCoins, FaSignOutAlt, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logOut()
      .then(() => setIsOpen(false))
      .catch((err) => console.log(err));
  };
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: "Home", path: "/" },
  ];

  const renderNavLinks = () => (
    <>
      {navLinks.map((link) => (
        <li key={link.path}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-primary-600 font-bold block py-2 lg:py-0"
                : "text-gray-700 font-medium hover:text-primary-600 block py-2 lg:py-0 transition-colors"
            }
          >
            {link.title}
          </NavLink>
        </li>
      ))}
      <li>
        <a
          href="https://github.com/ashikurahman1/micro-task-platform-client"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 font-medium hover:text-primary-600 block py-2 lg:py-0 transition-colors"
        >
          Join as Developer
        </a>
      </li>
      <li>
        <NavLink to="/about-us" className={({ isActive }) =>
              isActive
                ? "text-primary-600 font-bold block py-2 lg:py-0"
                : "text-gray-700 font-medium hover:text-primary-600 block py-2 lg:py-0 transition-colors"
            }>About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={({ isActive }) =>
              isActive
                ? "text-primary-600 font-bold block py-2 lg:py-0"
                : "text-gray-700 font-medium hover:text-primary-600 block py-2 lg:py-0 transition-colors"
            }>Contact</NavLink>
      </li>
      <li>
        <NavLink to="/privacy-policy" className={({ isActive }) =>
              isActive
                ? "text-primary-600 font-bold block py-2 lg:py-0"
                : "text-gray-700 font-medium hover:text-primary-600 block py-2 lg:py-0 transition-colors"
            }>Privacy Policy</NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600 flex items-center gap-1">
              Task<span className="text-secondary-600">Master</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <ul className="flex space-x-8 items-center">
              {renderNavLinks()}
            </ul>
          </div>

          {/* Desktop Auth Buttons / User Profile */}
          <div className="hidden lg:flex lg:items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="flex flex-col items-end text-right hidden md:flex">
                  <span className="font-semibold text-sm text-gray-800 max-w-[120px] lg:max-w-[150px] truncate" title={user.displayName}>
                    {user.displayName}
                  </span>
                  <span className="text-[10px] lg:text-xs text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full font-medium whitespace-nowrap mt-0.5">
                    Coins: {user?.coins || 0}
                  </span>
                </div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary-100 hover:border-primary-300 transition-all hover:shadow-md">
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL || "https://i.ibb.co/3M3h4h2/user.png"} alt="user" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-0 shadow-xl bg-white rounded-2xl w-64 border border-gray-200 overflow-hidden">
                    {/* User Info Header */}
                    <li className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 rounded-t-2xl">
                      <div className="flex items-center gap-3 pointer-events-none">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full ring ring-white ring-offset-2">
                            <img src={user.photoURL || "https://i.ibb.co/3M3h4h2/user.png"} alt="user" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm truncate">{user.displayName}</p>
                          <p className="text-xs text-white/80 truncate">{user.email}</p>
                        </div>
                      </div>
                    </li>

                    {/* Coins Display */}
                    <li className="px-4 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-gray-100">
                      <div className="flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-2">
                          <FaCoins className="text-yellow-500 text-lg" />
                          <span className="font-semibold text-gray-700">Your Balance</span>
                        </div>
                        <span className="font-bold text-lg text-primary-600">{user?.coins || 0}</span>
                      </div>
                    </li>

                    {/* Dashboard Link */}
                    <li className="px-2 pt-2">
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-all group"
                      >
                        <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                          <FaHome className="text-primary-600 text-sm" />
                        </div>
                        <span className="font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">Dashboard</span>
                        <span className="ml-auto badge badge-secondary badge-sm">New</span>
                      </Link>
                    </li>

                    {/* Logout Button */}
                    <li className="px-2 pb-2">
                      <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all group text-left"
                      >
                        <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                          <FaSignOutAlt className="text-red-600 text-sm" />
                        </div>
                        <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn btn-outline btn-primary">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-4">
             {/* Show User Avatar on Mobile if logged in */}
             {user && (
                 <div className="dropdown dropdown-end z-50">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary-100 hover:border-primary-300 transition-all">
                    <div className="w-8 rounded-full">
                      <img src={user.photoURL || "https://i.ibb.co/3M3h4h2/user.png"} alt="user" />
                    </div>
                  </label>
                   <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-0 shadow-xl bg-white rounded-2xl w-64 border border-gray-200 overflow-hidden right-0">
                   {/* User Info Header */}
                   <li className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 rounded-t-2xl">
                     <div className="flex items-center gap-3 pointer-events-none">
                       <div className="avatar">
                         <div className="w-12 h-12 rounded-full ring ring-white ring-offset-2">
                           <img src={user.photoURL || "https://i.ibb.co/3M3h4h2/user.png"} alt="user" />
                         </div>
                       </div>
                       <div className="flex-1 min-w-0">
                         <p className="font-bold text-white text-sm truncate">{user.displayName}</p>
                         <p className="text-xs text-white/80 truncate">{user.email}</p>
                       </div>
                     </div>
                   </li>

                   {/* Coins Display */}
                   <li className="px-4 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-gray-100">
                     <div className="flex items-center justify-between pointer-events-none">
                       <div className="flex items-center gap-2">
                         <FaCoins className="text-yellow-500 text-lg" />
                         <span className="font-semibold text-gray-700">Your Balance</span>
                       </div>
                       <span className="font-bold text-lg text-primary-600">{user?.coins || 0}</span>
                     </div>
                   </li>

                   {/* Dashboard Link */}
                   <li className="px-2 pt-2">
                     <Link 
                       to="/dashboard" 
                       className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-all group"
                     >
                       <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                         <FaHome className="text-primary-600 text-sm" />
                       </div>
                       <span className="font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">Dashboard</span>
                       <span className="ml-auto badge badge-secondary badge-sm">New</span>
                     </Link>
                   </li>

                   {/* Logout Button */}
                   <li className="px-2 pb-2">
                     <button 
                       onClick={handleLogout} 
                       className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all group text-left"
                     >
                       <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                         <FaSignOutAlt className="text-red-600 text-sm" />
                       </div>
                       <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Logout</span>
                     </button>
                   </li>
                  </ul>
                </div>
             )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg" id="mobile-menu">
          <div className="px-4 pt-2 pb-6 space-y-1">
             <ul className="flex flex-col gap-2">
              {renderNavLinks()}
             </ul>
            
            {!user && (
              <div className="pt-4 flex flex-col gap-3 border-t border-gray-100 mt-4">
                <Link to="/login" className="btn btn-ghost w-full justify-center border border-gray-200">Login</Link>
                <Link to="/register" className="btn btn-primary w-full justify-center">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
