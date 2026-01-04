import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import api from "../../../utils/api";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";

const CheckoutForm = ({ coins, price, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState("");

    const [backendError, setBackendError] = useState("");

    useEffect(() => {
        if (price > 0) {
            setBackendError("");
            api.post('/payments/create-payment-intent', { price, coins })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error("Error creating payment intent", err);
                    setBackendError("Failed to initialize payment. Please check server logs/configuration.");
                });
        }
    }, [price, coins]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError("");
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email || 'anonymous@example.com'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
            setCardError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // Save info to database
            const paymentInfo = {
                paymentIntentId: paymentIntent.id,
                amount: price,
                coins: coins
            };
            
            api.post('/payments/save-payment', paymentInfo)
                .then(res => {
                    if(res.data.success){
                         toast.success(`Payment Successful! ${coins} coins added.`);
                         onSuccess();
                    }
                })
                .catch(err => toast.error("Failed to save payment info"));
            
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="border border-gray-300 p-4 rounded-lg mb-4">
                <CardElement
                    options={{
                        hidePostalCode: true,
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            {backendError && <p className="text-error text-sm mb-4 font-semibold">{backendError}</p>}
            {cardError && <p className="text-red-500 text-sm mb-4">{cardError}</p>}
            <button 
                className="btn btn-primary w-full" 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? <span className="loading loading-spinner loading-sm"></span> : `Pay $${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
