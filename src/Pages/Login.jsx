import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const value = contact.trim();
        const digits = value.replace(/\D/g, "");
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isPhone = digits.length >= 10 && digits.length <= 15;
        const savedUser = JSON.parse(localStorage.getItem("bookkeepingUser"));

        if (!isEmail && !isPhone) {
            setError("Enter a valid email address or phone number.");
            return;
        }
        if (!savedUser) {
            setError("No account found. Please sign up first.");
            return;
        }
        if (value !== savedUser.contact) {
            setError("Email or phone number is incorrect.");
            return;
        }
        if (password.length < 6) {
            setError("Your password must be at least 6 characters.");
            return;
        }

        localStorage.setItem("bookkeepingUser", JSON.stringify(savedUser));
        navigate("/transactions");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-12">
            <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-10">
                <Link to="/" className="inline-flex">
                    <img src="/Basir.png" alt="BasirSeun" className="h-28 w-auto object-contain" />
                </Link>
                <h1 className="mt-8 text-3xl font-bold text-gray-900">Welcome back</h1>
                <p className="mt-2 text-gray-600">Sign in to manage your business finances.</p>
                {error && <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <label className="block text-sm font-semibold text-gray-700">
                        Email address or phone number
                        <input type="text" inputMode="email" autoComplete="username" value={contact} onChange={(event) => { setContact(event.target.value); setError(""); }} placeholder="you@example.com or +234 814 125 2897" required className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <label className="block text-sm font-semibold text-gray-700">
                        Password
                        <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <button type="submit" className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Log in</button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">Don't have an account? <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">Sign up</Link></p>
                <p className="mt-4 text-center text-sm text-gray-500">Your account details are kept private and secure.</p>
            </section>
        </main>
    );
}

export default Login;
