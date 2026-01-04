import { useEffect, useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import { toast } from "react-hot-toast";
import api from "../../../utils/api";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
 

const ManageTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await api.get('/tasks');
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks", error);
                toast.error("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this task?")) {
            try {
                await api.delete(`/tasks/${id}`);
                setTasks(tasks.filter(task => task._id !== id));
                toast.success("Task deleted successfully");
            } catch (error) {
                console.error("Delete failed", error);
                toast.error("Failed to delete task");
            }
        }
    };

    const handleView = (task) => {
        setSelectedTask(task);
        document.getElementById('task_modal').showModal();
    };

    if (loading) return <LoadingSpinner smallHeight />;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Tasks</h1>
            
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Task Title</th>
                            <th>Buyer Name</th>
                            <th>Posted Date</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id} className="hover">
                                <td className="font-semibold text-gray-700">{task.task_title}</td>
                                <td>{task.buyer_name}</td>
                                <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                                <td>{task.required_workers} slots</td>
                                <td className="flex gap-2">
                                     <button 
                                        onClick={() => handleView(task)}
                                        className="btn btn-sm btn-ghost border border-gray-200" 
                                        title="View Details"
                                     >
                                        <FaEye />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(task._id)}
                                        className="btn btn-sm btn-error text-white" 
                                        title="Delete Task"
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
                {tasks.map(task => (
                    <div key={task._id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-2 truncate">{task.task_title}</h3>
                        <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                            <span className="text-gray-500 text-xs font-semibold uppercase">Buyer:</span>
                            <span className="text-gray-700">{task.buyer_name}</span>
                            
                            <span className="text-gray-500 text-xs font-semibold uppercase">Date:</span>
                            <span className="text-gray-700">{new Date(task.completion_date).toLocaleDateString()}</span>
                            
                            <span className="text-gray-500 text-xs font-semibold uppercase">Slots:</span>
                            <span className="text-gray-700 font-bold">{task.required_workers}</span>
                        </div>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleView(task)}
                                className="btn btn-sm btn-ghost border border-gray-200 flex-1 flex items-center justify-center gap-2"
                            >
                                <FaEye /> Details
                            </button>
                            <button 
                                onClick={() => handleDelete(task._id)}
                                className="btn btn-sm btn-error text-white flex-1 flex items-center justify-center gap-2"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Task Details Modal */}
            <dialog id="task_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {selectedTask && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-2xl text-gray-800">{selectedTask.task_title}</h3>
                            
                            <img 
                                src={selectedTask.task_image_url} 
                                alt={selectedTask.task_title} 
                                className="w-full h-64 object-cover rounded-lg"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="text-sm text-gray-500 block">Buyer</span>
                                    <span className="font-semibold">{selectedTask.buyer_name}</span>
                                    <span className="text-xs text-gray-400 block">{selectedTask.buyer_email}</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="text-sm text-gray-500 block">Deadline</span>
                                    <span className="font-semibold">{new Date(selectedTask.completion_date).toLocaleDateString()}</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="text-sm text-gray-500 block">Payable Amount</span>
                                    <span className="font-bold text-green-600">{selectedTask.payable_amount} Coins</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="text-sm text-gray-500 block">Slots</span>
                                    <span className="font-semibold">{selectedTask.required_workers} Remaining</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-700">Task Detail</h4>
                                <p className="text-gray-600 mt-1">{selectedTask.task_detail}</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-700">Submission Info</h4>
                                <p className="text-gray-600 mt-1">{selectedTask.submission_info}</p>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default ManageTasks;
