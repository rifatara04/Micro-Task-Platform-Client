import { useEffect, useState, useContext } from "react";
 
import api from "../../../utils/api";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            if (user?.email) {
                try {
                    const { data } = await api.get(`/payments/${user.email}`);
                    setPayments(data);
                } catch (error) {
                    console.error("Failed to fetch payments", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPayments();
    }, [user]);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h1>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Amount Paid</th>
                            <th>Coins Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-4 text-gray-500">No payment history found.</td></tr>
                        ) : (
                            payments.map(pay => (
                                <tr key={pay._id} className="hover">
                                    <td className="font-mono text-gray-600 text-xs">{pay.transactionId}</td>
                                    <td>{new Date(pay.date).toLocaleDateString()}</td>
                                    <td className="font-bold text-green-600">${pay.amount}</td>
                                    <td className="font-semibold text-yellow-600">{pay.coins} Coins</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
