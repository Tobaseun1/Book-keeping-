import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-blue-600 text-white w-11 h-11 rounded-lg flex items-center justify-center font-bold text-xl">
                        B
                    </div>

                    <span className="text-xl font-bold text-gray-900">
                        Bookkeeping
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <a href="/#features" className="text-gray-700 hover:text-blue-600">
                        Features
                    </a>

                    <a href="/#how-it-works" className="text-gray-700 hover:text-blue-600">
                        How It Works
                    </a>

                    <a href="/#contact" className="text-gray-700 hover:text-blue-600">
                        Contact
                    </a>
                </div>

                <div className="flex items-center gap-6">
                    <a
                        href="/dashboard"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Login
                    </a>

                    <a
                        href="/dashboard"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Get Started
                    </a>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;