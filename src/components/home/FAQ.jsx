import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
    const faqs = [
        {
            question: "How do I earn money?",
            answer: "You can earn money by completing simple micro-tasks posted by buyers. These can range from data entry, social media interactions, website testing, and more. Once your submission is approved, the coins are added to your balance."
        },
        {
            question: "Is there a fee to join?",
            answer: "No, joining as a Worker is completely free. You get 10 free coins upon registration to get you started!"
        },
        {
            question: "How do I withdraw my earnings?",
            answer: "Once you reach the minimum withdrawal threshold, you can request a payout via your preferred payment method (e.g., Stripe/Bank Transfer) from your dashboard."
        },
        {
            question: "How do I post tasks as a Buyer?",
            answer: "Register as a Buyer (you get 50 bonus coins!), then go to your dashboard and click 'Add New Task'. detailed the instructions, set the pay per task, and publish."
        },
        {
            question: "What happens if a worker does a bad job?",
            answer: "As a buyer, you review every submission. If the proof provided doesn't match your requirements, you can reject the submission and you won't be charged for it."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl">
                 <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-widest mb-4">
                        <FaQuestionCircle /> Have Questions?
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <p className="text-gray-500 text-lg font-medium">Everything you need to know about the platform, earnings, and safety.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div key={index} className="group">
                                <button 
                                    className={`w-full px-8 py-6 text-left flex justify-between items-center transition-all duration-300 rounded-[24px] ${isActive ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/20' : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-100'}`}
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="font-black text-lg md:text-xl leading-snug pr-8">{faq.question}</span>
                                    <FaChevronDown className={`transform transition-transform duration-500 flex-shrink-0 ${isActive ? 'rotate-180 text-white' : 'text-primary-600'}`} />
                                </button>
                                
                                <div 
                                    className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${isActive ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-8 py-6 bg-white border border-primary-50 rounded-[24px] shadow-inner">
                                        <p className="text-gray-600 text-lg leading-relaxed font-medium">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
