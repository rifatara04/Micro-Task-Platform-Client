import { useEffect, useState } from "react";
import { FaTrash, FaUserCog } from "react-icons/fa";
import { toast } from "react-hot-toast";
import api from "../../../utils/api";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get('/users');
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
                toast.error("Failed to load users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this user? This cannot be undone.")) {
            try {
                await api.delete(`/users/${id}`);
                setUsers(users.filter(user => user._id !== id));
                toast.success("User deleted successfully");
            } catch (error) {
                console.error("Delete failed", error);
                toast.error("Failed to delete user");
            }
        }
    };

    const handleRoleUpdate = async (id, newRole) => {
        try {
            await api.patch(`/users/${id}/role`, { role: newRole });
            setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
            toast.success(`User role updated to ${newRole}`);
        } catch (error) {
            console.error("Role update failed", error);
            toast.error("Failed to update role");
        }
    };

    if(loading) return <LoadingSpinner smallHeight />;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>
            
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Coins</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="hover">
                                <td className="font-semibold text-gray-700">{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select 
                                        className="select select-bordered select-sm w-full max-w-xs focus:outline-none"
                                        value={user.role}
                                        onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                    >
                                        <option value="worker">Worker</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="font-mono text-yellow-600 font-bold">{user.coins}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {users.map(user => (
                    <div key={user._id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-gray-800">{user.name}</h3>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            <span className="font-mono text-yellow-600 font-bold">{user.coins} Coins</span>
                        </div>
                        
                        <div className="flex flex-col gap-3 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase">Role:</span>
                                <select 
                                    className="select select-bordered select-sm flex-1 focus:outline-none"
                                    value={user.role}
                                    onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                >
                                    <option value="worker">Worker</option>
                                    <option value="buyer">Buyer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            
                            <button 
                                onClick={() => handleDelete(user._id)}
                                className="btn btn-sm btn-error text-white w-full flex items-center justify-center gap-2"
                            >
                                <FaTrash /> Delete User
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
