import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router';
import 'swiper/css';
import 'swiper/css/pagination';

const Hero = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
             
                modules={[Autoplay, Pagination]}
                className="mySwiper h-[400px] md:h-[550px] rounded-2xl overflow-hidden shadow-lg"
            >
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" alt="Team Work" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-6 sm:px-10 md:px-20">
                            <div className="text-white max-w-lg space-y-4">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">Complete Micro Tasks, <br className="hidden sm:block"/> Earn Real Money</h1>
                                <p className="text-base sm:text-lg text-gray-200">Join thousands of workers completing simple tasks everyday. Secure payments and instant withdrawals.</p>
                                <Link to="/dashboard" className="btn btn-primary px-10 rounded-lg mt-4 inline-flex items-center justify-center">Start Earning Now</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="Hiring" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 via-secondary-900/40 to-transparent flex items-center px-6 sm:px-10 md:px-20">
                            <div className="text-white max-w-lg space-y-4">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">Hire Top Talent <br className="hidden sm:block"/> For Micro Jobs</h1>
                                <p className="text-base sm:text-lg text-gray-200">Post your tasks and get them done quickly by our verified workers. Quality work guaranteed.</p>
                                <Link to="/dashboard" className="btn bg-white text-secondary-900 border-none hover:bg-gray-100 mt-4 px-10 rounded-lg font-bold inline-flex items-center justify-center text-center">Post a Task</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                 <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Payment" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/40 to-transparent flex items-center px-6 sm:px-10 md:px-20">
                            <div className="text-white max-w-lg space-y-4">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">Secure & Fast <br className="hidden sm:block"/> Payments</h1>
                                <p className="text-base sm:text-lg text-gray-200">We ensure secure transactions for both buyers and workers. Withdraw your earnings easily.</p>
                                <Link to="/about-us" className="btn btn-primary px-10 rounded-lg mt-4 inline-flex items-center justify-center">Learn More</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Hero;
