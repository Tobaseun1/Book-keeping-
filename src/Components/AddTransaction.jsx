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

function AddTransaction({ onAdd }) {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("in");
    const [categories, setCategories] = useState(getCategories);
    const [category, setCategory] = useState(() => getCategories()[0] || "");
    const [note, setNote] = useState("");

    useEffect(() => {
        function loadCategories() {
            const updated = getCategories();
            setCategories(updated);

            setCategory((current) =>
                updated.includes(current) ? current : updated[0] || ""
            );
        }

        window.addEventListener("categoriesUpdated", loadCategories);

        return () => {
            window.removeEventListener("categoriesUpdated", loadCategories);
        };
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        if (!amount || !category) return;

        onAdd({
            id: Date.now(),
            amount: Number(amount),
            type,
            category,
            note,
            date: new Date().toLocaleDateString(),
        });

        setAmount("");
        setNote("");
    }

    return (
        <div className="bg-white p-6 rounded-2xl border shadow-sm mt-8">

            <h2 className="text-xl font-bold mb-6">
                Add Transaction
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >

                <div>
                    <label className="block text-sm font-medium mb-2">
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
                    <label className="block text-sm font-medium mb-2">
                        Type
                    </label>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3"
                    >
                        <option value="in">Money In</option>
                        <option value="out">Money Out</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={categories.length === 0}
                        className="w-full border rounded-lg px-4 py-3 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                        {categories.length === 0 ? (
                            <option value="">Add a category first</option>
                        ) : (
                            categories.map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))
                        )}
                    </select>

                    {categories.length === 0 && (
                        <p className="mt-2 text-xs text-gray-500">
                            Go to Categories and add one before recording a transaction.
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
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
                        disabled={categories.length === 0}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Save Transaction
                    </button>

                </div>

            </form>
        </div>
    );
}

export default AddTransaction;