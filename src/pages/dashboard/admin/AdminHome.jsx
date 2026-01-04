import { useEffect, useState } from "react";
import api from "../../../utils/api";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { FaUsers, FaCoins, FaMoneyBillWave } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminHome = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCoins: 0,
        totalPayments: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/users/stats');
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <LoadingSpinner smallHeight />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card mesh-purple p-6 shadow-sm rounded-xl border border-purple-100 flex flex-row items-center justify-between">
                    <div>
                        <div className="text-gray-600 text-sm font-medium">Total Users</div>
                        <div className="text-4xl font-bold text-gray-800 mt-2">{stats.totalUsers}</div>
                    </div>
                    <div className="p-4 bg-purple-100 rounded-full text-purple-600">
                        <FaUsers size={24} />
                    </div>
                </div>
                <div className="card mesh-blue p-6 shadow-sm rounded-xl border border-blue-100 flex flex-row items-center justify-between">
                    <div>
                        <div className="text-gray-600 text-sm font-medium">Total Coins in Circulation</div>
                        <div className="text-4xl font-bold text-blue-700 mt-2">{stats.totalCoins}</div>
                    </div>
                     <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                        <FaCoins size={24} />
                    </div>
                </div>
                <div className="card mesh-green p-6 shadow-sm rounded-xl border border-green-100 flex flex-row items-center justify-between">
                    <div>
                         <div className="text-gray-600 text-sm font-medium">Total Payments processed</div>
                         <div className="text-4xl font-bold text-green-700 mt-2">${stats.totalPayments}</div>
                    </div>
                     <div className="p-4 bg-green-100 rounded-full text-green-600">
                        <FaMoneyBillWave size={24} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                 {/* Activity Chart */}
                 <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 h-[300px] sm:h-[400px]">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">Platform Activity</h2>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart
                            data={[
                                { name: 'Mon', tasks: 40, submissions: 24, amt: 2400 },
                                { name: 'Tue', tasks: 30, submissions: 13, amt: 2210 },
                                { name: 'Wed', tasks: 20, submissions: 98, amt: 2290 },
                                { name: 'Thu', tasks: 27, submissions: 39, amt: 2000 },
                                { name: 'Fri', tasks: 18, submissions: 48, amt: 2181 },
                                { name: 'Sat', tasks: 23, submissions: 38, amt: 2500 },
                                { name: 'Sun', tasks: 34, submissions: 43, amt: 2100 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="tasks" fill="#0ea5e9" name="New Tasks" />
                            <Bar dataKey="submissions" fill="#d946ef" name="Submissions" />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>

                 {/* Role Distribution */}
                 <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 h-[300px] sm:h-[400px]">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">User Roles</h2>
                     <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Workers', value: stats.totalUsers * 0.7 }, // Mock split
                                    { name: 'Buyers', value: stats.totalUsers * 0.3 },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                <Cell key="cell-0" fill="#0ea5e9" />
                                <Cell key="cell-1" fill="#d946ef" />
                            </Pie>
                            <Tooltip />
                             <Legend />
                        </PieChart>
                     </ResponsiveContainer>
                 </div>
            </div>
        </div>
    );
};

export default AdminHome;
