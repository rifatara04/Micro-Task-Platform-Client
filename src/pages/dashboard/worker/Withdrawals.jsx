import { useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";
import api from "../../../utils/api";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const Withdrawals = () => {
    const { user, fetchUserData } = useContext(AuthContext); 
    // fetchUserData might be useful to update coins after withdrawal, but backend usually handles validity 
    // and we might need to refresh user state or just trust the local calculation until refresh.
    // Ideally AuthProvider should have a method to refetch user. We added fetchUserData previously.

    const withdrawalThreshold = 200;
    const conversionRate = 20; // 20 coins = $1
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        if(user) {
            setCoins(user.coins || 0);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const withdrawal_coin = parseInt(form.amount.value);
        const payment_system = form.paymentSystem.value;
        const account_number = form.account.value;
        
        if (withdrawal_coin > coins) {
            return toast.error("Insufficient coins");
        }
        if (withdrawal_coin < withdrawalThreshold) {
            return toast.error(`Minimum withdrawal is ${withdrawalThreshold} coins`);
        }
        
        setLoading(true);
        try {
            await api.post('/withdrawals', {
                withdrawal_coin,
                payment_system,
                account_number
            });
            toast.success("Withdrawal request submitted successfully!");
            form.reset();
            // Optionally refetch user data to see updated (though coins are only deducted on approval typically, 
            // or pending logic might vary. Controller says: check balance, but deduction happens on approval?
            // Wait, looking at controller: createWithdrawal DOES NOT deduct coins. approveWithdrawal DOES deduct.
            // So detailed balance stays same until approved. Logic is fine.
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to submit withdrawal");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <LoadingSpinner />;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Withdraw Your Earnings</h1>
            
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 sm:p-8 text-center text-white mb-8 shadow-lg">
                <p className="text-sm opacity-90 mb-2">Available Balance</p>
                <h2 className="text-3xl sm:text-5xl font-bold mb-2">{coins} <span className="text-xl font-normal">Coins</span></h2>
                <p className="text-base sm:text-lg opacity-90">= ${(coins / conversionRate).toFixed(2)} USD</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="label font-semibold text-gray-700">Withdrawal Amount (Coins)</label>
                        <input 
                            type="number" 
                            name="amount" 
                            placeholder={`Min ${withdrawalThreshold} coins`} 
                            className="input-field" 
                            defaultValue={withdrawalThreshold}
                            min={withdrawalThreshold}
                            max={coins}
                            required
                        />
                         <label className="label">
                            <span className="label-text-alt text-gray-500">20 Coins = $1 Dollar</span>
                        </label>
                    </div>

                    <div>
                        <label className="label font-semibold text-gray-700">Payment System</label>
                        <select className="input-field" name="paymentSystem" required>
                            <option value="stripe">Stripe</option>
                            <option value="bank">Bank Transfer</option>
                            <option value="paypal">PayPal</option>
                            <option value="bkash">Bkash</option>
                            <option value="nagad">Nagad</option>
                        </select>
                    </div>

                    <div>
                         <label className="label font-semibold text-gray-700">Account Number / Email</label>
                         <input type="text" name="account" placeholder="Enter account details..." className="input-field" required />
                    </div>

                    {coins < withdrawalThreshold ? (
                        <div className="alert alert-warning text-sm">
                            You need at least {withdrawalThreshold} coins to withdraw. Keep working!
                        </div>
                    ) : (
                        <button type="submit" className="btn btn-primary w-full py-3 text-lg" disabled={loading}>
                            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Withdraw"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Withdrawals;
