function Footer() {
    return (
        <footer id="contact" className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


                    <div>
                        <h2 className="text-2xl font-bold text-blue-400">
                            Bookkeeping
                        </h2>

                        <p className="text-gray-400 mt-4 max-w-sm">
                            A simple way to track your business income, expenses and
                            balance without complicated accounting software.
                        </p>
                    </div>


                    <div>
                        <h3 className="font-semibold text-lg">
                            Product
                        </h3>

                        <div className="flex flex-col gap-3 mt-4 text-gray-400">
                            <a href="#features" className="hover:text-white transition">
                                Features
                            </a>

                            <a href="#how-it-works" className="hover:text-white transition">
                                How It Works
                            </a>

                            <a href="/dashboard" className="hover:text-white transition">
                                Get Started
                            </a>
                        </div>
                    </div>


                    <div>
                        <h3 className="font-semibold text-lg">
                            Support
                        </h3>

                        <div className="flex flex-col gap-3 mt-4 text-gray-400">
                            <a href="#" className="hover:text-white transition">
                                Help Center
                            </a>

                            <a href="#contact" className="hover:text-white transition">
                                Contact Us
                            </a>

                            <a href="#" className="hover:text-white transition">
                                Privacy
                            </a>
                        </div>
                    </div>

                </div>


                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
                    © 2026 Bookkeeping. All rights reserved.
                </div>

            </div>
        </footer>
    );
}

export default Footer;