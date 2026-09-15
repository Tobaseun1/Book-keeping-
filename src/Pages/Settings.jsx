import { useState } from "react";

function Settings() {
    const [businessName, setBusinessName] = useState(
        localStorage.getItem("businessName") || "My Business"
    );

    const [currency, setCurrency] = useState(
        localStorage.getItem("currency") || "NGN"
    );

    const [startingBalance, setStartingBalance] = useState(
        localStorage.getItem("startingBalance") || ""
    );

    const [description, setDescription] = useState(
        localStorage.getItem("businessDescription") || ""
    );

    const [saved, setSaved] = useState(false);

    function saveSettings(e) {
        e.preventDefault();

        localStorage.setItem("businessName", businessName);
        localStorage.setItem("currency", currency);
        localStorage.setItem("startingBalance", startingBalance);
        localStorage.setItem("businessDescription", description);

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 3000);
    }

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex">

            {/* SIDEBAR */}
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 min-h-screen flex-col">

                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-blue-600">
                        Bookkeeping
                    </h1>

                    <p className="text-xs text-gray-500 mt-1">
                        Simple financial management
                    </p>
                </div>

                <nav className="p-4 flex-1">

                    <p className="text-xs font-semibold text-gray-400 uppercase px-3 mb-3">
                        Menu
                    </p>

                    <a
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
                    >
                        📊 Dashboard
                    </a>

                    <a
                        href="/transactions"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
                    >
                        💳 Transactions
                    </a>

                    <a
                        href="/categories"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
                    >
                        📁 Categories
                    </a>

                    <a
                        href="/reports"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
                    >
                        📈 Reports
                    </a>

                    <a
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold"
                    >
                        ⚙️ Settings
                    </a>

                </nav>

                <div className="p-4 border-t border-gray-200">

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50">
                        🚪 Logout
                    </button>

                </div>

            </aside>

            {/* MAIN */}
            <div className="flex-1">

                {/* HEADER */}
                <header className="bg-white border-b border-gray-200">

                    <div className="px-6 py-5 flex justify-between items-center">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Settings
                            </h2>

                            <p className="text-sm text-gray-500">
                                Manage your business information.
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            B
                        </div>

                    </div>

                </header>

                {/* CONTENT */}
                <main className="max-w-4xl mx-auto px-6 py-10">

                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-900">
                            Business Settings
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Update your business information and bookkeeping preferences.
                        </p>

                    </div>

                    <form
                        onSubmit={saveSettings}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm"
                    >

                        {/* BUSINESS INFORMATION */}
                        <div className="p-6 border-b border-gray-200">

                            <h2 className="text-xl font-bold text-gray-900">
                                Business Information
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Basic information about your business.
                            </p>

                        </div>

                        <div className="p-6 space-y-6">

                            {/* BUSINESS NAME */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Business Name
                                </label>

                                <input
                                    type="text"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="Enter your business name"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* DESCRIPTION */}
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

                        </div>

                        {/* BOOKKEEPING */}
                        <div className="p-6 border-t border-b border-gray-200">

                            <h2 className="text-xl font-bold text-gray-900">
                                Bookkeeping Preferences
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Set your currency and opening balance.
                            </p>

                        </div>

                        <div className="p-6 space-y-6">

                            {/* CURRENCY */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Currency
                                </label>

                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="NGN">
                                        Nigerian Naira (₦)
                                    </option>

                                    <option value="USD">
                                        US Dollar ($)
                                    </option>

                                    <option value="GBP">
                                        British Pound (£)
                                    </option>

                                    <option value="EUR">
                                        Euro (€)
                                    </option>

                                </select>

                            </div>

                            {/* STARTING BALANCE */}
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
                                    Enter the amount you had before recording transactions.
                                </p>

                            </div>

                        </div>

                        {/* SAVE */}
                        <div className="p-6 border-t border-gray-200 flex items-center justify-between">

                            {saved ? (
                                <p className="text-sm font-medium text-green-600">
                                    ✓ Settings saved successfully
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Your settings are saved in this browser.
                                </p>
                            )}

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                                Save Settings
                            </button>

                        </div>

                    </form>

                </main>

            </div>

        </div>
    );
}

export default Settings;