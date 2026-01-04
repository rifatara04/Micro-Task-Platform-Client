import { FaUserPlus, FaSearchDollar, FaMoneyCheckAlt, FaTasks, FaCheckCircle, FaHandHoldingUsd } from 'react-icons/fa';

const HowItWorks = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

             <div className="container mx-auto px-4 relative z-10">
                 <div className="text-center mb-20">
                     <div className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-widest mb-4">
                         The Process
                     </div>
                     <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">How It Works</h2>
                     <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">Whether you want to earn money or get tasks done, <br/> we've built a seamless experience for you.</p>
                 </div>
 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                     {/* Worker Flow */}
                     <div className="bg-gradient-to-br from-primary-50 to-white rounded-[40px] p-8 lg:p-12 relative overflow-hidden border border-primary-100 shadow-xl shadow-primary-500/5 group">
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                         
                         <h3 className="text-3xl font-black text-primary-900 mb-10 flex items-center gap-4">
                             <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-primary-500/30">W</div> 
                             For Workers
                         </h3>
                         
                         <div className="space-y-12 relative">
                             {/* Connector Line */}
                             <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary-200 via-primary-100 to-transparent"></div>

                             {[
                                 { icon: <FaUserPlus />, title: "1. Create Account", desc: "Register as a worker and set up your profile in minutes with ease." },
                                 { icon: <FaTasks />, title: "2. Complete Tasks", desc: "Browse available micro-tasks and complete them following simple guides." },
                                 { icon: <FaMoneyCheckAlt />, title: "3. Get Paid", desc: "Your work gets approved fast, and you receive payments instantly." }
                             ].map((step, i) => (
                                 <div key={i} className="flex gap-6 relative group/item">
                                     <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary-600 text-xl group-hover/item:scale-110 group-hover/item:bg-primary-600 group-hover/item:text-white transition-all duration-300 relative z-10 border border-primary-50">
                                         {step.icon}
                                     </div>
                                     <div className="pt-1">
                                         <h4 className="text-xl font-black text-gray-900 mb-2">{step.title}</h4>
                                         <p className="text-gray-500 font-medium leading-relaxed">{step.desc}</p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
 
                     {/* Buyer Flow */}
                     <div className="bg-gradient-to-br from-secondary-50 to-white rounded-[40px] p-8 lg:p-12 relative overflow-hidden border border-secondary-100 shadow-xl shadow-secondary-500/5 group">
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                         
                         <h3 className="text-3xl font-black text-secondary-900 mb-10 flex items-center gap-4">
                             <div className="w-12 h-12 bg-secondary-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-secondary-500/30">B</div> 
                             For Buyers
                         </h3>
                         
                         <div className="space-y-12 relative">
                             {/* Connector Line */}
                             <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-secondary-200 via-secondary-100 to-transparent"></div>

                             {[
                                 { icon: <FaSearchDollar />, title: "1. Post a Task", desc: "Define your requirements, set the pay, and reach thousands of workers." },
                                 { icon: <FaCheckCircle />, title: "2. Review Work", desc: "Review submissions and only approve work that meets your quality standards." },
                                 { icon: <FaHandHoldingUsd />, title: "3. Guaranteed Value", desc: "Pay only for work you're happy with. We handle secure processing." }
                             ].map((step, i) => (
                                 <div key={i} className="flex gap-6 relative group/item">
                                     <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-secondary-600 text-xl group-hover/item:scale-110 group-hover/item:bg-secondary-600 group-hover/item:text-white transition-all duration-300 relative z-10 border border-secondary-50">
                                         {step.icon}
                                     </div>
                                     <div className="pt-1">
                                         <h4 className="text-xl font-black text-gray-900 mb-2">{step.title}</h4>
                                         <p className="text-gray-500 font-medium leading-relaxed">{step.desc}</p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             </div>
         </section>
    );
};

export default HowItWorks;
