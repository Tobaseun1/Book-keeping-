import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("bookkeepingUser");

    function handleSignOut() {
        localStorage.removeItem("bookkeepingUser");
        navigate("/login");
    }

    return (
        <nav className="absolute top-3 left-1/2 z-20 w-[92%] max-w-6xl -translate-x-1/2">
            <div className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-lg">

                {/* Logo */}
                <Link to="/">
                    <img
                        src="/Basir.png"
                        alt="BasirSeun"
                        className="h-20 md:h-24 w-auto object-contain"
                    />
                </Link>

                {/* Navigation Links */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        to="/features"
                        className="text-gray-600 transition hover:text-blue-600"
                    >
                        Features
                    </Link>

                    <Link
                        to="/how-it-works"
                        className="text-gray-600 transition hover:text-blue-600"
                    >
                        How It Works
                    </Link>

                    <Link
                        to="/contact"
                        className="text-gray-600 transition hover:text-blue-600"
                    >
                        Contact
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {/* Login / Dashboard */}
                    <Link
                        to={isLoggedIn ? "/dashboard" : "/login"}
                        className="hidden text-gray-700 transition hover:text-blue-600 sm:block"
                    >
                        {isLoggedIn ? "Dashboard" : "Login"}
                    </Link>

                    {/* Sign Out */}
                    {isLoggedIn && (
                        <button
                            onClick={handleSignOut}
                            className="font-semibold text-red-600 transition hover:text-red-700"
                        >
                            Sign Out
                        </button>
                    )}

                    {/* Main Button */}
                    {isLoggedIn ? (
                        <Link
                            to="/dashboard"
                            className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/signup"
                            className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
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
