function Hero() {
    return (
        <section className="relative overflow-hidden bg-white">

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">


                    <div className="flex items-center px-6 py-20 lg:py-28">
                        <div className="max-w-xl">

                            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                                Simple Business Bookkeeping
                            </span>

                            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mt-6">
                                Take control of your
                                <span className="text-blue-600">
                                    {" "}business finances.
                                </span>
                            </h2>

                            <p className="text-lg text-gray-600 mt-6 leading-8">
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

                            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-500">
                                <span>✓ Easy to use</span>
                                <span>✓ Simple tracking</span>
                                <span>✓ Clear reports</span>
                            </div>

                        </div>
                    </div>



                    <div
                        className="min-h-[500px] lg:min-h-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://leoerp.com.ng/modules/cms/img/home.png')",
                        }}
                    >
                    </div>

                </div>
            </div>

        </section>
    );
}

export default Hero;