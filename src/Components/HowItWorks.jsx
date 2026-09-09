function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Add your transactions",
            text: "Record the money coming into your business and the money going out.",
        },
        {
            number: "02",
            title: "Organize your finances",
            text: "Use simple categories to keep your income and expenses organized.",
        },
        {
            number: "03",
            title: "Know your balance",
            text: "See your current balance and understand how your business is performing.",
        },
    ];

    return (
        <section id="how-it-works" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900">
                        How it works
                    </h3>

                    <p className="text-gray-500 mt-3">
                        Managing your business finances doesn't have to be complicated.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="text-center p-8 rounded-xl bg-gray-50"
                        >
                            <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                                {step.number}
                            </div>

                            <h4 className="text-xl font-bold text-gray-900 mt-6">
                                {step.title}
                            </h4>

                            <p className="text-gray-500 mt-3 leading-7">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default HowItWorks;