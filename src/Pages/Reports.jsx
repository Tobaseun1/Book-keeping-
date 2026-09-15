import { useState, useEffect } from "react";

function Reports() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("transactions");

        if (saved) {
            setTransactions(JSON.parse(saved));
        }
    }, []);

    const moneyIn = transactions
        .filter((transaction) => transaction.type === "in")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const moneyOut = transactions
        .filter((transaction) => transaction.type === "out")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const startingBalance =
        Number(localStorage.getItem("startingBalance")) || 0;

    const balance = startingBalance + moneyIn - moneyOut;

    const totalTransactions = transactions.length;

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
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold mb-2"
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
                                Reports
                            </h2>

                            <p className="text-sm text-gray-500">
                                Understand your business performance.
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
                            Financial Reports
                        </h1>

                        <p className="text-gray-500 mt-2">
                            A simple overview of your business finances.
                        </p>

                    </div>

                    {/* SUMMARY */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <p className="text-sm text-gray-500">
                                Total Balance
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900 mt-3">
                                ₦{balance.toLocaleString()}
                            </h2>

                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <p className="text-sm text-gray-500">
                                Total Money In
                            </p>

                            <h2 className="text-3xl font-bold text-green-600 mt-3">
                                ₦{moneyIn.toLocaleString()}
                            </h2>

                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <p className="text-sm text-gray-500">
                                Total Money Out
                            </p>

                            <h2 className="text-3xl font-bold text-red-500 mt-3">
                                ₦{moneyOut.toLocaleString()}
                            </h2>

                        </div>

                    </div>

                    {/* MONEY FLOW */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-8 p-6">

                        <h2 className="text-xl font-bold text-gray-900">
                            Money Flow
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Compare money coming into your business with money going out.
                        </p>

                        <div className="mt-8">

                            <div className="flex justify-between mb-2">

                                <span className="text-sm font-medium text-gray-700">
                                    Money In
                                </span>

                                <span className="text-sm font-bold text-green-600">
                                    ₦{moneyIn.toLocaleString()}
                                </span>

                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-4">

                                <div
                                    className="bg-green-500 h-4 rounded-full"
                                    style={{
                                        width:
                                            moneyIn + moneyOut === 0
                                                ? "0%"
                                                : `${(moneyIn / (moneyIn + moneyOut)) * 100}%`,
                                    }}
                                ></div>

                            </div>

                        </div>

                        <div className="mt-6">

                            <div className="flex justify-between mb-2">

                                <span className="text-sm font-medium text-gray-700">
                                    Money Out
                                </span>

                                <span className="text-sm font-bold text-red-500">
                                    ₦{moneyOut.toLocaleString()}
                                </span>

                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-4">

                                <div
                                    className="bg-red-500 h-4 rounded-full"
                                    style={{
                                        width:
                                            moneyIn + moneyOut === 0
                                                ? "0%"
                                                : `${(moneyOut / (moneyIn + moneyOut)) * 100}%`,
                                    }}
                                ></div>

                            </div>

                        </div>

                    </div>

                    {/* REPORT DETAILS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-900">
                                Transaction Summary
                            </h2>

                            <div className="mt-6 space-y-5">

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Total Transactions
                                    </span>

                                    <span className="font-bold text-gray-900">
                                        {totalTransactions}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Money In Transactions
                                    </span>

                                    <span className="font-bold text-green-600">
                                        {
                                            transactions.filter(
                                                (transaction) => transaction.type === "in"
                                            ).length
                                        }
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Money Out Transactions
                                    </span>

                                    <span className="font-bold text-red-500">
                                        {
                                            transactions.filter(
                                                (transaction) => transaction.type === "out"
                                            ).length
                                        }
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-900">
                                Net Position
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Money in minus money out.
                            </p>

                            <h3
                                className={
                                    balance >= 0
                                        ? "text-4xl font-bold text-green-600 mt-8"
                                        : "text-4xl font-bold text-red-500 mt-8"
                                }
                            >
                                ₦{balance.toLocaleString()}
                            </h3>

                            <p className="text-sm text-gray-500 mt-3">
                                {balance >= 0
                                    ? "Your recorded income is currently higher than your expenses."
                                    : "Your recorded expenses are currently higher than your income."}
                            </p>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Reports;