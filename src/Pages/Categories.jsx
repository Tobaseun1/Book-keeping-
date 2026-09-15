import { useState, useEffect } from "react";

function Categories() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("transactions");

        if (saved) {
            setTransactions(JSON.parse(saved));
        }
    }, []);

    const categories = [
        "Sales",
        "Stock/Inventory",
        "Rent",
        "Transport",
        "Utilities",
        "Salaries",
        "Other",
    ];

    function getMoneyIn(category) {
        return transactions
            .filter(
                (transaction) =>
                    transaction.category === category &&
                    transaction.type === "in"
            )
            .reduce((total, transaction) => total + transaction.amount, 0);
    }

    function getMoneyOut(category) {
        return transactions
            .filter(
                (transaction) =>
                    transaction.category === category &&
                    transaction.type === "out"
            )
            .reduce((total, transaction) => total + transaction.amount, 0);
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
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold mb-2"
                    >
                        📁 Categories
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
                    >
                        📈 Reports
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
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
                                Categories
                            </h2>

                            <p className="text-sm text-gray-500">
                                Understand where your money comes from and goes.
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            B
                        </div>

                    </div>

                </header>

                {/* CONTENT */}
                <main className="max-w-7xl mx-auto px-6 py-10">

                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-900">
                            Categories
                        </h1>

                        <p className="text-gray-500 mt-2">
                            See how your transactions are distributed.
                        </p>

                    </div>

                    {/* CATEGORY CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {categories.map((category) => {

                            const moneyIn = getMoneyIn(category);
                            const moneyOut = getMoneyOut(category);
                            const total = moneyIn + moneyOut;

                            return (
                                <div
                                    key={category}
                                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
                                >

                                    {/* TOP */}
                                    <div className="flex justify-between items-center">

                                        <div className="flex items-center gap-3">

                                            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                                📁
                                            </div>

                                            <div>
                                                <h2 className="font-bold text-gray-900">
                                                    {category}
                                                </h2>

                                                <p className="text-xs text-gray-500">
                                                    {transactions.filter(
                                                        (transaction) =>
                                                            transaction.category === category
                                                    ).length}{" "}
                                                    transactions
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    {/* TOTAL */}
                                    <div className="mt-6">

                                        <p className="text-sm text-gray-500">
                                            Total Activity
                                        </p>

                                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                            ₦{total.toLocaleString()}
                                        </h3>

                                    </div>

                                    {/* IN / OUT */}
                                    <div className="grid grid-cols-2 gap-3 mt-5">

                                        <div className="bg-green-50 rounded-xl p-3">

                                            <p className="text-xs text-gray-500">
                                                Money In
                                            </p>

                                            <p className="font-bold text-green-600 mt-1">
                                                ₦{moneyIn.toLocaleString()}
                                            </p>

                                        </div>

                                        <div className="bg-red-50 rounded-xl p-3">

                                            <p className="text-xs text-gray-500">
                                                Money Out
                                            </p>

                                            <p className="font-bold text-red-500 mt-1">
                                                ₦{moneyOut.toLocaleString()}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Categories;