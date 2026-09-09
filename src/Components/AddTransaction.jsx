function AddTransaction() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900">
                Add Transaction
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount
                    </label>

                    <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Type
                    </label>

                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select type</option>
                        <option value="income">Money In</option>
                        <option value="expense">Money Out</option>
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>

                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select category</option>
                        <option value="sales">Sales</option>
                        <option value="salary">Salary</option>
                        <option value="rent">Rent</option>
                        <option value="transport">Transport</option>
                        <option value="utilities">Utilities</option>
                        <option value="other">Other</option>
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                    </label>

                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note
                    </label>

                    <textarea
                        placeholder="Add a note (optional)"
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

            </div>

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Save Transaction
            </button>
        </div>
    );
}

export default AddTransaction;