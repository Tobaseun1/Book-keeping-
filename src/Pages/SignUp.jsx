import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

function getSignUpErrorMessage(error) {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "An account with that email already exists.";
        case "auth/invalid-email":
            return "Enter a valid email address.";
        case "auth/weak-password":
            return "Password must be at least 6 characters.";
        default:
            return "Something went wrong. Please try again.";
    }
}

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!name.trim() || !email.trim() || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const credential = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );

            await updateProfile(credential.user, {
                displayName: name.trim(),
            });

            navigate("/business-registration");
        } catch (err) {
            console.error("Sign up failed:", err.code, err.message);
            setError(getSignUpErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-12">
            <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-10">

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-xl font-bold text-gray-900"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                        B
                    </span>
                    Bookkeeping
                </Link>

                <h1 className="mt-8 text-3xl font-bold text-gray-900">
                    Create an account
                </h1>

                <p className="mt-2 text-gray-600">
                    Start managing your business finances.
                </p>

                {error && (
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">

                    <label className="block text-sm font-semibold text-gray-700">
                        Full Name

                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter your full name"
                            required
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                        Email address

                        <input
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            required
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                        Password

                        <input
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Create a password"
                            required
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Creating account..." : "Create Account"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Log in
                    </Link>
                </p>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Your account details are kept private and secure.
                </p>

            </section>
        </main>
    );
}

export default SignUp;
