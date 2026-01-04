import { Link } from "react-router";

const AboutUs = () => {
    return (
        <div className="bg-white min-h-screen pt-20 pb-16">
            <div className="container mx-auto px-4">
                
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                        Empowering the World, <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                            One Micro-Task at a Time
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        We connect businesses needing quick results with individuals seeking flexible earning opportunities. Our platform bridges the gap, creating value for everyone.
                    </p>
                    <Link to="/register" className="btn btn-primary btn-lg rounded-full px-8">Join Our Community</Link>
                </div>

                {/* Mission & Vision Grid */}
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
                    <div className="bg-primary-50 rounded-3xl p-8 lg:p-10 border border-primary-100">
                        <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-3xl mb-6">🚀</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To provide accessible, fair, and secure earning opportunities for anyone, anywhere in the world. We believe in democratizing digital work and ensuring that talent meets opportunity without barriers.
                        </p>
                    </div>
                    <div className="bg-secondary-50 rounded-3xl p-8 lg:p-10 border border-secondary-100">
                        <div className="w-14 h-14 bg-secondary-100 rounded-xl flex items-center justify-center text-3xl mb-6">👁️</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To become the world's most trusted micro-tasking ecosystem, fostering a global community of satisfied buyers and empowered workers who grow and succeed together.
                        </p>
                    </div>
                </div>

                {/* Team Section (Placeholder for now) */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet the Creator</h2>
                    <div className="flex flex-col items-center">
                         <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden mb-6 border-4 border-white shadow-lg">
                            <img src="./1759046830004.jpg" alt="Creator" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Ashikur Rahman</h3>
                        <p className="text-primary-600 font-medium mb-4">Lead Developer</p>
                        <p className="text-gray-500 max-w-md">
                            Passionate MERN stack developer dedicated to building scalable and user-centric web applications.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="https://github.com/ashikurahman1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 text-2xl"><i className="fab fa-github"></i></a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 text-2xl"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
