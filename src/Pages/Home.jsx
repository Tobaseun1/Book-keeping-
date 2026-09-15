import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import FAQ from "../Components/FAQ";
import CTA from "../Components/CTA";
import Footer from "../Components/Footer";

function Home() {
    const benefits = [
        { value: "One place", label: "for your income and expenses" },
        { value: "Clear view", label: "of what your business earns" },
        { value: "Less stress", label: "when it is time to review your books" },
    ];

    return (
        <>
            {/* NAVBAR + HERO */}
            <div className="relative">
                <Navbar />
                <Hero />
            </div>

            {/* BUSINESS FINANCE SECTION */}
            <section className="bg-gray-50 py-20 md:py-24">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:items-center">

                    {/* LEFT */}
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                            Built for simplicity
                        </p>

                        <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                            Your business finances, all in one place.
                        </h2>

                        <p className="mt-5 max-w-xl leading-7 text-gray-600">
                            From daily transactions to financial reports, keep everything
                            organized and easy to understand.
                        </p>

                        <div className="mt-8 space-y-5">

                            <div className="flex gap-4">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                    ✓
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Record transactions
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Quickly record money coming in and going out.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                    ✓
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Organize your finances
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Keep income and expenses organized by category.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                    ✓
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Understand your business
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Get a clear picture of how your business is doing.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* DASHBOARD PREVIEW */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:p-8">

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Current Balance
                                </p>

                                <h3 className="mt-1 text-3xl font-bold text-gray-900">
                                    ₦245,000
                                </h3>
                            </div>

                            <div className="rounded-lg bg-green-100 px-3 py-2 text-sm font-semibold text-green-600">
                                +12%
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">

                            <div className="rounded-xl bg-green-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Money In
                                </p>

                                <p className="mt-2 text-xl font-bold text-green-600">
                                    ₦180,000
                                </p>
                            </div>

                            <div className="rounded-xl bg-red-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Money Out
                                </p>

                                <p className="mt-2 text-xl font-bold text-red-600">
                                    ₦75,000
                                </p>
                            </div>

                        </div>

                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-700">
                                    30 Day Cash Flow
                                </p>

                                <p className="text-xs text-gray-400">
                                    Overview
                                </p>
                            </div>

                            <div className="mt-5 flex h-32 items-end gap-2">
                                <div className="h-10 w-full rounded-t bg-blue-200"></div>
                                <div className="h-16 w-full rounded-t bg-blue-300"></div>
                                <div className="h-12 w-full rounded-t bg-blue-400"></div>
                                <div className="h-24 w-full rounded-t bg-blue-500"></div>
                                <div className="h-20 w-full rounded-t bg-blue-400"></div>
                                <div className="h-28 w-full rounded-t bg-blue-600"></div>
                                <div className="h-20 w-full rounded-t bg-blue-500"></div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* BENEFITS */}
            <section className="bg-gray-900 py-16 text-white md:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-[1.15fr_1fr] md:items-center">

                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                            Built for everyday business
                        </p>

                        <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight md:text-4xl">
                            Spend less time guessing and more time growing.
                        </h2>

                        <p className="mt-5 max-w-xl leading-7 text-gray-300">
                            Bookkeeping gives you a simple daily record of your money,
                            so you can make decisions with confidence.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.value}
                                className="rounded-xl border border-gray-700 bg-gray-800 p-5"
                            >
                                <p className="text-xl font-bold text-white">
                                    {benefit.value}
                                </p>

                                <p className="mt-1 text-sm leading-6 text-gray-300">
                                    {benefit.label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* FAQ */}
            <FAQ />

            {/* CTA */}
            <CTA />

            {/* FOOTER */}
            <Footer />
        </>
    );
}

export default Home;