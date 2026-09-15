import { useState, useEffect } from "react";

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("transactions");

        if (saved) {
            setTransactions(JSON.parse(saved));
        }
    }, []);

    function deleteTransaction(id) {
        const updatedTransactions = transactions.filter(
            (transaction) => transaction.id !== id
        );

        setTransactions(updatedTransactions);

        localStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions)
        );
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
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold mb-2"
                    >
                        💳 Transactions
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
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
                                Transactions
                            </h2>

                            <p className="text-sm text-gray-500">
                                View and manage your transactions.
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
                            All Transactions
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Keep track of every transaction in your business.
                        </p>

                    </div>

                    {/* TRANSACTION CARD */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">

                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Transaction History
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    {transactions.length} transaction
                                    {transactions.length !== 1 ? "s" : ""}
                                </p>
                            </div>

                            <a
                                href="/dashboard"
                                className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700"
                            >
                                + Add Transaction
                            </a>

                        </div>

                        {transactions.length === 0 ? (

                            <div className="p-12 text-center">

                                <div className="text-5xl mb-4">
                                    📋
                                </div>

                                <h3 className="text-lg font-semibold text-gray-800">
                                    No transactions yet
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Your transactions will appear here.
                                </p>

                                <a
                                    href="/dashboard"
                                    className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700"
                                >
                                    Add Your First Transaction
                                </a>

                            </div>

                        ) : (

                            <div>

                                {transactions.map((transaction) => (

                                    <div
                                        key={transaction.id}
                                        className="p-6 border-b last:border-b-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                    >

                                        <div className="flex items-center gap-4">

                                            <div
                                                className={
                                                    transaction.type === "in"
                                                        ? "w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl"
                                                        : "w-11 h-11 rounded-xl bg-red-100 text-red-500 flex items-center justify-center text-xl"
                                                }
                                            >
                                                {transaction.type === "in" ? "↑" : "↓"}
                                            </div>

                                            <div>

                                                <p className="font-semibold text-gray-900">
                                                    {transaction.category}
                                                </p>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {transaction.note || "No note"}
                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    {transaction.date}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex items-center gap-6">

                                            <p
                                                className={
                                                    transaction.type === "in"
                                                        ? "font-bold text-green-600"
                                                        : "font-bold text-red-500"
                                                }
                                            >
                                                {transaction.type === "in" ? "+" : "-"}₦
                                                {transaction.amount.toLocaleString()}
                                            </p>

                                            <button
                                                onClick={() =>
                                                    deleteTransaction(transaction.id)
                                                }
                                                className="text-sm text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Transactions;