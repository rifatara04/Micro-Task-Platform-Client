import { useEffect, useState } from 'react';
import { FaCoins, FaCrown, FaStar } from 'react-icons/fa';
import api from '../../utils/api';
import LoadingSpinner from '../shared/LoadingSpinner';

const BestWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkers = async () => {
             try {
                 const { data } = await api.get('/users/best');
                 setWorkers(data);
             } catch (error) {
                 console.error("Failed to fetch best workers", error);
             } finally {
                 setLoading(false);
             }
        };

        fetchWorkers();
    }, []);

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-30 -ml-48 -mb-48"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-widest mb-4">
                        Wall of Fame
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Our Top Workers</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">Meet the most active earners in our community who consistently <br className="hidden md:block"/> deliver high-quality work.</p>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workers.map((worker, index) => (
                           <div 
                                key={worker._id} 
                                className="group relative bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
                           >
                                {/* Rank Badge */}
                                <div className="absolute top-4 left-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center font-black text-gray-400 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-500">
                                    #{index + 1}
                                </div>

                                {/* Achievement Badge */}
                                {index === 0 && (
                                    <div className="absolute top-4 right-4 text-amber-500 animate-pulse">
                                        <FaCrown className="text-2xl" />
                                    </div>
                                )}

                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-primary-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 scale-150"></div>
                                    <img 
                                        src={worker.photo || "https://i.ibb.co/3M3h4h2/user.png"} 
                                        alt={worker.name} 
                                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>

                                <h3 className="text-xl font-black text-gray-900 mb-2 truncate w-full px-4">{worker.name}</h3>
                                
                                <div className="flex items-center gap-1 text-amber-400 mb-4">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>

                                <div className="bg-primary-50 px-6 py-3 rounded-2xl flex items-center gap-3 group-hover:bg-primary-600 transition-colors duration-500">
                                    <FaCoins className="text-yellow-500 text-xl group-hover:text-white transition-colors" /> 
                                    <span className="text-2xl font-black text-primary-700 group-hover:text-white transition-colors">
                                        {worker.coins.toLocaleString()}
                                    </span>
                                    <span className="text-xs font-bold text-primary-400 uppercase tracking-wider group-hover:text-primary-100 transition-colors pt-1">
                                        Coins
                                    </span>
                                </div>
                           </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BestWorkers;
