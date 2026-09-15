import { useState, useEffect } from "react";

function Dashboard() {
    // =========================
    // TRANSACTIONS
    // =========================
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    const [amount, setAmount] = useState("");
    const [type, setType] = useState("in");
    const [category, setCategory] = useState("Sales");
    const [note, setNote] = useState("");

    // Save transactions to localStorage
    useEffect(() => {
        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );
    }, [transactions]);

    // =========================
    // ADD TRANSACTION
    // =========================
    function addTransaction(e) {
        e.preventDefault();

        if (!amount) return;

        const newTransaction = {
            id: Date.now(),
            amount: Number(amount),
            type,
            category,
            note,
            date: new Date().toLocaleDateString(),
        };

        setTransactions([
            newTransaction,
            ...transactions,
        ]);

        setAmount("");
        setNote("");
    }

    // =========================
    // DELETE TRANSACTION
    // =========================
    function deleteTransaction(id) {
        setTransactions(
            transactions.filter(
                (transaction) => transaction.id !== id
            )
        );
    }

    // =========================
    // FINANCIAL CALCULATIONS
    // =========================
    const moneyIn = transactions
        .filter((transaction) => transaction.type === "in")
        .reduce(
            (total, transaction) => total + transaction.amount,
            0
        );

    const moneyOut = transactions
        .filter((transaction) => transaction.type === "out")
        .reduce(
            (total, transaction) => total + transaction.amount,
            0
        );

    const startingBalance =
        Number(localStorage.getItem("startingBalance")) || 0;

    const balance =
        startingBalance + moneyIn - moneyOut;

    // =========================
    // BUSINESS SETTINGS
    // =========================
    const businessName =
        localStorage.getItem("businessName") ||
        "My Business";

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

    // =========================
    // CASH FLOW SAMPLE DATA
    // =========================
   // =========================
// 30 DAY CASH FLOW
// =========================
const cashFlowData = Array.from({ length: 30 }).map((_, index) => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (29 - index));

    const dateString = date.toLocaleDateString();

    const dayTransactions = transactions.filter(
        (transaction) => transaction.date === dateString
    );

    const moneyInForDay = dayTransactions
        .filter((transaction) => transaction.type === "in")
        .reduce(
            (total, transaction) => total + transaction.amount,
            0
        );

    const moneyOutForDay = dayTransactions
        .filter((transaction) => transaction.type === "out")
        .reduce(
            (total, transaction) => total + transaction.amount,
            0
        );

    return {
        date: dateString,
        moneyIn: moneyInForDay,
        moneyOut: moneyOutForDay,
    };
});

const maxCashFlow = Math.max(
    ...cashFlowData.map((day) =>
        Math.max(day.moneyIn, day.moneyOut)
    ),
    1
);

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex">

            {/* =========================
                SIDEBAR
            ========================= */}
            {/* =========================
    SIDEBAR
========================= */}
<aside className="hidden md:flex w-64 bg-white border-r border-gray-200 min-h-screen flex-col">

    {/* Logo */}
    <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">
            Bookkeeping
        </h1>

        <p className="text-xs text-gray-500 mt-1">
            Simple financial management
        </p>
    </div>

    {/* Navigation */}
    <nav className="p-4 flex-1">

        <p className="text-xs font-semibold text-gray-400 uppercase px-3 mb-3">
            Menu
        </p>

        <a
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold mb-2"
        >
            <span>📊</span>
            Dashboard
        </a>

        <a
            href="/transactions"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
        >
            <span>💳</span>
            Transactions
        </a>

        <a
            href="/categories"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
        >
            <span>📁</span>
            Categories
        </a>

        <a
            href="/reports"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
        >
            <span>📈</span>
            Reports
        </a>

        <a
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
        >
            <span>⚙️</span>
            Settings
        </a>

    </nav>

    {/* Logout */}
    <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50">
            <span>🚪</span>
            Logout
        </button>
    </div>

