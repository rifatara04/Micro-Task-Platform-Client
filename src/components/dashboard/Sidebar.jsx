import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router"; // Updated import
import { AuthContext } from "../../providers/AuthProvider";
import { 
    FaHome, FaTasks, FaClipboardList, FaWallet, FaUsers, 
    FaHistory, FaPlusCircle, FaSignOutAlt, FaBars, FaTimes 
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // TODO: Get actual role from user context/db
    // For now assuming role is stored in user object or defaulting to worker
    // You might need to fetch this from your backend or store it in context
    const role = user?.role || "worker"; 

    const handleLogout = () => {
        logOut()
            .then(() => navigate("/"))
            .catch(err => console.log(err));
    };

    const workerLinks = [
        { title: "Home", path: "/dashboard/worker", icon: <FaHome /> },
        { title: "Task List", path: "/dashboard/worker/tasklist", icon: <FaTasks /> },
        { title: "My Submissions", path: "/dashboard/worker/my-submissions", icon: <FaClipboardList /> },
        { title: "Withdrawals", path: "/dashboard/worker/withdrawals", icon: <FaWallet /> },
    ];

    const buyerLinks = [
        { title: "Home", path: "/dashboard/buyer", icon: <FaHome /> },
        { title: "Add New Tasks", path: "/dashboard/buyer/add-task", icon: <FaPlusCircle /> },
        { title: "My Tasks", path: "/dashboard/buyer/my-tasks", icon: <FaTasks /> },
        { title: "Purchase Coin", path: "/dashboard/buyer/purchase-coin", icon: <FaWallet /> },
        { title: "Payment History", path: "/dashboard/buyer/payment-history", icon: <FaHistory /> },
    ];

    const adminLinks = [
        { title: "Home", path: "/dashboard/admin", icon: <FaHome /> },
        { title: "Manage Users", path: "/dashboard/admin/manage-users", icon: <FaUsers /> },
        { title: "Manage Tasks", path: "/dashboard/admin/manage-tasks", icon: <FaTasks /> },
        { title: "Withdraw Requests", path: "/dashboard/admin/withdraw-requests", icon: <FaWallet /> },
    ];

    let links = [];
    if (role === 'worker') links = workerLinks;
    if (role === 'buyer') links = buyerLinks;
    if (role === 'admin') links = adminLinks;

    return (
        <>
           {/* Mobile Overlay */}
           {isOpen && (
             <div 
               className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
               onClick={toggleSidebar}
             ></div>
           )}

           {/* Sidebar Component */}
           <div 
             className={`fixed top-0 left-0 h-full bg-white shadow-xl z-30 transition-transform duration-300 ease-in-out w-64 ${
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
             }`}
           >
               <div className="flex flex-col h-full">
                    {/* Header/Logo */}
                    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                        <Link to="/" className="text-2xl font-bold text-primary-600 flex items-center gap-1">
                            Task<span className="text-secondary-600">Master</span>
                        </Link>
                         <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-red-500">
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col items-center">
                         <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-sm mb-3">
                             <img src={user?.photoURL || "https://i.ibb.co/3M3h4h2/user.png"} alt="User" className="w-full h-full object-cover" />
                         </div>
                         <h3 className="font-bold text-gray-800">{user?.displayName}</h3>
                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">{role}</p>
                         <div className="mt-3 bg-white px-3 py-1 rounded-full text-sm font-bold text-primary-600 border border-primary-100 flex items-center gap-2">
                            <FaWallet /> {user?.coins || 0} Coins
                         </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive 
                                        ? "bg-primary-50 text-primary-700 font-semibold" 
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`
                                }
                                end // Ensures exact match for home routes if needed, depends on routing structure
                                onClick={() => {
                                    if(window.innerWidth < 1024) toggleSidebar();
                                }}
                            >
                                <span className="text-lg">{link.icon}</span>
                                {link.title}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer / Logout */}
                    <div className="p-4 border-t border-gray-100">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50 transition-colors font-semibold cursor-pointer"
                        >
                            <FaSignOutAlt className="text-lg" />
                            Logout
                        </button>
                    </div>
               </div>
           </div>
        </>
    );
};

export default Sidebar;
