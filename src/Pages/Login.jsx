import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function getLoginErrorMessage(error) {
    switch (error.code) {
        case "auth/invalid-email":
            return "Enter a valid email address.";
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Email or password is incorrect.";
        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";
        default:
            return "Something went wrong. Please try again.";
    }
}

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setSubmitting(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            navigate("/transactions");
        } catch (err) {
            setError(getLoginErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
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
                        Email address
                        <input type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="you@example.com" required className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <label className="block text-sm font-semibold text-gray-700">
                        Password
                        <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <button type="submit" disabled={submitting} className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                        {submitting ? "Signing in..." : "Log in"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">Don't have an account? <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">Sign up</Link></p>
                <p className="mt-4 text-center text-sm text-gray-500">Your account details are kept private and secure.</p>
            </section>
        </main>
    );
}

export default Login;
