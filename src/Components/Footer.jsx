import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


                    <div>
                        <Link to="/" aria-label="Go to the BasirSeun home page">
                            <img src="/Basir.png" alt="BasirSeun" className="h-28 w-auto rounded-lg bg-white object-contain" />
                        </Link>

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
                            <Link to="/features" className="hover:text-white transition">
                                Features
                            </Link>

                            <Link to="/how-it-works" className="hover:text-white transition">
                                How It Works
                            </Link>

                            <Link to="/dashboard" className="hover:text-white transition">
                                Get Started
                            </Link>
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

                            <Link to="/contact" className="hover:text-white transition">
                                Contact Us
                            </Link>

                            <a href="#" className="hover:text-white transition">
                                Privacy
                            </a>
                        </div>
                    </div>

                </div>


                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
                    © 2026 BasirSeun. All rights reserved.
                </div>

            </div>
        </footer>
    );
}

export default Footer;
