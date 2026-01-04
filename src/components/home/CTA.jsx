import { Link } from 'react-router';
import { FaRocket, FaArrowRight } from 'react-icons/fa';

const CTA = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-primary-600"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-64 -mt-64 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/20 rounded-full -ml-64 -mb-64 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold mb-6 backdrop-blur-md border border-white/20">
                        <FaRocket className="text-yellow-400" />
                        <span>Ready to grow with us?</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                        Start Earning or Hiring <br className="hidden md:block"/> In Just A Few Clicks
                    </h2>
                    
                    <p className="text-xl text-primary-50 mb-12 max-w-2xl mx-auto opacity-90">
                        Join our thriving community of over 25,000 users. Whether you're a student looking to earn or a business looking for talent.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/register" 
                            className="btn btn-md w-full sm:w-auto px-8 py-3.5 bg-white text-primary-600 font-bold border-none hover:bg-gray-50 hover:shadow-xl hover:shadow-white/10 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2.5 rounded-full"
                        >
                            Get Started Now <FaArrowRight />
                        </Link>
                        <Link 
                            to="/contact" 
                            className="btn btn-md btn-outline w-full sm:w-auto px-8 py-3.5 border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2.5 rounded-full"
                        >
                            Contact Support
                        </Link>
                    </div>
                    
                    <p className="mt-10 text-primary-100 text-sm font-medium opacity-60">
                        No credit card required to sign up. 10 free coins for every worker!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CTA;
