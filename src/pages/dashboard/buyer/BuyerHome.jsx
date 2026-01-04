import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import api from "../../../utils/api";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { FaTasks, FaUserClock, FaWallet } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BuyerHome = () => {
    const { user, fetchUserData } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalTasks: 0,
        pendingTasks: 0,
        totalPayments: 0
    });
    const [pendingSubmissions, setPendingSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user?.email) {
                try {
                    // Fetch Tasks Stats
                    const tasksRes = await api.get(`/tasks/buyer/${user.email}`);
                    const tasks = tasksRes.data;
                    const totalTasks = tasks.length;
                    const pendingTasks = tasks.reduce((acc, curr) => acc + curr.required_workers, 0);

                    // Fetch Submissions
                    // Note: We need a route to get *all* submissions for a buyer to filter pending ones
                    // The current route /submissions/buyer/:email returns all submissions for tasks created by this buyer
                    const subsRes = await api.get(`/submissions/buyer/${user.email}`);
                    const allSubs = subsRes.data;
                    const pendingSubs = allSubs.filter(sub => sub.status === 'pending');
                    
                    // Total payments (approved submissions)
                    const totalPayments = allSubs
                        .filter(sub => sub.status === 'approved')
                        .reduce((acc, curr) => acc + curr.payable_amount, 0);

                    setStats({ totalTasks, pendingTasks, totalPayments });
                    setPendingSubmissions(pendingSubs);

                } catch (error) {
                    console.error("Error fetching buyer data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user]);

    const [processingId, setProcessingId] = useState(null);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const handleViewDetails = (submission) => {
        setSelectedSubmission(submission);
        document.getElementById('submission_modal').showModal();
    };

    const handleApprove = async (id, worker_email, amount) => {
        setProcessingId(id);
        try {
            await api.patch(`/submissions/${id}/approve`);
            toast.success(`Submission approved! ${amount} coins transferred to worker.`);
            setPendingSubmissions(prev => prev.filter(sub => sub._id !== id));
            // Refresh user data to update coin balance
            await fetchUserData();
            // Close modal if open
            const modal = document.getElementById('submission_modal');
            if (modal) modal.close();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to approve");
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (id) => {
        setProcessingId(id);
        try {
            await api.patch(`/submissions/${id}/reject`);
            toast.success("Submission rejected!");
            setPendingSubmissions(prev => prev.filter(sub => sub._id !== id));
            // Close modal if open
            const modal = document.getElementById('submission_modal');
            if (modal) modal.close();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to reject");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) return <LoadingSpinner smallHeight />;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Buyer Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card mesh-blue p-6 shadow-sm rounded-xl border border-blue-100 flex flex-row items-center justify-between">
                    <div>
                        <div className="text-gray-600 text-sm font-medium">Total Tasks Posted</div>
                        <div className="text-4xl font-bold text-gray-800 mt-2">{stats.totalTasks}</div>
                    </div>
                     <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                        <FaTasks size={24} />
                    </div>
                </div>
                <div className="card mesh-orange p-6 shadow-sm rounded-xl border border-yellow-100 flex flex-row items-center justify-between">
                    <div>
                        <div className="text-gray-600 text-sm font-medium">Pending Tasks (Slots)</div>
                        <div className="text-4xl font-bold text-yellow-700 mt-2">{stats.pendingTasks}</div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-full text-yellow-600">
                        <FaUserClock size={24} />
                    </div>
                </div>
                <div className="card mesh-green p-6 shadow-sm rounded-xl border border-green-100 flex flex-row items-center justify-between">
                    <div>
                        <div className="text-gray-600 text-sm font-medium">Total Payments</div>
                        <div className="text-4xl font-bold text-green-700 mt-2">${stats.totalPayments}</div>
                    </div>
                    <div className="p-4 bg-green-100 rounded-full text-green-600">
                        <FaWallet size={24} />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 h-[300px] sm:h-[400px]">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Task Views & Engagement</h2>
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart
                        data={[
                            { name: 'Day 1', views: 400, clicks: 240 },
                            { name: 'Day 2', views: 300, clicks: 139 },
                            { name: 'Day 3', views: 200, clicks: 980 },
                            { name: 'Day 4', views: 278, clicks: 390 },
                            { name: 'Day 5', views: 189, clicks: 480 },
                            { name: 'Day 6', views: 239, clicks: 380 },
                            { name: 'Day 7', views: 349, clicks: 430 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Task To Review Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Tasks To Review</h2>
                {pendingSubmissions.length === 0 ? (
                    <p className="text-gray-500">No pending submissions to review.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {pendingSubmissions.map(sub => (
                            <div key={sub._id} className="card bg-gray-50 border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    {/* Worker Info */}
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="avatar placeholder">
                                            <div className="bg-primary-100 text-primary-600 rounded-full w-12 h-12 flex items-center justify-center">
                                                <span className="text-lg font-bold">{sub.worker_name.charAt(0).toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800">{sub.worker_name}</div>
                                            <div className="text-xs text-gray-500">{sub.worker_email}</div>
                                        </div>
                                    </div>

                                    {/* Task Info */}
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-700">{sub.task_title}</div>
                                        <div className="text-sm text-gray-500">
                                            Submitted: {new Date(sub.submission_date).toLocaleDateString()}
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="flex-shrink-0">
                                        <div className="badge badge-lg badge-success gap-2">
                                            <span className="font-bold">{sub.payable_amount}</span> Coins
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => handleViewDetails(sub)}
                                            className="btn btn-sm btn-ghost border border-gray-300 w-full sm:w-auto"
                                            title="View Details"
                                        >
                                            View Details
                                        </button>
                                        <button 
                                            onClick={() => handleApprove(sub._id, sub.worker_email, sub.payable_amount)}
                                            className="btn btn-sm btn-success text-white w-full sm:w-auto"
                                            disabled={processingId === sub._id}
                                        >
                                            {processingId === sub._id ? <span className="loading loading-spinner loading-xs"></span> : 'Approve'}
                                        </button>
                                        <button 
                                            onClick={() => handleReject(sub._id)}
                                            className="btn btn-sm btn-error text-white w-full sm:w-auto"
                                            disabled={processingId === sub._id}
                                        >
                                            {processingId === sub._id ? <span className="loading loading-spinner loading-xs"></span> : 'Reject'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Submission Details Modal */}
            <dialog id="submission_modal" className="modal">
                <div className="modal-box max-w-3xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {selectedSubmission && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-2xl text-gray-800">{selectedSubmission.task_title}</h3>
                            
                            {/* Worker Info Card */}
                            <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-4 rounded-lg border border-primary-200">
                                <div className="flex items-center gap-4">
                                    <div className="avatar placeholder">
                                        <div className="bg-primary-200 text-primary-700 rounded-full w-16 h-16 flex items-center justify-center">
                                            <span className="text-2xl font-bold">{selectedSubmission.worker_name.charAt(0).toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-lg text-gray-800">{selectedSubmission.worker_name}</div>
                                        <div className="text-sm text-gray-600">{selectedSubmission.worker_email}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Submitted on {new Date(selectedSubmission.submission_date).toLocaleDateString()} at {new Date(selectedSubmission.submission_date).toLocaleTimeString()}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">Payment Amount</div>
                                        <div className="text-2xl font-bold text-green-600">{selectedSubmission.payable_amount} Coins</div>
                                    </div>
                                </div>
                            </div>

                            {/* Submission Details */}
                            <div>
                                <h4 className="font-bold text-gray-700 mb-2">Submission Details</h4>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-gray-700 whitespace-pre-wrap">{selectedSubmission.submission_details}</p>
                                </div>
                            </div>

                            {/* Screenshot */}
                            {selectedSubmission.screenshot_url && (
                                <div>
                                    <h4 className="font-bold text-gray-700 mb-2">Screenshot</h4>
                                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                                        <img 
                                            src={selectedSubmission.screenshot_url} 
                                            alt="Submission screenshot" 
                                            className="w-full h-auto"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button 
                                    onClick={() => handleApprove(selectedSubmission._id, selectedSubmission.worker_email, selectedSubmission.payable_amount)}
                                    className="btn btn-success text-white flex-1"
                                    disabled={processingId === selectedSubmission._id}
                                >
                                    {processingId === selectedSubmission._id ? (
                                        <><span className="loading loading-spinner loading-sm"></span> Processing...</>
                                    ) : (
                                        `Approve & Pay ${selectedSubmission.payable_amount} Coins`
                                    )}
                                </button>
                                <button 
                                    onClick={() => handleReject(selectedSubmission._id)}
                                    className="btn btn-error text-white"
                                    disabled={processingId === selectedSubmission._id}
                                >
                                    {processingId === selectedSubmission._id ? (
                                        <><span className="loading loading-spinner loading-sm"></span></>
                                    ) : (
                                        'Reject'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default BuyerHome;
