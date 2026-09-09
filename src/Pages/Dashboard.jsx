function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Dashboard Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Welcome back. Here's an overview of your business finances.
                    </p>
                </div>
            </div>

            {/* Dashboard Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Current Balance */}
                    <div className="bg-white rounded-2xl p-6 border shadow-sm">
                        <p className="text-sm text-gray-500">
                            Current Balance
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-3">
                            ₦0
                        </h2>

                        <p className="text-sm text-gray-400 mt-2">
                            Your available balance
                        </p>
                    </div>

                    {/* Money In */}
                    <div className="bg-white rounded-2xl p-6 border shadow-sm">
                        <p className="text-sm text-gray-500">
                            Money In
                        </p>

                        <h2 className="text-3xl font-bold text-green-600 mt-3">
                            ₦0
                        </h2>

                        <p className="text-sm text-gray-400 mt-2">
                            Total income
                        </p>
                    </div>

                    {/* Money Out */}
                    <div className="bg-white rounded-2xl p-6 border shadow-sm">
                        <p className="text-sm text-gray-500">
                            Money Out
                        </p>

                        <h2 className="text-3xl font-bold text-red-500 mt-3">
                            ₦0
                        </h2>

                        <p className="text-sm text-gray-400 mt-2">
                            Total expenses
                        </p>
                    </div>

                </div>

                {/* This Week / This Month */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                    <div className="bg-white rounded-2xl p-6 border shadow-sm">
                        <p className="text-sm text-gray-500">
                            This Week
                        </p>

                        <div className="flex justify-between mt-5">
                            <div>
                                <p className="text-xs text-gray-400">
                                    IN
                                </p>

                                <p className="text-xl font-bold text-green-600 mt-1">
                                    ₦0
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">
                                    OUT
                                </p>

                                <p className="text-xl font-bold text-red-500 mt-1">
                                    ₦0
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">
                                    NET
                                </p>

                                <p className="text-xl font-bold text-gray-900 mt-1">
                                    ₦0
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border shadow-sm">
                        <p className="text-sm text-gray-500">
                            This Month
                        </p>

                        <div className="flex justify-between mt-5">
                            <div>
                                <p className="text-xs text-gray-400">
                                    IN
                                </p>

                                <p className="text-xl font-bold text-green-600 mt-1">
                                    ₦0
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">
                                    OUT
                                </p>

                                <p className="text-xl font-bold text-red-500 mt-1">
                                    ₦0
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">
                                    NET
                                </p>

                                <p className="text-xl font-bold text-gray-900 mt-1">
                                    ₦0
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 30 Day Chart - placeholder for now */}
                <div className="bg-white rounded-2xl p-6 border shadow-sm mt-6">

                    <h2 className="text-xl font-bold text-gray-900">
                        Last 30 Days
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Money in vs money out
                    </p>

                    <div className="h-64 flex items-center justify-center mt-4 border-t">
                        <p className="text-gray-400">
                            Your transaction chart will appear here.
                        </p>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default Dashboard;