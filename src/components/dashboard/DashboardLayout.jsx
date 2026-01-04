import { useState, useContext } from "react";
import { Outlet, Link } from "react-router";
import Sidebar from "./Sidebar";
import { FaBars, FaHome } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const role = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User";

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
                {/* Dashboard Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={toggleSidebar} 
                            className="text-gray-600 hover:text-primary-600 focus:outline-none lg:hidden"
                        >
                            <FaBars size={24} />
                        </button>
                        
                        <div className="flex items-center gap-2">
                     
                            <span className="text-gray-600 font-semibold text-sm sm:text-base uppercase tracking-wide">
                                {role} Dashboard
                            </span>
                        </div>
                    </div>

                    <Link to="/" className="btn btn-sm btn-ghost text-primary-600 border border-primary-200 hover:bg-primary-50 hover:border-primary-400 gap-2 font-medium">
                        <FaHome />
                        <span className="hidden sm:inline">Go to Home</span>
                    </Link>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
                    <Outlet />
                </main>

                <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default DashboardLayout;
