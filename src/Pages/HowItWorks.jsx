import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function HowItWorks() {
    const isLoggedIn = localStorage.getItem("bookkeepingUser");

    const steps = [
        { number: "01", title: "Record a transaction", text: "Add the money your business receives or spends in just a few seconds. Every purchase, sale, invoice, or payment becomes part of your financial history without complicated forms.", icon: "↓" },
        { number: "02", title: "Keep it organized", text: "Choose a simple category and add a note so every amount is easy to find later. This creates a useful trail that makes reviews, planning, and tax prep far less stressful.", icon: "≡" },
        { number: "03", title: "See the full picture", text: "Your current balance, money in, and money out are calculated automatically. You get a live view of your business performance without manual math or spreadsheet work.", icon: "↗" },
        { number: "04", title: "Make better decisions", text: "Review your dashboard and reports to spot patterns, control spending, and decide where your business should go next with more confidence.", icon: "◎" },
    ];

    const checklist = [
        ["Add your starting balance", "Begin with the amount currently in your business account or cash box so your records start from a clear baseline."],
        ["Record money in and out", "Log sales, payments, purchases, bills, transport costs, subscriptions, and other everyday activity as it happens."],
        ["Name each transaction clearly", "Add a short note like “Client invoice” or “Office supplies” so you can remember what each number was for later."],
        ["Review your dashboard", "Check your balance and recent activity whenever you need a quick update on business performance."],
        ["Look at trends over time", "Use your history to see what is growing, what is draining cash, and where you may need to tighten spending."],
    ];

    const benefits = [
        ["Money in", "Track customer payments, sales, and incoming cash so you can see how your revenue is moving."],
        ["Money out", "Track expenses clearly so you know what is costing the most and where to save more efficiently."],
        ["Current balance", "See your full financial position at a glance, including your starting point, recent activity, and overall trend."],
    ];

    const answers = [
        ["How often should I add transactions?", "For the clearest records, add each transaction on the same day it happens. Even a few minutes at the end of the day is enough to keep your books accurate and useful."],
        ["What information do I need?", "Enter the amount, choose whether it is income or an expense, select a category, and add an optional note to make it easy to recognize later. A clear note can help a lot when reviewing older entries."],
        ["Can I use it for a new business?", "Yes. Start with your current balance and build your records from today. You do not need accounting experience to get started, and you can grow the habit gradually."],
        ["Is this only for big businesses?", "No. This is designed for small businesses, freelancers, side hustles, and entrepreneurs who want simple, practical financial tracking without heavy software or complicated processes."],
        ["What if I miss a few entries?", "You can always go back and add them. The most important habit is consistency. Even if you do not record every single item immediately, catching up regularly keeps your numbers reliable."],
    ];

    return (
        <>
            <Navbar />
            <main>
                <section id="how-it-works" className="overflow-hidden bg-white py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Simple from day one</p>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">Your finances, made easy in a few clear steps.</h1>
                            <p className="mt-4 text-lg leading-8 text-gray-600">No accounting experience needed. Keep your records up to date, understand your cash flow, and know where your business stands without the stress.</p>
                        </div>

                        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 md:gap-8">
                            {steps.map((step) => (
                                <article key={step.number} className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">{step.icon}</div>
                                        <span className="text-sm font-bold tracking-wider text-blue-600">STEP {step.number}</span>
                                    </div>
                                    <h2 className="mt-7 text-xl font-bold text-gray-900">{step.title}</h2>
                                    <p className="mt-3 leading-7 text-gray-600">{step.text}</p>
                                </article>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Link to={isLoggedIn ? "/transactions" : "/signup"} className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                                Start tracking now <span aria-hidden="true" className="ml-2">→</span>
                            </Link>
                            <p className="mt-3 text-sm text-gray-500">Set up your first transaction in minutes.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 py-20 md:py-24">
                    <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Getting started</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">A simple routine for clearer books.</h2>
                            <p className="mt-5 max-w-xl leading-7 text-gray-600">Bookkeeping works best when it becomes part of your regular routine. Start small, keep your entries current, and let your dashboard do the adding up while you focus on running the business.</p>
                            <div className="mt-8 rounded-2xl bg-blue-600 p-7 text-white shadow-lg shadow-blue-100">
                                <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">Helpful tip</p>
                                <p className="mt-3 text-lg font-semibold leading-7">Use a short note for every transaction—such as “Market supplies,” “Customer payment,” or “Electricity bill”—so you know exactly what each number represents.</p>
                            </div>
                        </div>
                        <ol className="space-y-4">
                            {checklist.map(([title, text], index) => (
                                <li key={title} className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">{index + 1}</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{title}</h3>
                                        <p className="mt-2 leading-7 text-gray-600">{text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="bg-white py-20 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Always up to date</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Know what each number is telling you.</h2>
                        </div>
                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            {benefits.map(([title, text]) => (
                                <article key={title} className="rounded-2xl border border-blue-100 bg-blue-50 p-7">
                                    <p className="text-sm font-bold uppercase tracking-wider text-blue-700">{title}</p>
                                    <h3 className="mt-3 text-xl font-bold text-gray-900">{title === "Money in" ? "Track your earnings" : title === "Money out" ? "Understand your spending" : "See your position at a glance"}</h3>
                                    <p className="mt-3 leading-7 text-gray-600">{text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gray-900 py-20 text-white md:py-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Good to know</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Questions before you begin?</h2>
                        </div>
                        <div className="mt-10 space-y-4">
                            {answers.map(([question, answer]) => (
                                <details key={question} className="rounded-xl border border-gray-700 bg-gray-800 p-5">
                                    <summary className="cursor-pointer font-semibold">{question}</summary>
                                    <p className="mt-4 leading-7 text-gray-300">{answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default HowItWorks;
