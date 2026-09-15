import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function HowItWorks() {
    const steps = [
        { number: "01", title: "Record a transaction", text: "Add the money your business receives or spends in just a few seconds.", icon: "↓" },
        { number: "02", title: "Keep it organized", text: "Choose a simple category and add a note, so every amount is easy to find later.", icon: "≡" },
        { number: "03", title: "See the full picture", text: "Your current balance, money in, and money out are calculated automatically.", icon: "↗" },
    ];

    return (
        <>
            <Navbar />
            <main>
        <section id="how-it-works" className="overflow-hidden bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Simple from day one</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Your finances, made easy in three steps.</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">No accounting experience needed. Keep your records up to date and know where your business stands.</p>
                </div>

                <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                    <div className="absolute left-[16%] right-[16%] top-12 hidden h-px bg-blue-100 md:block" />
                    {steps.map((step) => (
                        <article key={step.number} className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">{step.icon}</div>
                                <span className="text-sm font-bold tracking-wider text-blue-600">STEP {step.number}</span>
                            </div>
                            <h3 className="mt-7 text-xl font-bold text-gray-900">{step.title}</h3>
                            <p className="mt-3 leading-7 text-gray-600">{step.text}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/dashboard" className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                        Start tracking now <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                    <p className="mt-3 text-sm text-gray-500">Set up your first transaction in minutes.</p>
                </div>
            </div>
        </section>
            </main>
            <Footer />
        </>
    );
}

export default HowItWorks;
