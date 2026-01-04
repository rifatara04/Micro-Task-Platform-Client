const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-gray-500">Last updated: January 2, 2026</p>
                </div>

                <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                    <p>
                        At TaskMaster, accessible from taskmaster.com, one of our main priorities is the privacy of our visitors. 
                        This Privacy Policy document contains types of information that is collected and recorded by TaskMaster and how we use it.
                    </p>

                    <h3 className="text-gray-900 font-bold mt-8 mb-4">Information We Collect</h3>
                    <p>
                        We collect information you provide directly to us. For example, we collect information when you create an account, 
                        subscribe to a newsletter, or communicate with us. The types of information we may collect include your name, 
                        email address, payment information, and any other information you choose to provide.
                    </p>

                    <h3 className="text-gray-900 font-bold mt-8 mb-4">How We Use Your Information</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Process your transactions and prevent fraud</li>
                        <li>Communicate with you, either directly or through one of our partners</li>
                    </ul>

                    <h3 className="text-gray-900 font-bold mt-8 mb-4">Log Files</h3>
                    <p>
                        TaskMaster follows a standard procedure of using log files. These files log visitors when they visit websites. 
                        All hosting companies do this and a part of hosting services' analytics. The information collected by log files 
                        include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, 
                        referring/exit pages, and possibly the number of clicks.
                    </p>

                    <h3 className="text-gray-900 font-bold mt-8 mb-4">Cookies and Web Beacons</h3>
                    <p>
                        Like any other website, TaskMaster uses 'cookies'. These cookies are used to store information including visitors' 
                        preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize 
                        the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                    </p>

                    <h3 className="text-gray-900 font-bold mt-8 mb-4">Changes to This Privacy Policy</h3>
                    <p>
                        We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. 
                        We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, 
                        after they are posted on this page.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl mt-12 border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-2">Have specific questions?</h4>
                        <p className="text-sm">
                            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at 
                            <a href="mailto:privacy@taskmaster.com" className="text-primary-600 font-medium ml-1">privacy@taskmaster.com</a>.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
