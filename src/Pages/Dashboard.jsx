import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    // =========================
    // LOGGED-IN USER
    // =========================

    const user = JSON.parse(
        localStorage.getItem("bookkeepingUser") || "null"
    );

    // =========================
    // TRANSACTIONS
    // =========================

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    const [amount, setAmount] = useState("");
    const [type, setType] = useState("in");
    const [category, setCategory] = useState("");
    const [note, setNote] = useState("");

    // =========================
    // SAVINGS TARGET
    // =========================

    const [savingsTarget, setSavingsTarget] = useState(() => {
        const saved = localStorage.getItem("savingsTarget");

        return saved
            ? JSON.parse(saved)
            : {
                name: "",
                target: 0,
                saved: 0,
                date: "",
                history: [],
            };
    });

    const [targetName, setTargetName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [savingsAmount, setSavingsAmount] = useState("");

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
    // SAVE TRANSACTIONS
    // =========================

    useEffect(() => {
        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );
    }, [transactions]);

    // =========================
    // SAVE SAVINGS TARGET
    // =========================

    useEffect(() => {
        localStorage.setItem(
            "savingsTarget",
            JSON.stringify(savingsTarget)
        );
    }, [savingsTarget]);

    // =========================
    // CALCULATIONS
    // =========================

    const moneyIn = transactions
        .filter((item) => item.type === "in")
        .reduce(
            (total, item) =>
                total + Number(item.amount),
            0
        );

    const moneyOut = transactions
        .filter((item) => item.type === "out")
        .reduce(
            (total, item) =>
                total + Number(item.amount),
            0
        );

    const startingBalance =
        Number(
            localStorage.getItem("startingBalance")
        ) || 0;

    const balance =
        startingBalance +
        moneyIn -
        moneyOut;

    // =========================
    // SAVINGS CALCULATIONS
    // =========================

    const savingsPercentage =
        savingsTarget.target > 0
            ? Math.min(
                (savingsTarget.saved /
                    savingsTarget.target) *
                100,
                100
            )
            : 0;

    const savingsRemaining = Math.max(
        savingsTarget.target -
        savingsTarget.saved,
        0
    );

    const savingsCompleted =
        savingsTarget.target > 0 &&
        savingsTarget.saved >=
        savingsTarget.target;

    // =========================
    // ADD TRANSACTION
    // =========================

    function addTransaction(e) {
        e.preventDefault();

        if (
            !amount ||
            !category ||
            Number(amount) <= 0
        ) {
            return;
        }

        const newTransaction = {
            id: Date.now(),
            amount: Number(amount),
            type,
            category,
            note,
            date: new Date()
                .toISOString()
                .split("T")[0],
        };

        setTransactions([
            newTransaction,
            ...transactions,
        ]);

        setAmount("");
        setCategory("");
        setNote("");
    }

    // =========================
    // DELETE TRANSACTION
    // =========================

    function deleteTransaction(id) {
        setTransactions(
            transactions.filter(
                (item) => item.id !== id
            )
        );
    }

    // =========================
    // CREATE SAVINGS TARGET
    // =========================

    function createSavingsTarget(e) {
        e.preventDefault();

        if (
            !targetName ||
            !targetAmount ||
            Number(targetAmount) <= 0
        ) {
            return;
        }

        const newTarget = {
            name: targetName,
            target: Number(targetAmount),
            saved: 0,
            date: targetDate,
            history: [],
        };

        setSavingsTarget(newTarget);

        setTargetName("");
        setTargetAmount("");
        setTargetDate("");
    }

    // =========================
    // DELETE SAVINGS TARGET
    // =========================

    function deleteSavingsTarget() {
        setSavingsTarget({
            name: "",
            target: 0,
            saved: 0,
            date: "",
            history: [],
        });
    }

    // =========================
    // ADD SAVINGS
    // =========================

    function addSavings(e) {
        e.preventDefault();

        if (
            !savingsAmount ||
            Number(savingsAmount) <= 0
        ) {
            return;
        }

        const amountToSave =
            Number(savingsAmount);

        if (savingsRemaining <= 0) {
            alert(
                "Your savings target has been reached!"
            );
            return;
        }

        if (amountToSave > balance) {
            alert(
                `You only have ${currencySymbol}${balance.toLocaleString()} available.`
            );
            return;
        }

        if (amountToSave > savingsRemaining) {
            alert(
                `You only need ${currencySymbol}${savingsRemaining.toLocaleString()} to reach your target.`
            );
            return;
        }

        const newSavings = {
            id: Date.now(),
            amount: amountToSave,
            date: new Date()
                .toISOString()
                .split("T")[0],
        };

        setSavingsTarget({
            ...savingsTarget,
            saved:
                savingsTarget.saved +
                amountToSave,
            history: [
                newSavings,
                ...(savingsTarget.history || []),
            ],
        });

        const savingsTransaction = {
            id: Date.now() + 1,
            amount: amountToSave,
            type: "out",
            category: "Savings",
            note: `Savings for ${savingsTarget.name}`,
            date: new Date()
                .toISOString()
                .split("T")[0],
        };

        setTransactions([
            savingsTransaction,
            ...transactions,
        ]);

        window.dispatchEvent(
            new Event("transactionsUpdated")
        );

        setSavingsAmount("");
    }

    // =========================
    // DELETE SAVINGS HISTORY
    // =========================

    function deleteSavingsHistory(id) {
        const savingsToRemove =
            (savingsTarget.history || []).find(
                (item) => item.id === id
            );

        if (!savingsToRemove) {
            return;
        }

        const confirmDelete = window.confirm(
            `Delete this savings entry of ${currencySymbol}${savingsToRemove.amount.toLocaleString()}?`
        );

        if (!confirmDelete) {
            return;
        }

        const updatedHistory =
            savingsTarget.history.filter(
                (item) => item.id !== id
            );

        setSavingsTarget({
            ...savingsTarget,
            saved: Math.max(
                savingsTarget.saved -
                savingsToRemove.amount,
                0
            ),
            history: updatedHistory,
        });

        const updatedTransactions =
            transactions.filter(
                (item) =>
                    !(
                        item.category === "Savings" &&
                        item.amount ===
                        savingsToRemove.amount &&
                        item.date ===
                        savingsToRemove.date
                    )
            );

        setTransactions(updatedTransactions);
    }

    // =========================
    // CASH FLOW
    // =========================

    const cashFlow = [
        { day: "Day 1", amount: 0 },
        { day: "Day 2", amount: 0 },
        { day: "Day 3", amount: 0 },
        { day: "Day 4", amount: 0 },
        { day: "Day 5", amount: 0 },
        { day: "Day 6", amount: 0 },
        { day: "Day 7", amount: 0 },
        { day: "Day 8", amount: 0 },
        { day: "Day 9", amount: 0 },
        { day: "Day 10", amount: 0 },
        { day: "Day 11", amount: 0 },
        { day: "Day 12", amount: 0 },
    ];

    // =========================
    // CSV EXPORT
    // =========================

    function exportCSV() {
        if (transactions.length === 0) {
            alert(
                "There are no transactions to export."
            );
            return;
        }

        const headers = [
            "Date",
            "Type",
            "Category",
            "Amount",
            "Note",
        ];

        const rows = transactions.map((item) => [
            item.date,
            item.type,
            item.category,
            item.amount,
            item.note,
        ]);

        const csvContent = [
            headers,
            ...rows,
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob(
            [csvContent],
            { type: "text/csv" }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            "transactions.csv";

        link.click();

        URL.revokeObjectURL(url);
    }

    // =========================
    // SIGN OUT
    // =========================

    function handleSignOut() {
        localStorage.removeItem(
            "bookkeepingUser"
        );

        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-md p-6">

                <h1 className="text-2xl font-bold text-blue-600 mb-8">
                    Bookkeeping
                </h1>

                <nav className="space-y-4">

                    <Link
                        to="/dashboard"
                        className="block font-semibold text-blue-600"
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        to="/transactions"
                        className="block text-gray-600 hover:text-blue-600"
                    >
                        💳 Transactions
                    </Link>

                    <Link
                        to="/dashboard"
                        className="block text-gray-600 hover:text-blue-600"
                    >
                        🎯 Savings Target
                    </Link>

                    <Link
                        to="/categories"
                        className="block text-gray-600 hover:text-blue-600"
                    >
                        📁 Categories
                    </Link>

                    <Link
                        to="/reports"
                        className="block text-gray-600 hover:text-blue-600"
                    >
                        📈 Reports
                    </Link>

                    <Link
                        to="/settings"
                        className="block text-gray-600 hover:text-blue-600"
                    >
                        ⚙️ Settings
                    </Link>

                    <button
                        onClick={handleSignOut}
                        className="block text-red-600 hover:text-red-700 font-semibold pt-4"
                    >
                        🚪 Sign Out
                    </button>

                </nav>

            </aside>

            {/* =========================
                MAIN
            ========================= */}

            <main className="ml-64 p-8">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Dashboard
                        </h2>

                        <p className="text-gray-500">
                            Welcome,{" "}
                            <span className="font-semibold text-gray-700">
                                {user?.name || businessName}
                            </span>
                        </p>
                    </div>

                    <button
                        onClick={exportCSV}
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Export CSV
                    </button>

                </div>

                {/* =========================
                    SUMMARY
                ========================= */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow p-6">
                        <p className="text-gray-500">
                            Current Balance
                        </p>

                        <h3 className="text-2xl font-bold mt-2">
                            {currencySymbol}
                            {balance.toLocaleString()}
                        </h3>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <p className="text-gray-500">
                            Money In
                        </p>

                        <h3 className="text-2xl font-bold text-green-600 mt-2">
                            {currencySymbol}
                            {moneyIn.toLocaleString()}
                        </h3>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <p className="text-gray-500">
                            Money Out
                        </p>

                        <h3 className="text-2xl font-bold text-red-600 mt-2">
                            {currencySymbol}
                            {moneyOut.toLocaleString()}
                        </h3>
                    </div>

                </div>

                {/* =========================
                    SAVINGS TARGET
                ========================= */}

                <div className="bg-white rounded-xl shadow p-6 mb-8">

                    <div className="flex justify-between items-center mb-6">

                        <div>
                            <h2 className="text-2xl font-bold">
                                🎯 Savings Target
                            </h2>

                            <p className="text-gray-500">
                                Set and track your savings goal.
                            </p>
                        </div>

                        {savingsTarget.name && (
                            <button
                                onClick={deleteSavingsTarget}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete Target
                            </button>
                        )}

                    </div>

                    {!savingsTarget.name ? (

                        <form
                            onSubmit={createSavingsTarget}
                            className="space-y-4"
                        >

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <input
                                    type="text"
                                    placeholder="Target Name"
                                    value={targetName}
                                    onChange={(e) =>
                                        setTargetName(
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg p-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Target Amount"
                                    value={targetAmount}
                                    onChange={(e) =>
                                        setTargetAmount(
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg p-3"
                                />

                                <input
                                    type="date"
                                    value={targetDate}
                                    onChange={(e) =>
                                        setTargetDate(
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg p-3"
                                />

                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                            >
                                Create Savings Target
                            </button>

                        </form>

                    ) : (

                        <>

                            {/* TARGET DETAILS */}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Target Name
                                    </p>

                                    <p className="font-bold text-lg">
                                        {savingsTarget.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Target Amount
                                    </p>

                                    <p className="font-bold text-lg">
                                        {currencySymbol}
                                        {savingsTarget.target.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Target Date
                                    </p>

                                    <p className="font-bold text-lg">
                                        {savingsTarget.date ||
                                            "No date set"}
                                    </p>
                                </div>

                            </div>

                            {/* PROGRESS */}

                            <div className="mb-6">

                                <div className="flex justify-between mb-2">

                                    <p className="font-semibold">
                                        Savings Progress
                                    </p>

                                    <p
                                        className={
                                            savingsCompleted
                                                ? "font-bold text-green-600"
                                                : "font-bold text-blue-600"
                                        }
                                    >
                                        {savingsCompleted
                                            ? "Target Reached 🎉"
                                            : `${savingsPercentage.toFixed(
                                                0
                                            )}%`}
                                    </p>

                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-4">

                                    <div
                                        className={
                                            savingsCompleted
                                                ? "bg-green-500 h-4 rounded-full transition-all"
                                                : "bg-blue-600 h-4 rounded-full transition-all"
                                        }
                                        style={{
                                            width: `${savingsPercentage}%`,
                                        }}
                                    />

                                </div>

                            </div>

                            {/* SAVINGS SUMMARY */}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                                <div className="border rounded-xl p-4">
                                    <p className="text-gray-500">
                                        Saved
                                    </p>

                                    <p className="text-xl font-bold text-green-600">
                                        {currencySymbol}
                                        {savingsTarget.saved.toLocaleString()}
                                    </p>
                                </div>

                                <div className="border rounded-xl p-4">
                                    <p className="text-gray-500">
                                        Target
                                    </p>

                                    <p className="text-xl font-bold">
                                        {currencySymbol}
                                        {savingsTarget.target.toLocaleString()}
                                    </p>
                                </div>

                                <div className="border rounded-xl p-4">
                                    <p className="text-gray-500">
                                        Remaining
                                    </p>

                                    <p className="text-xl font-bold text-blue-600">
                                        {currencySymbol}
                                        {savingsRemaining.toLocaleString()}
                                    </p>
                                </div>

                            </div>

                            {/* ADD SAVINGS */}

                            {!savingsCompleted && (

                                <form
                                    onSubmit={addSavings}
                                    className="mt-6 flex flex-col md:flex-row gap-3"
                                >

                                    <input
                                        type="number"
                                        placeholder="Enter amount to save"
                                        value={savingsAmount}
                                        onChange={(e) =>
                                            setSavingsAmount(
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-lg p-3 flex-1"
                                    />

                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                                    >
                                        Add Savings
                                    </button>

                                </form>

                            )}

                            {/* COMPLETED */}

                            {savingsCompleted && (

                                <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">

                                    <p className="text-green-700 font-semibold">
                                        🎉 Congratulations! You have reached your savings target.
                                    </p>

                                    <p className="text-sm text-green-600 mt-1">
                                        Your target of{" "}
                                        {currencySymbol}
                                        {savingsTarget.target.toLocaleString()}{" "}
                                        has been completed.
                                    </p>

                                </div>

                            )}

                            {/* SAVINGS HISTORY */}

                            {savingsTarget.history &&
                                savingsTarget.history.length > 0 && (

                                    <div className="mt-8">

                                        <h3 className="text-lg font-bold mb-4">
                                            Savings History
                                        </h3>

                                        <div className="overflow-x-auto">

                                            <table className="w-full text-left">

                                                <thead>
                                                    <tr className="border-b">

                                                        <th className="py-3">
                                                            Date
                                                        </th>

                                                        <th className="py-3">
                                                            Amount
                                                        </th>

                                                        <th className="py-3">
                                                            Action
                                                        </th>

                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {savingsTarget.history.map(
                                                        (item) => (

                                                            <tr
                                                                key={
                                                                    item.id
                                                                }
                                                                className="border-b"
                                                            >

                                                                <td className="py-3">
                                                                    {
                                                                        item.date
                                                                    }
                                                                </td>

                                                                <td className="py-3 font-semibold text-green-600">
                                                                    {
                                                                        currencySymbol
                                                                    }
                                                                    {item.amount.toLocaleString()}
                                                                </td>

                                                                <td className="py-3">

                                                                    <button
                                                                        onClick={() =>
                                                                            deleteSavingsHistory(
                                                                                item.id
                                                                            )
                                                                        }
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        Delete
                                                                    </button>

                                                                </td>

                                                            </tr>

                                                        )
                                                    )}

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                )}

                        </>

                    )}

                </div>

                {/* =========================
                    CASH FLOW
                ========================= */}

                <div className="bg-white rounded-xl shadow p-6 mb-8">

                    <h2 className="text-xl font-bold mb-6">
                        30 Day Cash Flow
                    </h2>

                    <div className="flex items-end gap-3 h-64">

                        {cashFlow.map((item, index) => (

                            <div
                                key={index}
                                className="flex-1 flex flex-col items-center justify-end h-full"
                            >

                                <div
                                    className="bg-blue-600 w-full rounded-t-lg"
                                    style={{
                                        height: `${Math.max(
                                            item.amount,
                                            5
                                        )}%`,
                                    }}
                                />

                                <span className="text-xs text-gray-500 mt-2">
                                    {item.day}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

                {/* =========================
                    ORIGINAL ADD TRANSACTION
                ========================= */}

                <div className="bg-white rounded-xl shadow p-6 mb-8">

                    <h2 className="text-xl font-bold mb-6">
                        Add Transaction
                    </h2>

                    <form
                        onSubmit={addTransaction}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Amount
                            </label>

                            <input
                                type="number"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter amount"
                                className="w-full border rounded-lg p-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Transaction Type
                            </label>

                            <select
                                value={type}
                                onChange={(e) =>
                                    setType(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg p-3"
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
                            <label className="block text-sm font-medium mb-2">
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg p-3"
                            >

                                <option value="">
                                    Select Category
                                </option>

                                <option value="Sales">
                                    Sales
                                </option>

                                <option value="Stock/Inventory">
                                    Stock/Inventory
                                </option>

                                <option value="Rent">
                                    Rent
                                </option>

                                <option value="Transport">
                                    Transport
                                </option>

                                <option value="Utilities">
                                    Utilities
                                </option>

                                <option value="Salaries">
                                    Salaries
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Note
                            </label>

                            <input
                                type="text"
                                value={note}
                                onChange={(e) =>
                                    setNote(
                                        e.target.value
                                    )
                                }
                                placeholder="Optional note"
                                className="w-full border rounded-lg p-3"
                            />
                        </div>

                        <button
                            type="submit"
                            className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            + Save Transaction
                        </button>

                    </form>

                </div>

                {/* =========================
                    RECENT TRANSACTIONS
                ========================= */}

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-xl font-bold">
                            Recent Transactions
                        </h2>

                        <Link
                            to="/transactions"
                            className="text-blue-600 hover:underline"
                        >
                            View All
                        </Link>

                    </div>

                    {transactions.length === 0 ? (

                        <p className="text-gray-500">
                            No transactions yet.
                        </p>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full text-left">

                                <thead>

                                    <tr className="border-b">

                                        <th className="py-3">
                                            Date
                                        </th>

                                        <th className="py-3">
                                            Category
                                        </th>

                                        <th className="py-3">
                                            Note
                                        </th>

                                        <th className="py-3">
                                            Type
                                        </th>

                                        <th className="py-3">
                                            Amount
                                        </th>

                                        <th className="py-3">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {transactions
                                        .slice(0, 10)
                                        .map(
                                            (item) => (

                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                    className="border-b"
                                                >

                                                    <td className="py-3">
                                                        {
                                                            item.date
                                                        }
                                                    </td>

                                                    <td className="py-3">
                                                        {
                                                            item.category
                                                        }
                                                    </td>

                                                    <td className="py-3">
                                                        {
                                                            item.note ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td
                                                        className={
                                                            item.type ===
                                                                "in"
                                                                ? "py-3 text-green-600"
                                                                : "py-3 text-red-600"
                                                        }
                                                    >
                                                        {item.type ===
                                                            "in"
                                                            ? "Money In"
                                                            : "Money Out"}
                                                    </td>

                                                    <td
                                                        className={`py-3 font-semibold ${item.type ===
                                                                "in"
                                                                ? "text-green-600"
                                                                : "text-red-600"
                                                            }`}
                                                    >
                                                        {item.type ===
                                                            "in"
                                                            ? "+"
                                                            : "-"}
                                                        {
                                                            currencySymbol
                                                        }
                                                        {Number(
                                                            item.amount
                                                        ).toLocaleString()}
                                                    </td>

                                                    <td className="py-3">

                                                        <button
                                                            onClick={() =>
                                                                deleteTransaction(
                                                                    item.id
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default Dashboard;