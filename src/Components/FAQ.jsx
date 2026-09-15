function FAQ() {
    const questions = [
        {
            question: "What is Bookkeeping?",
            answer:
                "Bookkeeping helps you record and understand the money coming into and going out of your business.",
        },
        {
            question: "Can I track my business expenses?",
            answer:
                "Yes. You can record your business expenses and organize them into categories.",
        },
        {
            question: "Can I see my current balance?",
            answer:
                "Yes. Your dashboard shows your current balance based on your starting balance, income and expenses.",
        },
        {
            question: "Can I download my transactions?",
            answer:
                "Yes. You can export your transactions as a CSV file.",
        },
        {
            question: "Is Bookkeeping difficult to use?",
            answer:
                "No. The app is designed to make bookkeeping simple and easy to understand.",
        },
    ];

    return (
        <section className="bg-white py-20 md:py-24">
            <div className="mx-auto max-w-4xl px-6">

                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                        FAQ
                    </p>

                    <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Find answers to some common questions about Bookkeeping.
                    </p>
                </div>

                <div className="mt-12 space-y-4">
                    {questions.map((item, index) => (
                        <details
                            key={index}
                            className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                        >
                            <summary className="cursor-pointer font-semibold text-gray-900">
                                {item.question}
                            </summary>

                            <p className="mt-4 leading-7 text-gray-600">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default FAQ;