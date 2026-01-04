import { FaUsers, FaTasks, FaCheckCircle, FaGlobe } from 'react-icons/fa';

const Stats = () => {
    const stats = [
        { id: 1, label: "Total Users", value: "25k+", icon: <FaUsers />, color: "bg-blue-500" },
        { id: 2, label: "Tasks Completed", value: "150k+", icon: <FaCheckCircle />, color: "bg-green-500" },
        { id: 3, label: "Active Jobs", value: "1.2k", icon: <FaTasks />, color: "bg-purple-500" },
        { id: 4, label: "Countries Served", value: "45+", icon: <FaGlobe />, color: "bg-amber-500" },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.id} className="group p-6 rounded-3xl border border-gray-100 bg-white hover:border-primary-100 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 flex flex-col items-center text-center">
                            <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-gray-200`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
