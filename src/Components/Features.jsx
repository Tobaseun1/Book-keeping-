function Features() {
    const features = [
        {
            title: "Track Money In",
            text: "Record payments and other income from your business.",
        },
        {
            title: "Track Money Out",
            text: "Keep track of your business expenses and spending.",
        },
        {
            title: "Simple Reports",
            text: "Quickly see how much your business earns and spends.",
        },
    ];

    return (
        <section
            id="features"
            className="bg-[#EEF4FF] py-24"
        >
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900">
                        Everything you need
                    </h3>

                    <p className="text-gray-500 mt-3">
                        Simple tools to help you keep track of your business finances.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition"
                        >
                            <h4 className="text-xl font-bold text-gray-900">
                                {feature.title}
                            </h4>

                            <p className="text-gray-500 mt-3">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Features;