</aside>
            {/* =========================
                MAIN AREA
            ========================= */}
            <div className="flex-1">

                {/* =========================
                    TOP HEADER
                ========================= */}
                <header className="bg-white border-b border-gray-200">

                    <div className="px-6 py-5 flex justify-between items-center">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Good day 👋
                            </h2>

                            <p className="text-sm text-gray-500">
                                Here's your financial overview.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">

                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-semibold text-gray-800">
                                    {businessName}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Business Account
                                </p>
                            </div>

                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                B
                            </div>

                        </div>
                    </div>
                </header>

                {/* =========================
                    CONTENT
                ========================= */}
                <main className="max-w-7xl mx-auto px-6 py-10">

                    {/* PAGE TITLE */}
                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Keep track of your money in and money out.
                        </p>

                    </div>

                    {/* =========================
                        SUMMARY CARDS
                    ========================= */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* BALANCE */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">

                            <div className="flex justify-between items-start">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Current Balance
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-900 mt-3">
                                        {currencySymbol}
                                        {balance.toLocaleString()}
                                    </h3>
                                </div>

                                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    {currencySymbol}
                                </div>

                            </div>
                        </div>

                        {/* MONEY IN */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">

                            <div className="flex justify-between items-start">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Money In
                                    </p>

                                    <h3 className="text-3xl font-bold text-green-600 mt-3">
                                        {currencySymbol}
                                        {moneyIn.toLocaleString()}
                                    </h3>
                                </div>

                                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl">
                                    ↑
                                </div>

                            </div>
                        </div>

                        {/* MONEY OUT */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">

                            <div className="flex justify-between items-start">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Money Out
                                    </p>

                                    <h3 className="text-3xl font-bold text-red-500 mt-3">
                                        {currencySymbol}
                                        {moneyOut.toLocaleString()}
                                    </h3>
                                </div>

                                <div className="w-11 h-11 rounded-xl bg-red-100 text-red-500 flex items-center justify-center text-xl">
                                    ↓
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* =========================
    30 DAY CASH FLOW
========================= */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-8">

    <div className="p-6 border-b border-gray-200">

        <h2 className="text-xl font-bold text-gray-900">
            30 Day Cash Flow
        </h2>

        <p className="text-sm text-gray-500 mt-1">
            Your money in and money out for the last 30 days.
        </p>

    </div>

    <div className="p-6">

        <div className="flex items-end gap-1 h-64">

            {cashFlowData.map((day, index) => (

                <div
                    key={index}
                    className="flex-1 flex items-end gap-1 h-full"
                    title={`${day.date} - In: ${currencySymbol}${day.moneyIn.toLocaleString()} | Out: ${currencySymbol}${day.moneyOut.toLocaleString()}`}
                >

                    {/* Money In */}
                    <div
                        className="bg-green-400 rounded-t-lg w-1/2"
                        style={{
                            height: `${(day.moneyIn / maxCashFlow) * 100}%`,
                        }}
                    />

                    {/* Money Out */}
                    <div
                        className="bg-red-400 rounded-t-lg w-1/2"
                        style={{
                            height: `${(day.moneyOut / maxCashFlow) * 100}%`,
                        }}
                    />

                </div>

            ))}

        </div>

        {/* LEGEND */}
        <div className="flex justify-center gap-6 mt-6 text-sm">

            <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                Money In
            </div>

            <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                Money Out
            </div>

        </div>

    </div>

</div>



                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-8">

                        <div className="p-6 border-b border-gray-200">

                            <h2 className="text-xl font-bold text-gray-900">
                                Add Transaction
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Record money coming in or going out.
                            </p>

                        </div>

                        <form
                            onSubmit={addTransaction}
                            className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                        >

                            {/* AMOUNT */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    placeholder="₦0.00"
                                    value={amount}
                                    onChange={(e) =>
                                        setAmount(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Transaction Type
                                </label>

                                <select
                                    value={type}
                                    onChange={(e) =>
                                        setType(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="in">
                                        Money In
                                    </option>

                                    <option value="out">
                                        Money Out
                                    </option>
                                </select>

                            </div>

                            {/* CATEGORY */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Sales</option>
                                    <option>Stock/Inventory</option>
                                    <option>Rent</option>
                                    <option>Transport</option>
                                    <option>Utilities</option>
                                    <option>Salaries</option>
                                    <option>Other</option>
                                </select>

                            </div>

                            {/* NOTE */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Note
                                </label>

                                <input
                                    type="text"
                                    placeholder="Optional note"
                                    value={note}
                                    onChange={(e) =>
                                        setNote(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* BUTTON */}
                            <div className="md:col-span-2">

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                                >
                                    + Save Transaction
                                </button>

                            </div>

                        </form>

                    </div>

                    {/* =========================
                        RECENT TRANSACTIONS
                    ========================= */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-8">

                        <div className="p-6 border-b border-gray-200">

                            <h2 className="text-xl font-bold text-gray-900">
                                Recent Transactions
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Your latest business transactions.
                            </p>

                        </div>

                        {transactions.length === 0 ? (

                            <div className="p-10 text-center">

                                <div className="text-4xl mb-3">
                                    📋
                                </div>

                                <p className="font-medium text-gray-700">
                                    No transactions yet
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    Add your first transaction above.
                                </p>

                            </div>

                        ) : (

                            transactions.map((transaction) => (

                                <div
                                    key={transaction.id}
                                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b last:border-b-0"
                                >

                                    <div>

                                        <p className="font-semibold text-gray-900">
                                            {transaction.category}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {transaction.note || "No note"}{" "}
                                            • {transaction.date}
                                        </p>

                                    </div>

                                    <div className="flex items-center gap-5">

                                        <p
                                            className={
                                                transaction.type === "in"
                                                    ? "font-bold text-green-600"
                                                    : "font-bold text-red-500"
                                            }
                                        >
                                            {transaction.type === "in"
                                                ? "+"
                                                : "-"}
                                            {currencySymbol}
                                            {transaction.amount.toLocaleString()}
                                        </p>

                                        <button
                                            onClick={() =>
                                                deleteTransaction(
                                                    transaction.id
                                                )
                                            }
                                            className="text-sm text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </main>
            </div>
        </div>
    );
}

export default Dashboard;