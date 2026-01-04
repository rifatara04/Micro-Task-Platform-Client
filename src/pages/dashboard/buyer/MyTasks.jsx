import { useEffect, useState, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
 
import api from '../../../utils/api';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router';
import { AuthContext } from '../../../providers/AuthProvider';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const [myTasks, setMyTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyTasks = async () => {
            if (user?.email) {
                try {
                    const { data } = await api.get(`/tasks/buyer/${user.email}`);
                    setMyTasks(data);
                } catch (error) {
                    console.error("Failed to fetch my tasks", error);
                    toast.error("Failed to load tasks");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchMyTasks();
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure? Deleted tasks restore unspent coins.")) {
            try {
                await api.delete(`/tasks/${id}`);
                setMyTasks(prev => prev.filter(task => task._id !== id));
                toast.success("Task deleted successfully");
            } catch (error) {
                console.error("Delete failed", error);
                toast.error("Failed to delete task");
            }
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Tasks</h1>
                <Link to="/dashboard/buyer/add-task" className="btn btn-sm btn-primary w-full sm:w-auto">+ Add New Task</Link>
             </div>
            
            {myTasks.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">You haven't posted any tasks yet.</p>
                    <Link to="/dashboard/buyer/add-task" className="btn btn-primary btn-outline">Post Your First Task</Link>
                </div>
            ) : (
                <>
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                        <table className="table w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Task Title</th>
                                    <th>Required Workers</th>
                                    <th>Pay Amount</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myTasks.map(task => (
                                    <tr key={task._id} className="hover">
                                        <td className="font-semibold text-gray-700">{task.task_title}</td>
                                        <td>{task.required_workers}</td>
                                        <td>{task.payable_amount} Coins</td>
                                        <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                                        <td className="flex gap-4">
                                            {/* <button className="text-blue-500 hover:text-blue-700 opacity-50 cursor-not-allowed text-lg" title="Update (Coming Soon)"><FaEdit /></button> */}
                                            <button 
                                                onClick={() => handleDelete(task._id)}
                                                className="text-red-500 hover:text-red-700 text-lg" 
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                        {myTasks.map(task => (
                            <div key={task._id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-2">{task.task_title}</h3>
                                <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                                    <span className="text-gray-500 text-xs font-semibold uppercase">Workers Needed:</span>
                                    <span className="text-gray-700">{task.required_workers}</span>
                                    
                                    <span className="text-gray-500 text-xs font-semibold uppercase">Pay Amount:</span>
                                    <span className="text-green-600 font-bold">{task.payable_amount} Coins</span>
                                    
                                    <span className="text-gray-500 text-xs font-semibold uppercase">Deadline:</span>
                                    <span className="text-gray-700">{new Date(task.completion_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex gap-2 border-t pt-3">
                                    <button 
                                        onClick={() => handleDelete(task._id)}
                                        className="btn btn-sm btn-error btn-outline w-full flex items-center justify-center gap-2"
                                    >
                                        <FaTrash /> Delete Task
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div >
                </>
            )}
        </div>
    );
};

export default MyTasks;
