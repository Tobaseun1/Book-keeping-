import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


                <Link to="/" className="flex items-center">
                    <img
                        src="/Basir.png"
                        alt="BashirSeun"
                        className="h-20 w-auto object-contain"
                    />
                </Link>


                <div className="hidden md:flex items-center gap-8">
                    <a
                        href="/#features"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Features
                    </a>

                    <a
                        href="/#how-it-works"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        How It Works
                    </a>

                    <a
                        href="/#contact"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Contact
                    </a>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/dashboard"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Login
                    </Link>

                    <Link
                        to="/dashboard"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Get Started
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;