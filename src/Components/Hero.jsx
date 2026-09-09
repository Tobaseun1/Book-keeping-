function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white">


            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-100 rounded-full opacity-60"></div>

            <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14">


                    <div className="relative z-10">

                        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Simple Business Bookkeeping
                        </span>

                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mt-6">
                            Take control of your
                            <span className="text-blue-600"> business finances.</span>
                        </h2>

                        <p className="text-lg text-gray-600 mt-6 max-w-xl leading-8">
                            Track your income, expenses and balance in one simple place.
                            Know where your money is going without complicated accounting
                            software.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">

                            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
                                Get Started →
                            </button>

                            <button className="border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition">
                                Learn More
                            </button>

                        </div>

                        <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
                            <span>✓ Easy to use</span>
                            <span>✓ Simple tracking</span>
                            <span>✓ Clear reports</span>
                        </div>

                    </div>


                    <div className="relative flex justify-center">

                        <div className="absolute w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

                        <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
                            <img
                                src="/Man.jpg"
                                alt="Professional businessman"
                                className="w-full max-w-md h-[500px] object-cover rounded-5xl"
                            />
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;