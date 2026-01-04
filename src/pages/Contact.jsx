import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-gray-600">
                        Have questions or suggestions? We'd love to hear from you. Reach out to our team and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 text-xl flex-shrink-0">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                                <p className="text-gray-500 text-sm">Our friendly team is here to help.</p>
                                <a href="mailto:support@taskmaster.com" className="text-primary-600 font-medium mt-2 block">support@taskmaster.com</a>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                             <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 text-xl flex-shrink-0">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                                <p className="text-gray-500 text-sm">Come say hello at our office HQ.</p>
                                <p className="text-gray-700 font-medium mt-2">123 Innovation Drive,<br/>Dhaka, Bangladesh</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                             <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 text-xl flex-shrink-0">
                                <FaPhone />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                <p className="text-gray-500 text-sm">Mon-Fri from 8am to 5pm.</p>
                                <a href="tel:+880123456789" className="text-primary-600 font-medium mt-2 block">+880 1234 567 89</a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-12">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="you@company.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="button" className="w-full btn btn-primary btn-lg rounded-xl">Send Message</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
