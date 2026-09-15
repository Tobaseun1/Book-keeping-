import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="absolute top-3 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-20">
            <div className="bg-white rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src="/Basir.png"
                        alt="BasirSeun"
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        to="/features"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        Features
                    </Link>

                    <Link
                        to="/how-it-works"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        How It Works
                    </Link>

                    <Link
                        to="/contact"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        Contact
                    </Link>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/dashboard"
                        className="hidden sm:block text-gray-700 hover:text-blue-600 transition"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/login"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/login"
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;