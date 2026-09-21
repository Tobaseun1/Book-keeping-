import { useState, useEffect } from "react";

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadTransactions();

        window.addEventListener("transactionsUpdated", loadTransactions);

        return () => {
            window.removeEventListener(
                "transactionsUpdated",
                loadTransactions
            );
        };
    }, []);

    function loadTransactions() {
        const saved = localStorage.getItem("transactions");

        if (saved) {
            setTransactions(JSON.parse(saved));
        } else {
            setTransactions([]);
        }
    }

    function deleteTransaction(id) {
        const updatedTransactions = transactions.filter(
            (transaction) => transaction.id !== id
        );

        localStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions)
        );

        setTransactions(updatedTransactions);

        window.dispatchEvent(new Event("transactionsUpdated"));
    }

    const currency =
        localStorage.getItem("currency") || "NGN";

    const currencySymbols = {
        NGN: "₦",
        USD: "$",
        GBP: "£",
        EUR: "€",
    };

    const currencySymbol =
        currencySymbols[currency] || "₦";

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex">

            {/* SIDEBAR */}
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 min-h-screen flex-col">

                <div className="p-6 border-b border-gray-200">
                    <a href="/" aria-label="Go to the BasirSeun home page">
                        <img src="/Basir.png" alt="BasirSeun" className="h-24 w-full object-contain" />
                    </a>

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
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
                    >
                        ⚙️ Settings
                    </a>

                </nav>

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

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                All Transactions
                            </h1>

                            <p className="text-gray-500 mt-2">
                                You have {transactions.length} transaction
                                {transactions.length !== 1 ? "s" : ""}.
                            </p>
                        </div>

                        <a
                            href="/dashboard"
                            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-center"
                        >
                            + Add Transaction
                        </a>

                    </div>

                    {/* TRANSACTIONS */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                        {transactions.length === 0 ? (

                            <div className="p-12 text-center">

                                <div className="text-5xl mb-4">
                                    💳
                                </div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    No transactions yet
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    Add your first transaction from the dashboard.
                                </p>

                                <a
                                    href="/dashboard"
                                    className="inline-block mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700"
                                >
                                    Add Transaction
                                </a>

                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-gray-50 border-b border-gray-200">

                                        <tr>

                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                Date
                                            </th>

                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                Type
                                            </th>

                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                Category
                                            </th>

                                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                                Note
                                            </th>

                                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                                Amount
                                            </th>

                                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {transactions.map((transaction) => (

                                            <tr
                                                key={transaction.id}
                                                className="border-b border-gray-100 hover:bg-gray-50"
                                            >

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {transaction.date}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <span
                                                        className={
                                                            transaction.type === "in"
                                                                ? "px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                                                                : "px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700"
                                                        }
                                                    >
                                                        {transaction.type === "in"
                                                            ? "Money In"
                                                            : "Money Out"}
                                                    </span>

                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {transaction.category}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {transaction.note || "-"}
                                                </td>

                                                <td
                                                    className={
                                                        transaction.type === "in"
                                                            ? "px-6 py-4 text-right font-bold text-green-600"
                                                            : "px-6 py-4 text-right font-bold text-red-500"
                                                    }
                                                >
                                                    {transaction.type === "in"
                                                        ? "+"
                                                        : "-"}
                                                    {currencySymbol}
                                                    {transaction.amount.toLocaleString()}
                                                </td>

                                                <td className="px-6 py-4 text-right">

                                                    <button
                                                        onClick={() =>
                                                            deleteTransaction(
                                                                transaction.id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Transactions;
