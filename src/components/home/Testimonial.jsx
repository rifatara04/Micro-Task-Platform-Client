import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Emily Thompson",
            role: "Buyer",
            image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            feedback: "I was amazed by how quickly my tasks were completed. The quality of work from the workers here is outstanding!",
        },
        {
            id: 2,
            name: "David Chen",
            role: "Worker",
            image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            feedback: "This platform has given me a great opportunity to earn extra income in my free time. The payments are always on time.",
        },
        {
            id: 3,
            name: "Sarah Williams",
            role: "Buyer",
            image: "https://i.pravatar.cc/150?u=a04258114e29026302d",
            feedback: "The interface is so easy to use. I posted a data entry task and it was done within an hour. Highly recommended!",
        },
        {
            id: 4,
            name: "Michael Brown",
            role: "Worker",
            image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            feedback: "Reliable and transparent. I love that I can choose tasks that fit my skills. Best micro-task site I've tried.",
        },
    ];

    return (
        <section className="py-16 bg-white overflow-hidden">
             <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Users Say</h2>
                     <p className="text-gray-500 max-w-2xl mx-auto">Don't just take our word for it. Here's what our community has to say about their experience.</p>
                </div>
                
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper !pb-12"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-full flex flex-col card hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                     <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                                     <div>
                                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-600">{testimonial.role}</span>
                                     </div>
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
                                <div className="mt-auto pt-4 flex gap-1 text-yellow-400 text-sm">
                                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
             </div>
        </section>
    );
};

export default Testimonials;
