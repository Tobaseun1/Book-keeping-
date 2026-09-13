import { useState } from "react";

function AddTransaction({ onAdd }) {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("in");
    const [category, setCategory] = useState("Sales");
    const [note, setNote] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!amount) return;

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
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Save Transaction
                    </button>

                </div>

            </form>
        </div>
    );
}

export default AddTransaction;