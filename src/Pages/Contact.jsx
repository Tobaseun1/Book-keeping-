import { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const phoneNumber = "+234 814 125 2897";
    const whatsappNumber = "2348141252897";

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
    }

    return (
        <>
            <Navbar />
            <main className="bg-gray-50">
                <section
                    className="relative overflow-hidden bg-cover bg-center px-6 py-20 text-center text-white"
                    style={{ backgroundImage: "url('https://d2wvwvig0d1mx7.cloudfront.net/data/org/30532/media/img/source/edit/3597260_edit.webp')" }}
                >
                    <div className="absolute inset-0 bg-blue-950/85" aria-hidden="true" />
                    <div className="relative">
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">Support</p>
                        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold md:text-5xl">We&apos;re here to help your business stay on track.</h1>
                        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-blue-100">Have a question about your finances, transactions, or your Bookkeeping account? Send us a message.</p>
                    </div>
                </section>

                <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-16 lg:grid-cols-3">
                    <aside className="space-y-5">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900">Contact support</h2>
                            <p className="mt-2 text-gray-600">Our team usually replies within one business day.</p>
                            <a href="mailto:support@bookkeeping.com" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700">support@bookkeeping.com</a>
                            <div className="mt-5 space-y-3 border-t border-gray-100 pt-5 text-sm">
                                <div>
                                    <p className="font-semibold text-gray-900">Call us</p>
                                    <a href="tel:+2348141252897" className="mt-1 inline-block text-blue-600 hover:text-blue-700">{phoneNumber}</a>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">WhatsApp</p>
                                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="mt-1 inline-block text-blue-600 hover:text-blue-700">Chat with our support team</a>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900">What can we help with?</h2>
                            <ul className="mt-4 space-y-3 text-gray-600">
                                <li>• Adding or correcting transactions</li>
                                <li>• Understanding your balance and reports</li>
                                <li>• Account access and general questions</li>
                            </ul>
                        </div>
                    </aside>

                    <section className="rounded-2xl border bg-white p-6 shadow-sm md:p-8 lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                        <p className="mt-2 text-gray-600">Please include enough detail for us to help quickly.</p>
                        {submitted && <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-800" role="status">Thanks! Your message has been recorded. We&apos;ll get back to you soon.</div>}

                        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                            <label className="block text-sm font-medium text-gray-700">Full name
                                <input name="name" value={form.name} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Your name" />
                            </label>
                            <label className="block text-sm font-medium text-gray-700">Email address
                                <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="you@example.com" />
                            </label>
                            <label className="block text-sm font-medium text-gray-700 md:col-span-2">Subject
                                <input name="subject" value={form.subject} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="How can we help?" />
                            </label>
                            <label className="block text-sm font-medium text-gray-700 md:col-span-2">Message
                                <textarea name="message" value={form.message} onChange={handleChange} required rows="6" className="mt-2 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Tell us a little more about your question." />
                            </label>
                            <div className="md:col-span-2"><button type="submit" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Send message</button></div>
                        </form>
                    </section>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Contact;
