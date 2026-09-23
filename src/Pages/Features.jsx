import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function Features() {
    const isLoggedIn = localStorage.getItem("bookkeepingUser");

    const coreFeatures = [
        { icon: "↗", title: "Income tracking", text: "Record sales, client payments, and any other money coming into your business. See your earnings without adding numbers by hand, and keep your revenue stream easy to review at any moment.", color: "bg-green-100 text-green-700" },
        { icon: "↘", title: "Expense tracking", text: "Capture everyday costs such as supplies, transport, rent, bills, subscriptions, and payroll. A complete expense record makes it much easier to understand where your money is going.", color: "bg-red-100 text-red-700" },
        { icon: "≡", title: "Categories that make sense", text: "Sort every transaction into the right bucket so your books stay organized and searchable. Group sales, costs, software, utilities, and more into categories that match your business model.", color: "bg-blue-100 text-blue-700" },
        { icon: "▣", title: "Clear dashboard", text: "Open your dashboard for a quick view of your current balance, total income, total expenses, recent transactions, and overall business health without digging through spreadsheets.", color: "bg-violet-100 text-violet-700" },
        { icon: "◫", title: "Simple reports", text: "Review your business performance over time with clean data summaries. Use reports to track monthly trends, compare spending, and make smarter decisions about pricing and cost control.", color: "bg-amber-100 text-amber-700" },
        { icon: "↓", title: "Export your records", text: "Download your transactions as a CSV file whenever you need to share records, work offline, save backups, or send information to an accountant or bookkeeper.", color: "bg-cyan-100 text-cyan-700" },
        { icon: "◌", title: "Transaction notes", text: "Add details like invoice numbers, supplier names, customer nicknames, or payment references so each item is more understandable later when you review your records.", color: "bg-pink-100 text-pink-700" },
        { icon: "◎", title: "Cash flow visibility", text: "Monitor how much money is coming in versus leaving your business. This helps you stay prepared for bills, slow periods, and new opportunities without relying on memory.", color: "bg-indigo-100 text-indigo-700" },
    ];

    const workflow = [
        ["Transactions", "Create a complete daily record of money coming in and going out.", "Add an amount, choose income or expense, select a category, and save. Each entry becomes part of your financial history and updates your overall picture in real time."],
        ["Categories", "Keep similar transactions together so your records stay easy to scan.", "Use categories such as Sales, Supplies, Transport, Utilities, Marketing, or create your own based on how your business actually operates."],
        ["Receipts", "Keep a reminder of important purchases and payments with your transaction details.", "Use notes and labels to include invoice numbers, receipt references, supplier names, or short explanations that make future review much easier."],
        ["Reports", "Turn day-to-day entries into a useful financial overview.", "Compare income and expenses, review activity by date, and identify repeating patterns so you can spot risk early and improve planning."],
        ["Planning", "Take action from the information you already have.", "When your records are up to date, it is easier to decide whether you can invest more, reduce spending, or improve pricing strategies for the next month."],
    ];

    const highlights = [
        ["Stay organized", "Keep all your business activity in one place instead of juggling receipts, spreadsheets, and memory."],
        ["Make faster decisions", "Know your current balance and spending habits before you make a business decision."],
        ["Save time", "Avoid manual calculations and repetitive number-checking during busy workdays."],
    ];

    const questions = [
        ["Do I need accounting knowledge?", "No. The app uses plain language and guides you through the essential information needed for each transaction, making it accessible for beginners and experienced business owners alike."],
        ["Can I track both cash and bank activity?", "Yes. Start from your current balance and record all business money movements consistently, whether they are cash payments, card sales, online payments, or bank transfers."],
        ["What should I put in a transaction note?", "Add a short description that will be useful later, such as “Payment from Amina,” “Office printer ink,” “June electricity bill,” or “Website hosting renewal.” Clear notes save time when reviewing old entries."],
        ["Can I review past transactions?", "Yes. Your transaction history keeps your entries in one place so you can look back whenever you need to confirm a payment, check a cost, or prepare for an audit or tax filing."],
        ["How often should I update my records?", "A few minutes each day is enough. Updating regularly keeps your numbers accurate and makes it easier to spot trends before they become bigger problems."],
    ];

    return (
        <>
            <Navbar />
            <main>
                <section className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-28">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Everything in one place</p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Simple tools for a more confident business.</h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">Bookkeeping brings your daily financial records together, so you can spend less time searching for numbers and more time running your business with better information at your fingertips.</p>
                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link to={isLoggedIn ? "/transactions" : "/signup"} className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Start tracking now →</Link>
                            <Link to="/how-it-works" className="rounded-lg border border-blue-200 bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">See how it works</Link>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-20 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="max-w-2xl">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Core tools</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">The essentials, made easier.</h2>
                            <p className="mt-4 leading-7 text-gray-600">Every feature is designed to keep your financial information clear, organized, and ready when you need it—whether you are running a small shop, a service business, or a growing startup.</p>
                        </div>
                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {coreFeatures.map((feature) => (
                                <article key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                                    <div className={"flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold " + feature.color}>{feature.icon}</div>
                                    <h3 className="mt-5 text-xl font-bold text-gray-900">{feature.title}</h3>
                                    <p className="mt-3 leading-7 text-gray-600">{feature.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 py-20 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Designed for your day</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">From one transaction to a complete picture.</h2>
                            <p className="mt-4 leading-7 text-gray-600">Use the features together to build a simple, reliable routine for your business finances and stay on top of every money movement without overwhelm.</p>
                        </div>
                        <div className="mt-12 grid gap-5 md:grid-cols-2">
                            {workflow.map(([title, description, detail], index) => (
                                <article key={title} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">0{index + 1}</span>
                                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                                    </div>
                                    <p className="mt-5 font-medium leading-7 text-gray-800">{description}</p>
                                    <p className="mt-3 leading-7 text-gray-600">{detail}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-blue-600 py-20 text-white md:py-24">
                    <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">Built for clarity</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Make everyday decisions with better information.</h2>
                            <p className="mt-5 max-w-xl leading-7 text-blue-100">When your records are current, you can quickly answer important questions: Are sales covering expenses? Where is most of the money going? What can the business afford next? The system gives you a cleaner look at the numbers behind your business.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
                            {highlights.map(([title, text]) => (
                                <div key={title} className="rounded-xl border border-blue-400 bg-blue-500 p-5">
                                    <p className="font-bold">{title}</p>
                                    <p className="mt-2 text-sm leading-6 text-blue-100">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-20 md:py-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Frequently asked questions</p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">A few helpful answers.</h2>
                        </div>
                        <div className="mt-10 space-y-4">
                            {questions.map(([question, answer]) => (
                                <details key={question} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                    <summary className="cursor-pointer font-semibold text-gray-900">{question}</summary>
                                    <p className="mt-4 leading-7 text-gray-600">{answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gray-900 py-16 text-center text-white">
                    <div className="mx-auto max-w-2xl px-6">
                        <h2 className="text-3xl font-bold">Ready to keep your books simple?</h2>
                        <p className="mt-4 leading-7 text-gray-300">Start with one transaction today and build a clearer view of your business over time. Better bookkeeping begins with consistency, not perfection.</p>
                        <Link to={isLoggedIn ? "/transactions" : "/signup"} className="mt-7 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-blue-50">{isLoggedIn ? "Add a transaction" : "Create your account"} →</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Features;
