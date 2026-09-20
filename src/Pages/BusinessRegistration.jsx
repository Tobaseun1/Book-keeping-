import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BusinessRegistration() {
    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState("NGN");
    const [startingBalance, setStartingBalance] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!businessName.trim()) {
            return;
        }

        localStorage.setItem("businessName", businessName);
        localStorage.setItem("businessDescription", description);
        localStorage.setItem("currency", currency);
        localStorage.setItem("startingBalance", startingBalance);

        navigate("/dashboard");
    }

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Register Your Business
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Set up your business before you start bookkeeping.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Name
                        </label>

                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Enter your business name"
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell us a little about your business"
                            rows="4"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Currency
                        </label>

                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="NGN">Nigerian Naira (₦)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="GBP">British Pound (£)</option>
                            <option value="EUR">Euro (€)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Starting Balance
                        </label>

                        <input
                            type="number"
                            value={startingBalance}
                            onChange={(e) => setStartingBalance(e.target.value)}
                            placeholder="₦0.00"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <p className="text-xs text-gray-500 mt-2">
                            Optional: enter the amount you had before recording transactions.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Continue to Dashboard →
                    </button>

                </form>
            </div>
        </div>
    );
}

export default BusinessRegistration;