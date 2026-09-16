import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem(
        "bookkeepingUser"
    );


    function handleSignOut() {
        sessionStorage.removeItem("bookkeepingUser");
        navigate("/login");
    }

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

                {/* Right Side */}
                <div className="flex items-center gap-3">

                    {/* Dashboard */}
                    <Link
                        to={isLoggedIn ? "/dashboard" : "/login"}
                        className="hidden sm:block text-gray-700 hover:text-blue-600 transition"
                    >
                        Dashboard
                    </Link>

                    {/* Login / Sign Out */}
                    {isLoggedIn ? (
                        <button
                            onClick={handleSignOut}
                            className="text-red-600 hover:text-red-700 transition font-semibold"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Login
                        </Link>
                    )}

                    {/* Get Started / Dashboard */}
                    {isLoggedIn ? (
                        <Link
                            to="/dashboard"
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/signup"
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Get Started
                        </Link>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;