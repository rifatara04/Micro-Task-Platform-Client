import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { Link } from "react-router";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { FaCoins, FaUser, FaClock, FaUsers, FaArrowRight } from "react-icons/fa";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await api.get('/tasks');
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Tasks</h1>
                <p className="text-gray-500">Browse and complete tasks to earn coins</p>
            </div>
            {tasks.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">📋</div>
                    <p className="text-xl text-gray-500">No tasks available at the moment.</p>
                    <p className="text-sm text-gray-400 mt-2">Check back later for new opportunities!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(task => (
                        <div key={task._id} className="group card bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300">
                            {/* Task Image */}
                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
                                <img 
                                    src={task.task_image_url || "https://via.placeholder.com/400x300?text=Task+Image"} 
                                    alt={task.task_title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400x300?text=Task+Image";
                                    }}
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                
                                {/* Coin Badge */}
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold">
                                    <FaCoins className="text-lg" />
                                    <span>{task.payable_amount}</span>
                                </div>

                                {/* Slots Badge */}
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FaUsers className="text-primary-600" />
                                    <span>{task.required_workers} slots left</span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                    {task.task_title}
                                </h3>

                                {/* Task Details */}
                                <div className="space-y-2.5 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FaUser className="text-blue-600 text-xs" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Posted by</p>
                                            <p className="font-semibold text-gray-700 truncate">{task.buyer_name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FaClock className="text-purple-600 text-xs" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500">Deadline</p>
                                            <p className="font-semibold text-gray-700">{new Date(task.completion_date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Link 
                                    to={`/dashboard/worker/task/${task._id}`} 
                                    className="btn btn-primary w-full group/btn relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        View Details
                                        <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
