import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const value = contact.trim();

        if (!name || !value || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        // Frontend-only account
        localStorage.setItem(
            "bookkeepingUser",
            JSON.stringify({
                name: name,
                contact: value,
            })
        );

        navigate("/dashboard");
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

                <form
                    onSubmit={handleSubmit}
                    className="mt-7 space-y-5"
                >
                    <label className="block text-sm font-semibold text-gray-700">
                        Full Name

                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Enter your full name"
                            required
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                        Email or Phone Number

                        <input
                            type="text"
                            value={contact}
                            onChange={(event) =>
                                setContact(event.target.value)
                            }
                            placeholder="Email or +234 814 125 2897"
                            required
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                        Password

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Create a password"
                            required
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Create Account
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