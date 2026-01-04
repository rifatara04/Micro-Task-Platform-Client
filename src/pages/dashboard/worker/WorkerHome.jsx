import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import api from "../../../utils/api";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { FaClipboardList, FaClock, FaDollarSign } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WorkerHome = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalSubmissions: 0,
        pendingSubmissions: 0,
        totalEarnings: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                if (user?.email) {
                    const { data } = await api.get(`/submissions/worker/${user.email}`);
                    
                    const totalSubmissions = data.length;
                    const pendingSubmissions = data.filter(sub => sub.status === 'pending').length;
                    const totalEarnings = data
                        .filter(sub => sub.status === 'approved')
                        .reduce((acc, curr) => acc + curr.payable_amount, 0);

                    setStats({
                        totalSubmissions,
                        pendingSubmissions,
                        totalEarnings
                    });
                }
            } catch (error) {
                console.error("Failed to fetch worker stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    if(loading) return <LoadingSpinner smallHeight />;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Worker Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card mesh-blue p-6 shadow-sm rounded-xl border border-blue-100 flex flex-row items-center justify-between">
                    <div>
                        <div className="text-gray-600 text-sm font-medium">Total Submissions</div>
                        <div className="text-4xl font-bold text-gray-800 mt-2">{stats.totalSubmissions}</div>
                    </div>
                     <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                        <FaClipboardList size={24} />
                    </div>
                </div>
                <div className="card mesh-orange p-6 shadow-sm rounded-xl border border-yellow-100 flex flex-row items-center justify-between">
                    <div>
                        <div className="text-gray-600 text-sm font-medium">Pending Submissions</div>
                        <div className="text-4xl font-bold text-yellow-700 mt-2">{stats.pendingSubmissions}</div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-full text-yellow-600">
                        <FaClock size={24} />
                    </div>
                </div>
                <div className="card mesh-green p-6 shadow-sm rounded-xl border border-green-100 flex flex-row items-center justify-between">
                    <div>
                         <div className="text-gray-600 text-sm font-medium">Total Earnings</div>
                         <div className="text-4xl font-bold text-green-700 mt-2">${stats.totalEarnings}</div>
                    </div>
                     <div className="p-4 bg-green-100 rounded-full text-green-600">
                        <FaDollarSign size={24} />
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 h-[300px] sm:h-[400px]">
                 <h2 className="text-lg sm:text-xl font-bold mb-4">Earnings History</h2>
                 <ResponsiveContainer width="100%" height="90%">
                    <AreaChart
                        data={[
                            { name: 'Week 1', earnings: 120 },
                            { name: 'Week 2', earnings: 210 },
                            { name: 'Week 3', earnings: 180 },
                            { name: 'Week 4', earnings: 290 },
                            { name: 'Week 5', earnings: 350 },
                            { name: 'Week 6', earnings: stats.totalEarnings || 420 }, // Dynamic anchor
                        ]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="earnings" stroke="#0ea5e9" fill="#e0f2fe" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WorkerHome;
