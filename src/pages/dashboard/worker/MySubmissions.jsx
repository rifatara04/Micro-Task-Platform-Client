import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import api from "../../../utils/api";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { FaEye } from "react-icons/fa";

const MySubmissions = () => {
    const { user } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
             if (user?.email) {
                try {
                    const { data } = await api.get(`/submissions/worker/${user.email}`);
                    setSubmissions(data);
                } catch (error) {
                    console.error("Failed to fetch submissions", error);
                } finally {
                    setLoading(false);
                }
             }
        };
        fetchSubmissions();
    }, [user]);

    const getStatusBadge = (status) => {
        if (status === 'approved') return <span className="badge badge-success text-white">Approved</span>;
        if (status === 'pending') return <span className="badge badge-warning text-white">Pending</span>;
        if (status === 'rejected') return <span className="badge badge-error text-white">Rejected</span>;
    };

    const handleViewScreenshot = (submission) => {
        setSelectedSubmission(submission);
        document.getElementById('screenshot_modal').showModal();
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Submissions</h1>
             {submissions.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No submissions found. Go perform some tasks!</div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                        <table className="table w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Task Title</th>
                                    <th>Earnings</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Screenshot</th>
                                </tr>
                            </thead>
                            <tbody>
                                 {submissions.map(sub => (
                                    <tr key={sub._id} className="hover">
                                        <td className="font-medium text-gray-800">{sub.task_title}</td>
                                        <td>{sub.payable_amount} Coins</td>
                                        <td>{new Date(sub.submission_date).toLocaleDateString()}</td>
                                        <td>{getStatusBadge(sub.status)}</td>
                                        <td>
                                            {sub.screenshot_url ? (
                                                <button 
                                                    onClick={() => handleViewScreenshot(sub)}
                                                    className="btn btn-sm btn-ghost border border-gray-200"
                                                    title="View Screenshot"
                                                >
                                                    <FaEye />
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-sm">No screenshot</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {submissions.map(sub => (
                            <div key={sub._id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-2">{sub.task_title}</h3>
                                <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                                    <span className="text-gray-500 font-medium text-xs">Earnings:</span>
                                    <span className="text-gray-800 font-semibold">{sub.payable_amount} Coins</span>
                                    
                                    <span className="text-gray-500 font-medium text-xs">Date:</span>
                                    <span className="text-gray-800">{new Date(sub.submission_date).toLocaleDateString()}</span>
                                    
                                    <span className="text-gray-500 font-medium text-xs">Status:</span>
                                    <span>{getStatusBadge(sub.status)}</span>
                                </div>
                                {sub.screenshot_url ? (
                                    <button 
                                        onClick={() => handleViewScreenshot(sub)}
                                        className="btn btn-sm btn-primary btn-outline w-full flex items-center justify-center gap-2"
                                    >
                                        <FaEye /> View Proof
                                    </button>
                                ) : (
                                    <div className="text-center py-2 bg-gray-50 rounded-lg text-gray-400 text-xs">No screenshot provided</div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Screenshot Modal */}
            <dialog id="screenshot_modal" className="modal">
                <div className="modal-box max-w-3xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {selectedSubmission && (
                        <div>
                            <h3 className="font-bold text-xl mb-4">{selectedSubmission.task_title}</h3>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2"><strong>Submission Details:</strong></p>
                                <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedSubmission.submission_details}</p>
                            </div>
                            {selectedSubmission.screenshot_url && (
                                <div>
                                    <p className="text-sm text-gray-600 mb-2"><strong>Screenshot:</strong></p>
                                    <img 
                                        src={selectedSubmission.screenshot_url} 
                                        alt="Submission screenshot" 
                                        className="w-full h-auto rounded-lg border border-gray-300"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MySubmissions;
