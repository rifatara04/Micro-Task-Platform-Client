import { FaCoins, FaExclamationTriangle } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
import CheckoutForm from "./CheckoutForm";
import { AuthContext } from "../../../providers/AuthProvider";

// Make sure to add VITE_STRIPE_PUBLIC_KEY to your .env.local
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

const PurchaseCoin = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const { fetchUserData } = useContext(AuthContext);

    const packages = [
        { coins: 10, price: 1, popular: false },
        { coins: 150, price: 10, popular: true },
        { coins: 500, price: 20, popular: false },
        { coins: 1000, price: 35, popular: false },
    ];

    const handleBuyClick = (pkg) => {
        setSelectedPackage(pkg);
        document.getElementById('payment_modal').showModal();
    };

    const handleSuccess = async () => {
        // Refresh user data to update coin balance
        await fetchUserData();
        document.getElementById('payment_modal').close();
        setSelectedPackage(null);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Purchase Coins</h1>
            <p className="text-gray-500 mb-8">Refill your balance to post more tasks.</p>

            {!stripePublicKey && (
                 <div className="alert alert-error mb-6 shadow-sm">
                    <FaExclamationTriangle />
                    <span>
                        <strong>Stripe Configuration Missing:</strong> Please add <code>VITE_STRIPE_PUBLIC_KEY</code> to your <code>client/.env.local</code> file.
                    </span>
                 </div>
            )}
            
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.map((pkg, idx) => (
                    <div key={idx} className={`card bg-white shadow-sm border ${pkg.popular ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50' : 'border-gray-200'} rounded-xl p-6 relative hover:shadow-md transition-all`}>
                        {pkg.popular && (
                            <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                                POPULAR
                            </div>
                        )}
                         <div className="flex justify-center mb-4">
                             <FaCoins className="text-4xl text-yellow-500" />
                         </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800">{pkg.coins} Coins</h2>
                        <div className="text-center my-4">
                            <span className="text-3xl font-bold text-primary-600">${pkg.price}</span>
                        </div>
                        <button 
                            onClick={() => handleBuyClick(pkg)}
                            disabled={!stripePublicKey}
                            className="btn btn-primary btn-outline w-full hover:bg-primary-600 hover:text-white hover:border-primary-600"
                        >
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Payment Modal */}
            <dialog id="payment_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Complete Your Purchase</h3>
                    {selectedPackage && stripePromise && (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm 
                                coins={selectedPackage.coins} 
                                price={selectedPackage.price}
                                onSuccess={handleSuccess} 
                            />
                        </Elements>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default PurchaseCoin;
