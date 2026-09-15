function Navbar() {
    return (
        <nav className="absolute top-3 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-20">
            <div className="bg-white rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <a href="/" className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Bookkeeping"
                        className="h-20 w-auto"
                    />
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a
                        href="#features"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        How It Works
                    </a>

                    <a
                        href="#contact"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        Contact
                    </a>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <a
                        href="/dashboard"
                        className="hidden sm:block text-gray-700 hover:text-blue-600 transition"
                    >
                        Login
                    </a>

                    <a
                        href="/dashboard"
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Get Started
                    </a>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;