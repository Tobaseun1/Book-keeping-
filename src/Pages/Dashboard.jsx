import { useState, useEffect } from "react";

function Dashboard() {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    const [amount, setAmount] = useState("");
    const [type, setType] = useState("in");
    const [category, setCategory] = useState("Sales");
    const [note, setNote] = useState("");

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

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

        setTransactions([newTransaction, ...transactions]);

        setAmount("");
        setNote("");
    }

    const moneyIn = transactions
        .filter((transaction) => transaction.type === "in")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const moneyOut = transactions
        .filter((transaction) => transaction.type === "out")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = moneyIn - moneyOut;

    return (
        <div className="min-h-screen bg-gray-50">

            <main className="max-w-7xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Here's an overview of your business finances.
                </p>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white p-6 rounded-2xl border">
                        <p className="text-gray-500">
                            Current Balance
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                            ₦{balance.toLocaleString()}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border">
                        <p className="text-gray-500">
                            Money In
                        </p>

                        <h2 className="text-3xl font-bold text-green-600 mt-3">
                            ₦{moneyIn.toLocaleString()}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border">
                        <p className="text-gray-500">
                            Money Out
                        </p>

                        <h2 className="text-3xl font-bold text-red-500 mt-3">
                            ₦{moneyOut.toLocaleString()}
                        </h2>
                    </div>

                </div>


                <div className="bg-white p-6 rounded-2xl border mt-8">

                    <h2 className="text-xl font-bold mb-6">
                        Add Transaction
                    </h2>

                    <form
                        onSubmit={addTransaction}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >

                        <div>
                            <label className="block mb-2">
                                Amount
                            </label>

                            <input
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">
                                Type
                            </label>

                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="in">
                                    Money In
                                </option>

                                <option value="out">
                                    Money Out
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border rounded-lg px-4 py-3"
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

                        <div>
                            <label className="block mb-2">
                                Note
                            </label>

                            <input
                                type="text"
                                placeholder="Optional note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        <div className="md:col-span-2">

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                            >
                                Save Transaction
                            </button>

                        </div>

                    </form>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl border mt-8">

                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold">
                            Recent Transactions
                        </h2>
                    </div>

                    {transactions.length === 0 ? (
                        <p className="p-6 text-gray-500">
                            No transactions yet.
                        </p>
                    ) : (
                        transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex justify-between items-center p-6 border-b"
                            >

                                <div>
                                    <p className="font-semibold">
                                        {transaction.category}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {transaction.note || "No note"} ·{" "}
                                        {transaction.date}
                                    </p>
                                </div>

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

                            </div>
                        ))
                    )}

                </div>

            </main>

        </div>
    );
}

export default Dashboard;