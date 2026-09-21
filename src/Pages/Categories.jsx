import { useState, useEffect } from "react";

const DEFAULT_CATEGORIES = [];

function getCategories() {
    try {
        const saved = localStorage.getItem("categories");
        return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
        return DEFAULT_CATEGORIES;
    }
}

function Categories() {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState(getCategories);
    const [newCategory, setNewCategory] = useState("");

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

    useEffect(() => {
        function loadCategories() {
            setCategories(getCategories());
        }

        window.addEventListener("categoriesUpdated", loadCategories);

        return () => {
            window.removeEventListener("categoriesUpdated", loadCategories);
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

    function handleAddCategory(event) {
        event.preventDefault();

        const trimmed = newCategory.trim();

        if (!trimmed) return;

        const alreadyExists = categories.some(
            (category) => category.toLowerCase() === trimmed.toLowerCase()
        );

        if (alreadyExists) {
            setNewCategory("");
            return;
        }

        const updated = [...categories, trimmed];

        localStorage.setItem("categories", JSON.stringify(updated));
        setCategories(updated);
        setNewCategory("");

        window.dispatchEvent(new Event("categoriesUpdated"));
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

    function getMoneyIn(category) {
        return transactions
            .filter(
                (transaction) =>
                    transaction.category === category &&
                    transaction.type === "in"
            )
            .reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );
    }

    function getMoneyOut(category) {
        return transactions
            .filter(
                (transaction) =>
                    transaction.category === category &&
                    transaction.type === "out"
            )
            .reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );
    }

    function getTransactionCount(category) {
        return transactions.filter(
            (transaction) =>
                transaction.category === category
        ).length;
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
                                Categories
                            </h2>

                            <p className="text-sm text-gray-500">
                                See where your money is going.
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
                            Financial Categories
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Track your income and expenses by category.
                        </p>

                    </div>

                    {/* ADD CATEGORY */}
                    <form
                        onSubmit={handleAddCategory}
                        className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                    >
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(event) =>
                                setNewCategory(event.target.value)
                            }
                            placeholder="Add a new category (e.g. Marketing)"
                            className="w-full sm:max-w-xs rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Add Category
                        </button>
                    </form>

                    {categories.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center mt-8">

                            <div className="text-5xl mb-4">
                                📁
                            </div>

                            <h2 className="text-xl font-bold text-gray-900">
                                No categories yet
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Add your first category above to start
                                tracking activity.
                            </p>

                        </div>
                    ) : (
                        <>
                            {/* CATEGORY CARDS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {categories.map((category) => {

                                    const moneyIn =
                                        getMoneyIn(category);

                                    const moneyOut =
                                        getMoneyOut(category);

                                    const transactionCount =
                                        getTransactionCount(category);

                                    const totalActivity =
                                        moneyIn + moneyOut;

                                    return (
                                        <div
                                            key={category}
                                            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
                                        >

                                            <div className="flex items-center justify-between">

                                                <h2 className="text-lg font-bold text-gray-900">
                                                    {category}
                                                </h2>

                                                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                                    {transactionCount} transaction
                                                    {transactionCount !== 1
                                                        ? "s"
                                                        : ""}
                                                </span>

                                            </div>

                                            <div className="mt-6">

                                                <p className="text-sm text-gray-500">
                                                    Total Activity
                                                </p>

                                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                                    {currencySymbol}
                                                    {totalActivity.toLocaleString()}
                                                </p>

                                            </div>

                                            <div className="mt-5 flex justify-between">

                                                <span className="text-sm text-gray-500">
                                                    Money In
                                                </span>

                                                <span className="font-semibold text-green-600">
                                                    {currencySymbol}
                                                    {moneyIn.toLocaleString()}
                                                </span>

                                            </div>

                                            <div className="mt-3 flex justify-between">

                                                <span className="text-sm text-gray-500">
                                                    Money Out
                                                </span>

                                                <span className="font-semibold text-red-500">
                                                    {currencySymbol}
                                                    {moneyOut.toLocaleString()}
                                                </span>

                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                            {transactions.length === 0 && (
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center mt-8">

                                    <div className="text-5xl mb-4">
                                        📁
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900">
                                        No category activity yet
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Add a transaction to see your category
                                        breakdown.
                                    </p>

                                    <a
                                        href="/dashboard"
                                        className="inline-block mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700"
                                    >
                                        Add Transaction
                                    </a>

                                </div>
                            )}
                        </>
                    )}

                </main>

            </div>

        </div>
    );
}

export default Categories;