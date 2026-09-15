import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import HowItWorks from "../Components/HowItWorks";
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
            <div className="relative">
                <Navbar />
                <Hero />
            </div>

            <Features />
            <HowItWorks />

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
                            Bookkeeping gives you a simple daily record of your money, so you
                            can make decisions with confidence.
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

            <CTA />
            <Footer />
        </>
    );
}

export default Home;