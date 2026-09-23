import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
    addTransaction as addTransactionDoc,
    deleteTransaction as deleteTransactionDoc,
    saveProfile,
    subscribeToProfile,
    subscribeToTransactions,
} from "../lib/firestore";

const CURRENCY_SYMBOLS = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
    EUR: "€",
};

const DEFAULT_CATEGORY_SUGGESTIONS = [
    "Sales",
    "Salary",
    "Utility",
    "Transport",
    "Energy",
];

function mergeCategoryOptions(categories) {
    const merged = [...categories];

    DEFAULT_CATEGORY_SUGGESTIONS.forEach((suggestion) => {
        const exists = merged.some(
            (category) =>
                category.toLowerCase() === suggestion.toLowerCase()
        );

        if (!exists) {
            merged.push(suggestion);
        }
    });

    return merged;
}

function getToday() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatNumber(value) {
    return Number(value || 0).toLocaleString();
}

function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();

    /* =========================
       BASIC BUSINESS INFORMATION
    ========================= */

    const [businessName, setBusinessName] = useState("My Business");
    const [currency, setCurrency] = useState("NGN");
    const [startingBalance, setStartingBalance] = useState(0);
    const [categories, setCategories] = useState([]);
    const categoryOptions = mergeCategoryOptions(categories);
    const [savingsTarget, setSavingsTargetState] = useState(null);

    const currencySymbol = CURRENCY_SYMBOLS[currency] || "₦";

    useEffect(() => {
        const unsubscribe = subscribeToProfile(user.uid, (profile) => {
            setBusinessName(profile.businessName);
            setCurrency(profile.currency);
            setStartingBalance(Number(profile.startingBalance) || 0);
            setCategories(profile.categories || []);
            setSavingsTargetState(profile.savingsTarget);
        });

        return unsubscribe;
    }, [user.uid]);

    /* =========================
       TRANSACTIONS
    ========================= */

    const [transactions, setTransactions] = useState([]);

    const [transactionAmount, setTransactionAmount] =
        useState("");

    const [transactionType, setTransactionType] =
        useState("in");

    const [transactionCategory, setTransactionCategory] =
        useState("");

    const [transactionDate, setTransactionDate] =
        useState(getToday());

    const [transactionNote, setTransactionNote] =
        useState("");

    const [transactionMessage, setTransactionMessage] =
        useState("");

    useEffect(() => {
        const unsubscribe = subscribeToTransactions(
            user.uid,
            setTransactions
        );

        return unsubscribe;
    }, [user.uid]);

    /* =========================
       SAVINGS TARGET
    ========================= */

    const [targetName, setTargetName] =
        useState("");

    const [targetAmount, setTargetAmount] =
        useState("");

    const [targetSaved, setTargetSaved] =
        useState("");

    const [targetDate, setTargetDate] =
        useState("");

    const [savingsAmount, setSavingsAmount] =
        useState("");

    const [savingsMessage, setSavingsMessage] =
        useState("");

    function setSavingsTarget(nextTarget) {
        setSavingsTargetState(nextTarget);
        saveProfile(user.uid, { savingsTarget: nextTarget });
    }

    /* =========================
       FINANCIAL CALCULATIONS
    ========================= */

    const moneyIn = transactions
        .filter((transaction) => transaction.type === "in")
        .reduce(
            (total, transaction) =>
                total + Number(transaction.amount || 0),
            0
        );

    const moneyOut = transactions
        .filter((transaction) => transaction.type === "out")
        .reduce(
            (total, transaction) =>
                total + Number(transaction.amount || 0),
            0
        );

    const balance =
        startingBalance + moneyIn - moneyOut;

    /* =========================
       SAVINGS CALCULATIONS
    ========================= */

    const savingsHistory =
        savingsTarget?.history || [];

    const totalSaved =
        savingsHistory.reduce(
            (total, item) =>
                total + Number(item.amount || 0),
            0
        );

    const targetAmountNumber =
        Number(savingsTarget?.target || 0);

    const savingsPercentage =
        targetAmountNumber > 0
            ? Math.min(
                (totalSaved / targetAmountNumber) * 100,
                100
            )
            : 0;

    const savingsRemaining = Math.max(
        targetAmountNumber - totalSaved,
        0
    );

    const savingsCompleted =
        targetAmountNumber > 0 &&
        totalSaved >= targetAmountNumber;

    /* =========================
       ADD TRANSACTION
    ========================= */

    async function handleAddTransaction(event) {
        event.preventDefault();

        const amount = Number(transactionAmount);

        if (!amount || amount <= 0) {
            setTransactionMessage(
                "Please enter a valid amount."
            );
            return;
        }

        const trimmedCategory = transactionCategory.trim();

        if (!trimmedCategory) {
            setTransactionMessage(
                "Please enter a category."
            );
            return;
        }

        await addTransactionDoc(user.uid, {
            amount,
            type: transactionType,
            category: trimmedCategory,
            date: transactionDate,
            note: transactionNote.trim(),
        });

        const categoryExists = categories.some(
            (category) =>
                category.toLowerCase() ===
                trimmedCategory.toLowerCase()
        );

        if (!categoryExists) {
            const updatedCategories = [
                ...categories,
                trimmedCategory,
            ];

            saveProfile(user.uid, {
                categories: updatedCategories,
            });
        }

        setTransactionAmount("");
        setTransactionNote("");
        setTransactionDate(getToday());

        setTransactionMessage(
            "Transaction added successfully."
        );

        setTimeout(() => {
            setTransactionMessage("");
        }, 2500);
    }

    /* =========================
       DELETE TRANSACTION
    ========================= */

    function handleDeleteTransaction(id) {
        const confirmed = window.confirm(
            "Delete this transaction?"
        );

        if (!confirmed) return;

        deleteTransactionDoc(user.uid, id);
    }

    /* =========================
       CREATE SAVINGS TARGET
    ========================= */

    function handleCreateSavingsTarget(event) {
        event.preventDefault();

        if (!targetName.trim()) {
            setSavingsMessage(
                "Please enter a target name."
            );
            return;
        }

        if (
            !targetAmount ||
            Number(targetAmount) <= 0
        ) {
            setSavingsMessage(
                "Please enter a valid target amount."
            );
            return;
        }

        const newTarget = {
            name: targetName.trim(),
            target: Number(targetAmount),
            saved: Number(targetSaved) || 0,
            date: targetDate,
            history: [],
        };

        setSavingsTarget(newTarget);

        setTargetName("");
        setTargetAmount("");
        setTargetSaved("");
        setTargetDate("");

        setSavingsMessage(
            "Savings target created successfully."
        );

        setTimeout(() => {
            setSavingsMessage("");
        }, 2500);
    }

    /* =========================
       ADD TO SAVINGS
    ========================= */

    async function handleAddSavings(event) {
        event.preventDefault();

        const amount = Number(savingsAmount);

        if (!amount || amount <= 0) {
            setSavingsMessage(
                "Please enter a valid amount."
            );
            return;
        }

        if (!savingsTarget) {
            setSavingsMessage(
                "Create a savings target first."
            );
            return;
        }

        if (amount > balance) {
            setSavingsMessage(
                "You do not have enough balance for this saving."
            );
            return;
        }

        if (amount > savingsRemaining) {
            setSavingsMessage(
                "That amount is more than the remaining target."
            );
            return;
        }

        const transactionId = Date.now();

        await addTransactionDoc(user.uid, {
            amount,
            type: "out",
            category: "Savings",
            date: getToday(),
            note: `Savings for ${savingsTarget.name}`,
            savingsRecordId: transactionId,
        });

        const savingsRecord = {
            id: transactionId,
            transactionId,
            amount,
            date: getToday(),
        };

        setSavingsTarget({
            ...savingsTarget,
            history: [
                ...(savingsTarget.history || []),
                savingsRecord,
            ],
        });

        setSavingsAmount("");

        setSavingsMessage(
            "Savings added successfully."
        );

        setTimeout(() => {
            setSavingsMessage("");
        }, 2500);
    }

    /* =========================
       DELETE SAVINGS RECORD
    ========================= */

    function handleDeleteSavings(id) {
        const record = savingsHistory.find(
            (item) => item.id === id
        );

        if (!record) return;

        const confirmed = window.confirm(
            "Delete this savings record?"
        );

        if (!confirmed) return;

        setSavingsTarget({
            ...savingsTarget,
            history: savingsTarget.history.filter(
                (item) => item.id !== id
            ),
        });

        const linkedTransaction = transactions.find(
            (transaction) =>
                transaction.savingsRecordId ===
                record.transactionId
        );

        if (linkedTransaction) {
            deleteTransactionDoc(user.uid, linkedTransaction.id);
        }
    }

    /* =========================
       DELETE SAVINGS TARGET
    ========================= */

    function handleDeleteSavingsTarget() {
        const confirmed = window.confirm(
            "Delete this savings target?"
        );

        if (!confirmed) return;

        setSavingsTarget(null);
        setSavingsMessage("");
    }

    /* =========================
       30 DAY CASH FLOW
    ========================= */

    const cashFlow = [];

    for (let i = 29; i >= 0; i--) {
        const date = new Date();

        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - i);

        const year = date.getFullYear();
        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");
        const day = String(
            date.getDate()
        ).padStart(2, "0");

        const dateKey =
            `${year}-${month}-${day}`;

        const amount = transactions
            .filter(
                (transaction) =>
                    transaction.date === dateKey
            )
            .reduce(
                (total, transaction) => {
                    const value =
                        Number(transaction.amount) || 0;

                    return transaction.type === "in"
                        ? total + value
                        : total - value;
                },
                0
            );

        cashFlow.push({
            date: dateKey,
            label: date.toLocaleDateString(
                "en-NG",
                {
                    day: "numeric",
                    month: "short",
                }
            ),
            amount,
        });
    }

    const maximumCashFlow = Math.max(
        ...cashFlow.map((item) =>
            Math.abs(item.amount)
        ),
        1
    );

    /* =========================
       CSV EXPORT
    ========================= */

    function escapeCSV(value) {
        return `"${String(value ?? "").replace(
            /"/g,
            '""'
        )}"`;
    }

    function exportCSV() {
        if (transactions.length === 0) {
            alert("There are no transactions to export.");
            return;
        }

        const headers = [
            "Date",
            "Type",
            "Category",
            "Amount",
            "Note",
        ];

        const rows = transactions.map(
            (transaction) => [
                transaction.date,
                transaction.type,
                transaction.category,
                transaction.amount,
                transaction.note || "",
            ]
        );

        const csv = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row.map(escapeCSV).join(",")
            )
            .join("\n");

        const blob = new Blob(
            ["﻿" + csv],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            "bookkeeping-transactions.csv";

        link.click();

        URL.revokeObjectURL(url);
    }

    /* =========================
       SIGN OUT
    ========================= */

    function handleSignOut() {
        signOut(auth);
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="fixed left-0 top-0 h-screen w-64 bg-black shadow-md p-6">

                <h1 className="text-2xl font-bold text-blue-600 mb-8">
                    Bookkeeping
                </h1>

                <nav className="flex-1 space-y-2 px-4 py-6">

                    <Link
                        to="/dashboard"
                        className="block rounded-lg bg-blue-600 px-4 py-3 font-medium"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/transactions"
                        className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                    >
                        Transactions
                    </Link>

                    <a
                        href="#savings-target"
                        className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                    >
                        Savings Target
                    </a>

                    <Link
                        to="/categories"
                        className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                    >
                        Categories
                    </Link>

                    <Link
                        to="/reports"
                        className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                    >
                        Reports
                    </Link>

                    <Link
                        to="/invoices"
                        className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                    >
                        Invoices
                    </Link>

                    <Link
                        to="/settings"
                        className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                    >
                        Settings
                    </Link>

                </nav>

                <div className="border-t border-gray-800 p-4">
                    <button
                        onClick={handleSignOut}
                        className="w-full rounded-lg px-4 py-3 text-left text-red-400 transition hover:bg-gray-800"
                    >
                        Sign Out
                    </button>
                </div>

            </aside>

            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="lg:ml-64">

                {/* HEADER */}

                <header className="border-b border-gray-200 bg-white px-6 py-5 md:px-8">

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                Welcome back
                            </p>

                            <h1 className="text-2xl font-bold text-gray-900">
                                {businessName}
                            </h1>
                        </div>

                        <button
                            onClick={exportCSV}
                            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Export CSV
                        </button>

                    </div>

                </header>

                <div className="space-y-8 p-6 md:p-8">

                    {/* =========================
                        SUMMARY CARDS
                    ========================= */}

                    <section>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Starting Balance
                                </p>

                                <h2 className="mt-3 text-2xl font-bold text-gray-900">
                                    {currencySymbol}
                                    {formatNumber(startingBalance)}
                                </h2>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Money In
                                </p>

                                <h2 className="mt-3 text-2xl font-bold text-green-600">
                                    {currencySymbol}
                                    {formatNumber(moneyIn)}
                                </h2>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Money Out
                                </p>

                                <h2 className="mt-3 text-2xl font-bold text-red-600">
                                    {currencySymbol}
                                    {formatNumber(moneyOut)}
                                </h2>
                            </div>

                            <div className="rounded-2xl bg-blue-600 p-6 shadow-sm">
                                <p className="text-sm text-blue-100">
                                    Current Balance
                                </p>

                                <h2 className="mt-3 text-2xl font-bold text-white">
                                    {currencySymbol}
                                    {formatNumber(balance)}
                                </h2>
                            </div>

                        </div>

                    </section>

                    {/* =========================
                        SAVINGS TARGET
                    ========================= */}

                    <section
                        id="savings-target"
                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
                    >

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                                    Savings
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                    Savings Target
                                </h2>
                            </div>

                            {savingsTarget && (
                                <button
                                    onClick={handleDeleteSavingsTarget}
                                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                                >
                                    Delete Target
                                </button>
                            )}

                        </div>

                        {!savingsTarget ? (

                            <form
                                onSubmit={handleCreateSavingsTarget}
                                className="mt-6 grid gap-4 md:grid-cols-2"
                            >

                                <input
                                    type="text"
                                    value={targetName}
                                    onChange={(e) =>
                                        setTargetName(e.target.value)
                                    }
                                    placeholder="Target name"
                                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                />

                                <input
                                    type="number"
                                    value={targetAmount}
                                    onChange={(e) =>
                                        setTargetAmount(e.target.value)
                                    }
                                    placeholder="Target amount"
                                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                />

                                <input
                                    type="number"
                                    value={targetSaved}
                                    onChange={(e) =>
                                        setTargetSaved(e.target.value)
                                    }
                                    placeholder="Already saved"
                                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                />

                                <input
                                    type="date"
                                    value={targetDate}
                                    onChange={(e) =>
                                        setTargetDate(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                />

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 md:col-span-2"
                                >
                                    Create Savings Target
                                </button>

                            </form>

                        ) : (

                            <div className="mt-6">

                                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {savingsTarget.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Target:{" "}
                                            {currencySymbol}
                                            {formatNumber(targetAmountNumber)}
                                        </p>
                                    </div>

                                    <p className="text-lg font-bold text-blue-600">
                                        {Math.round(savingsPercentage)}%
                                    </p>

                                </div>

                                <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full rounded-full bg-blue-600 transition-all"
                                        style={{
                                            width: `${savingsPercentage}%`,
                                        }}
                                    />
                                </div>

                                <div className="mt-4 grid gap-4 sm:grid-cols-3">

                                    <div className="rounded-xl bg-blue-50 p-4">
                                        <p className="text-sm text-gray-500">
                                            Saved
                                        </p>

                                        <p className="mt-1 font-bold text-blue-600">
                                            {currencySymbol}
                                            {formatNumber(totalSaved)}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">
                                            Remaining
                                        </p>

                                        <p className="mt-1 font-bold text-gray-900">
                                            {currencySymbol}
                                            {formatNumber(savingsRemaining)}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-green-50 p-4">
                                        <p className="text-sm text-gray-500">
                                            Status
                                        </p>

                                        <p className="mt-1 font-bold text-green-600">
                                            {savingsCompleted
                                                ? "Completed"
                                                : "In Progress"}
                                        </p>
                                    </div>

                                </div>

                                {!savingsCompleted && (
                                    <form
                                        onSubmit={handleAddSavings}
                                        className="mt-6 flex flex-col gap-3 sm:flex-row"
                                    >

                                        <input
                                            type="number"
                                            value={savingsAmount}
                                            onChange={(e) =>
                                                setSavingsAmount(e.target.value)
                                            }
                                            placeholder="Amount to save"
                                            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                        />

                                        <button
                                            type="submit"
                                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                                        >
                                            Add Savings
                                        </button>

                                    </form>
                                )}

                                {savingsMessage && (
                                    <p className="mt-4 text-sm font-medium text-blue-600">
                                        {savingsMessage}
                                    </p>
                                )}

                                {savingsHistory.length > 0 && (
                                    <div className="mt-8">

                                        <h3 className="font-bold text-gray-900">
                                            Savings History
                                        </h3>

                                        <div className="mt-4 space-y-3">

                                            {savingsHistory.map(
                                                (item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                                                    >

                                                        <div>
                                                            <p className="font-semibold text-gray-900">
                                                                {currencySymbol}
                                                                {formatNumber(
                                                                    item.amount
                                                                )}
                                                            </p>

                                                            <p className="text-sm text-gray-500">
                                                                {item.date}
                                                            </p>
                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                handleDeleteSavings(
                                                                    item.id
                                                                )
                                                            }
                                                            className="text-sm font-semibold text-red-600 hover:text-red-700"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                )
                                            )}

                                        </div>

                                    </div>
                                )}

                            </div>

                        )}

                    </section>

                    {/* =========================
                        30 DAY CASH FLOW
                    ========================= */}

                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                                Overview
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                30 Day Cash Flow
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Your daily net cash flow for the last 30 days.
                            </p>
                        </div>

                        <div className="mt-8 flex h-64 items-end gap-1 overflow-hidden">

                            {cashFlow.map(
                                (item, index) => {
                                    const percentage =
                                        Math.abs(item.amount) /
                                        maximumCashFlow *
                                        100;

                                    const height =
                                        item.amount === 0
                                            ? 4
                                            : Math.max(
                                                percentage,
                                                8
                                            );

                                    const isPositive =
                                        item.amount >= 0;

                                    return (
                                        <div
                                            key={item.date}
                                            className="group flex h-full flex-1 flex-col justify-end"
                                            title={`${item.label}: ${currencySymbol}${formatNumber(
                                                item.amount
                                            )}`}
                                        >

                                            <div
                                                className={`w-full rounded-t transition ${isPositive
                                                    ? "bg-blue-500 hover:bg-blue-600"
                                                    : "bg-red-400 hover:bg-red-500"
                                                    }`}
                                                style={{
                                                    height: `${height}%`,
                                                }}
                                            />

                                            {(
                                                index === 0 ||
                                                index % 5 === 0 ||
                                                index === 29
                                            ) && (
                                                    <span className="mt-2 text-center text-[10px] text-gray-400">
                                                        {item.label}
                                                    </span>
                                                )}

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    </section>

                    {/* =========================
                        ADD TRANSACTION
                    ========================= */}

                    <section
                        id="add-transaction"
                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
                    >

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                                New Entry
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                Add Transaction
                            </h2>
                        </div>

                        {transactionMessage && (
                            <div className="mt-5 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
                                {transactionMessage}
                            </div>
                        )}

                        <form
                            onSubmit={handleAddTransaction}
                            className="mt-6 grid gap-5 md:grid-cols-2"
                        >

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={transactionAmount}
                                    onChange={(e) =>
                                        setTransactionAmount(e.target.value)
                                    }
                                    placeholder="Enter amount"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Type
                                </label>

                                <select
                                    value={transactionType}
                                    onChange={(e) =>
                                        setTransactionType(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
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
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Category
                                </label>

                                <select
                                    value={transactionCategory}
                                    onChange={(e) =>
                                        setTransactionCategory(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                >
                                    <option value="">
                                        Select a category
                                    </option>

                                    {categoryOptions.map(
                                        (category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    value={transactionDate}
                                    onChange={(e) =>
                                        setTransactionDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Note
                                </label>

                                <textarea
                                    value={transactionNote}
                                    onChange={(e) =>
                                        setTransactionNote(e.target.value)
                                    }
                                    placeholder="Optional note"
                                    rows="3"
                                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 md:col-span-2"
                            >
                                Add Transaction
                            </button>

                        </form>

                    </section>

                    {/* =========================
                        RECENT TRANSACTIONS
                    ========================= */}

                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                                    Activity
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                    Recent Transactions
                                </h2>
                            </div>

                            <Link
                                to="/transactions"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                View All
                            </Link>

                        </div>

                        {transactions.length === 0 ? (

                            <div className="mt-8 rounded-xl bg-gray-50 p-8 text-center">
                                <p className="font-medium text-gray-700">
                                    No transactions yet.
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Add your first transaction above.
                                </p>
                            </div>

                        ) : (

                            <div className="mt-6 overflow-x-auto">

                                <table className="w-full min-w-[700px]">

                                    <thead>
                                        <tr className="border-b border-gray-200 text-left text-sm text-gray-500">

                                            <th className="px-4 py-3">
                                                Date
                                            </th>

                                            <th className="px-4 py-3">
                                                Category
                                            </th>

                                            <th className="px-4 py-3">
                                                Note
                                            </th>

                                            <th className="px-4 py-3">
                                                Type
                                            </th>

                                            <th className="px-4 py-3 text-right">
                                                Amount
                                            </th>

                                            <th className="px-4 py-3">
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {transactions
                                            .slice(0, 10)
                                            .map(
                                                (
                                                    transaction
                                                ) => (
                                                    <tr
                                                        key={
                                                            transaction.id
                                                        }
                                                        className="border-b border-gray-100 last:border-0"
                                                    >

                                                        <td className="px-4 py-4 text-sm text-gray-600">
                                                            {
                                                                transaction.date
                                                            }
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                                                {
                                                                    transaction.category
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="max-w-[200px] truncate px-4 py-4 text-sm text-gray-600">
                                                            {
                                                                transaction.note ||
                                                                "-"
                                                            }
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <span
                                                                className={
                                                                    transaction.type ===
                                                                        "in"
                                                                        ? "font-semibold text-green-600"
                                                                        : "font-semibold text-red-600"
                                                                }
                                                            >
                                                                {transaction.type ===
                                                                    "in"
                                                                    ? "Money In"
                                                                    : "Money Out"}
                                                            </span>
                                                        </td>

                                                        <td
                                                            className={`px-4 py-4 text-right font-bold ${transaction.type ===
                                                                "in"
                                                                ? "text-green-600"
                                                                : "text-red-600"
                                                                }`}
                                                        >
                                                            {transaction.type ===
                                                                "in"
                                                                ? "+"
                                                                : "-"}
                                                            {
                                                                currencySymbol
                                                            }
                                                            {formatNumber(
                                                                transaction.amount
                                                            )}
                                                        </td>

                                                        <td className="px-4 py-4 text-right">
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteTransaction(
                                                                        transaction.id
                                                                    )
                                                                }
                                                                className="text-sm font-semibold text-red-600 hover:text-red-700"
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

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;
