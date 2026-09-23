import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { saveProfile, subscribeToProfile } from "../lib/firestore";

function SavingsTarget() {
    const navigate = useNavigate();
    const { user } = useAuth();

    function handleSignOut() {
        signOut(auth);
        navigate("/login");
    }

    // =========================
    // SAVINGS TARGETS
    // =========================
    const [targets, setTargets] = useState([]);
    const [currency, setCurrency] = useState("NGN");

    const [targetName, setTargetName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [savedAmount, setSavedAmount] = useState("");
    const [targetDate, setTargetDate] = useState("");

    useEffect(() => {
        const unsubscribe = subscribeToProfile(user.uid, (profile) => {
            setTargets(profile.savingsTargets || []);
            setCurrency(profile.currency);
        });

        return unsubscribe;
    }, [user.uid]);

    function updateTargets(nextTargets) {
        setTargets(nextTargets);
        saveProfile(user.uid, { savingsTargets: nextTargets });
    }

    const currencySymbols = {
        NGN: "₦",
        USD: "$",
        GBP: "£",
        EUR: "€",
    };

    const currencySymbol =
        currencySymbols[currency] || "₦";

    // =========================
    // ADD TARGET
    // =========================
    function addTarget(e) {
        e.preventDefault();

        if (
            !targetName ||
            !targetAmount ||
            Number(targetAmount) <= 0
        ) {
            return;
        }

        const newTarget = {
            id: Date.now(),
            name: targetName,
            targetAmount: Number(targetAmount),
            savedAmount: Number(savedAmount) || 0,
            targetDate,
        };

        updateTargets([
            newTarget,
            ...targets,
        ]);

        setTargetName("");
        setTargetAmount("");
        setSavedAmount("");
        setTargetDate("");
    }

    // =========================
    // ADD SAVINGS
    // =========================
    function addSavings(id) {
        const amount = prompt(
            "Enter amount to add to this savings target:"
        );

        if (!amount || Number(amount) <= 0) {
            return;
        }

        const updatedTargets = targets.map((target) => {
            if (target.id === id) {
                return {
                    ...target,
                    savedAmount:
                        target.savedAmount + Number(amount),
                };
            }

            return target;
        });

        updateTargets(updatedTargets);
    }

    // =========================
    // DELETE TARGET
    // =========================
    function deleteTarget(id) {
        const updatedTargets = targets.filter(
            (target) => target.id !== id
        );

        updateTargets(updatedTargets);
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
                        href="/savings-target"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold mb-2"
                    >
                        <span>🎯</span>
                        Savings Target
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

                <div className="p-4 border-t border-gray-200">

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
                    >
                        <span>🚪</span>
                        Logout
                    </button>

                </div>

            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1">

                {/* HEADER */}
                <header className="bg-white border-b border-gray-200">

                    <div className="px-6 py-5">

                        <h2 className="text-xl font-bold text-gray-900">
                            Savings Target
                        </h2>

                        <p className="text-sm text-gray-500">
                            Set goals and track your savings progress.
                        </p>

                    </div>

                </header>

                <main className="max-w-7xl mx-auto px-6 py-10">

                    {/* PAGE TITLE */}
                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-900">
                            Savings Target
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Create a savings goal and work towards it.
                        </p>

                    </div>

                    {/* CREATE TARGET */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

                        <div className="p-6 border-b border-gray-200">

                            <h2 className="text-xl font-bold text-gray-900">
                                Create New Target
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Set an amount you want to save.
                            </p>

                        </div>

                        <form
                            onSubmit={addTarget}
                            className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                        >

                            {/* TARGET NAME */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Target Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. New Laptop"
                                    value={targetName}
                                    onChange={(e) =>
                                        setTargetName(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* TARGET AMOUNT */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Target Amount
                                </label>

                                <input
                                    type="number"
                                    placeholder={`${currencySymbol}500,000`}
                                    value={targetAmount}
                                    onChange={(e) =>
                                        setTargetAmount(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* CURRENT SAVINGS */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Savings
                                </label>

                                <input
                                    type="number"
                                    placeholder={`${currencySymbol}0`}
                                    value={savedAmount}
                                    onChange={(e) =>
                                        setSavedAmount(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* TARGET DATE */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Target Date
                                </label>

                                <input
                                    type="date"
                                    value={targetDate}
                                    onChange={(e) =>
                                        setTargetDate(e.target.value)
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
                                    + Create Savings Target
                                </button>

                            </div>

                        </form>

                    </div>

                    {/* SAVINGS TARGETS */}
                    <div className="mt-8">

                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            My Savings Targets
                        </h2>

                        {targets.length === 0 ? (

                            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">

                                <div className="text-4xl mb-3">
                                    🎯
                                </div>

                                <p className="font-medium text-gray-700">
                                    No savings targets yet
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    Create your first savings target above.
                                </p>

                            </div>

                        ) : (

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {targets.map((target) => {

                                    const percentage =
                                        Math.min(
                                            (target.savedAmount /
                                                target.targetAmount) *
                                            100,
                                            100
                                        );

                                    const remaining =
                                        Math.max(
                                            target.targetAmount -
                                            target.savedAmount,
                                            0
                                        );

                                    return (
                                        <div
                                            key={target.id}
                                            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
                                        >

                                            <div className="flex justify-between items-start">

                                                <div>

                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        🎯 {target.name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Target date:{" "}
                                                        {target.targetDate || "Not set"}
                                                    </p>

                                                </div>

                                                <button
                                                    onClick={() =>
                                                        deleteTarget(target.id)
                                                    }
                                                    className="text-sm text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                            <div className="mt-6">

                                                <div className="flex justify-between mb-2">

                                                    <p className="text-sm text-gray-500">
                                                        Progress
                                                    </p>

                                                    <p className="text-sm font-bold text-blue-600">
                                                        {percentage.toFixed(0)}%
                                                    </p>

                                                </div>

                                                <div className="w-full bg-gray-200 rounded-full h-4">

                                                    <div
                                                        className="bg-blue-600 h-4 rounded-full transition-all"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mt-6">

                                                <div className="bg-gray-50 rounded-xl p-4">

                                                    <p className="text-xs text-gray-500">
                                                        Saved
                                                    </p>

                                                    <p className="text-lg font-bold text-green-600 mt-1">
                                                        {currencySymbol}
                                                        {target.savedAmount.toLocaleString()}
                                                    </p>

                                                </div>

                                                <div className="bg-gray-50 rounded-xl p-4">

                                                    <p className="text-xs text-gray-500">
                                                        Target
                                                    </p>

                                                    <p className="text-lg font-bold text-gray-900 mt-1">
                                                        {currencySymbol}
                                                        {target.targetAmount.toLocaleString()}
                                                    </p>

                                                </div>

                                            </div>

                                            <div className="mt-4">

                                                <p className="text-sm text-gray-500">
                                                    Remaining
                                                </p>

                                                <p className="text-2xl font-bold text-gray-900">
                                                    {currencySymbol}
                                                    {remaining.toLocaleString()}
                                                </p>

                                            </div>

                                            <button
                                                onClick={() =>
                                                    addSavings(target.id)
                                                }
                                                className="w-full mt-6 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                                            >
                                                + Add Savings
                                            </button>

                                        </div>
                                    );
                                })}

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default SavingsTarget;