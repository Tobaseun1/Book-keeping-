import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../Components/Sidebar";
import {
    addInvoice,
    addTransaction,
    deleteInvoice as deleteInvoiceDoc,
    subscribeToInvoices,
    subscribeToProfile,
    subscribeToTransactions,
    updateInvoice,
} from "../lib/firestore";

const CURRENCY_SYMBOLS = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
    EUR: "€",
};

function getNextInvoiceNumber(invoices) {
    const year = new Date().getFullYear();

    const numbers = invoices
        .map((invoice) => {
            const match = String(invoice.number || "").match(
                new RegExp(`INV-${year}-(\\d+)`)
            );

            return match ? Number(match[1]) : 0;
        })
        .filter(Boolean);

    const next = Math.max(0, ...numbers) + 1;

    return `INV-${year}-${String(next).padStart(3, "0")}`;
}

function Invoices() {
    const { user } = useAuth();
    const [invoices, setInvoices] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [currency, setCurrency] = useState("NGN");
    const [businessName, setBusinessName] = useState("My Business");

    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [dueDate, setDueDate] = useState("");

    const currencySymbol = CURRENCY_SYMBOLS[currency] || "₦";

    useEffect(() => {
        const unsubscribe = subscribeToInvoices(user.uid, setInvoices);
        return unsubscribe;
    }, [user.uid]);

    useEffect(() => {
        const unsubscribe = subscribeToTransactions(
            user.uid,
            setTransactions
        );
        return unsubscribe;
    }, [user.uid]);

    useEffect(() => {
        const unsubscribe = subscribeToProfile(user.uid, (profile) => {
            setCurrency(profile.currency);
            setBusinessName(profile.businessName);
        });
        return unsubscribe;
    }, [user.uid]);

    function handleSubmit(event) {
        event.preventDefault();

        const invoiceAmount = Number(amount);

        if (
            !clientName.trim() ||
            !description.trim() ||
            !invoiceAmount ||
            invoiceAmount <= 0
        ) {
            return;
        }

        addInvoice(user.uid, {
            number: getNextInvoiceNumber(invoices),
            clientName: clientName.trim(),
            clientEmail: clientEmail.trim(),
            description: description.trim(),
            amount: invoiceAmount,
            dueDate,
            status: "Pending",
            createdAt: new Date().toISOString(),
            paidAt: null,
        });

        setClientName("");
        setClientEmail("");
        setDescription("");
        setAmount("");
        setDueDate("");
    }

    function markAsPaid(invoice) {
        if (invoice.status === "Paid") return;

        const paidAt = new Date().toISOString();

        updateInvoice(user.uid, invoice.id, {
            status: "Paid",
            paidAt,
        });

        const alreadyRecorded = transactions.some(
            (transaction) => transaction.invoiceId === invoice.id
        );

        if (!alreadyRecorded) {
            addTransaction(user.uid, {
                invoiceId: invoice.id,
                amount: invoice.amount,
                type: "in",
                category: "Sales",
                date: paidAt.slice(0, 10),
                note: `Invoice ${invoice.number} paid by ${invoice.clientName}`,
            });
        }
    }

    function deleteInvoice(id) {
        const confirmed = window.confirm(
            "Delete this invoice?"
        );

        if (!confirmed) return;

        deleteInvoiceDoc(user.uid, id);
    }

    function printInvoice(invoice) {
        const printWindow = window.open(
            "",
            "_blank",
            "width=800,height=900"
        );

        if (!printWindow) return;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>${invoice.number}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 40px;
                            color: #111827;
                        }
                        .header {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 40px;
                        }
                        h1 {
                            margin: 0;
                        }
                        .muted {
                            color: #6b7280;
                        }
                        .box {
                            border: 1px solid #e5e7eb;
                            border-radius: 12px;
                            padding: 20px;
                            margin-top: 20px;
                        }
                        .total {
                            font-size: 28px;
                            font-weight: bold;
                            margin-top: 20px;
                        }
                        @media print {
                            body {
                                padding: 20px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <h1>Invoice</h1>
                            <p class="muted">${invoice.number}</p>
                        </div>
                        <div>
                            <strong>${businessName}</strong>
                        </div>
                    </div>

                    <div class="box">
                        <p class="muted">Bill To</p>
                        <h2>${invoice.clientName}</h2>
                        <p>${invoice.clientEmail || ""}</p>
                    </div>

                    <div class="box">
                        <p><strong>Description:</strong> ${invoice.description}</p>
                        <p><strong>Due date:</strong> ${invoice.dueDate || "Not specified"}</p>
                        <p><strong>Status:</strong> ${invoice.status}</p>
                        <p class="total">${currencySymbol}${Number(invoice.amount).toLocaleString()}</p>
                    </div>
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    const pendingInvoices = invoices.filter(
        (invoice) => invoice.status !== "Paid"
    );

    const paidInvoices = invoices.filter(
        (invoice) => invoice.status === "Paid"
    );

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex">

            <Sidebar />

            <div className="flex-1">

            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Invoices
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Create and track customer invoices.
                        </p>
                    </div>

                    <Link
                        to="/receipts"
                        className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Receipts
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">

                <section className="grid gap-5 md:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">Total Invoices</p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {invoices.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="mt-2 text-3xl font-bold text-yellow-600">
                            {pendingInvoices.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">Paid</p>
                        <p className="mt-2 text-3xl font-bold text-blue-600">
                            {paidInvoices.length}
                        </p>
                    </div>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                    <h2 className="text-xl font-bold text-gray-900">
                        Create Invoice
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid gap-5 md:grid-cols-2"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Client Name
                            </label>
                            <input
                                type="text"
                                value={clientName}
                                onChange={(event) =>
                                    setClientName(event.target.value)
                                }
                                placeholder="Client name"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Client Email
                            </label>
                            <input
                                type="email"
                                value={clientEmail}
                                onChange={(event) =>
                                    setClientEmail(event.target.value)
                                }
                                placeholder="client@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder="What is the invoice for?"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                                placeholder="0.00"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(event) =>
                                    setDueDate(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                            >
                                Create Invoice
                            </button>
                        </div>
                    </form>
                </section>

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Your Invoices
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage invoices and record payments.
                            </p>
                        </div>
                    </div>

                    {invoices.length === 0 ? (
                        <div className="mt-6 rounded-xl bg-gray-50 p-10 text-center">
                            <p className="font-semibold text-gray-800">
                                No invoices yet.
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                Create your first invoice above.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4">
                            {invoices.map((invoice) => (
                                <div
                                    key={invoice.id}
                                    className="rounded-xl border border-gray-200 p-5"
                                >
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="font-bold text-gray-900">
                                                    {invoice.number}
                                                </h3>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        invoice.status === "Paid"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {invoice.status}
                                                </span>
                                            </div>

                                            <p className="mt-2 font-medium text-gray-800">
                                                {invoice.clientName}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {invoice.description}
                                            </p>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Due: {invoice.dueDate || "Not specified"}
                                            </p>
                                        </div>

                                        <div className="text-left lg:text-right">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {currencySymbol}
                                                {Number(invoice.amount).toLocaleString()}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2 lg:justify-end">
                                                {invoice.status !== "Paid" && (
                                                    <button
                                                        onClick={() =>
                                                            markAsPaid(invoice)
                                                        }
                                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                                    >
                                                        Mark Paid
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() =>
                                                        printInvoice(invoice)
                                                    }
                                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                                >
                                                    Print / PDF
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteInvoice(invoice.id)
                                                    }
                                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            </div>

        </div>
    );
}

export default Invoices;
