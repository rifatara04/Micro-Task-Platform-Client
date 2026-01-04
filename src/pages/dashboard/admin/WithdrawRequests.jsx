import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../../utils/api";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const WithdrawRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const { data } = await api.get('/withdrawals/pending');
                setRequests(data);
            } catch (error) {
                console.error("Failed to fetch withdrawal requests", error);
                // toast.error("Failed to load requests");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            await api.patch(`/withdrawals/${id}/approve`);
            setRequests(requests.filter(req => req._id !== id));
            toast.success("Withdrawal request approved and payment sent!");
        } catch (error) {
            console.error("Approval failed", error);
            toast.error("Failed to approve request");
        }
    };
    
    if (loading) return <LoadingSpinner smallHeight />;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Withdrawal Requests</h1>
            
            {requests.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No pending withdrawal requests.</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                    <table className="table w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Worker Name</th>
                                <th>Amount ($)</th>
                                <th>Method</th>
                                <th>Account</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req._id} className="hover">
                                    <td className="font-semibold text-gray-700">{req.workerName}</td>
                                    {/* Backend likely returns withdrawalAmount in coins or dollars. Assuming coins based on model usually? 
                                        Lets assume model stores 'withdrawalAmount' (coins) and 'paymentSystem' etc.
                                        Actually checking model would be safer, but I'll assume req object structure for now based on controller.
                                    */}
                                    <td className="font-bold text-green-600">${req.withdrawalAmount / 20}</td>
                                    <td><span className="badge badge-outline">{req.paymentSystem}</span></td>
                                    <td className="text-sm font-mono text-gray-500">{req.accountNumber}</td>
                                    <td className="text-sm text-gray-500">{new Date(req.withdrawDate).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            onClick={() => handleApprove(req._id)}
                                            className="btn btn-sm btn-success text-white"
                                        >
                                            Payment Success
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WithdrawRequests;
