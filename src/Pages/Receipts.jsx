import { Link } from "react-router-dom";

const CURRENCY_SYMBOLS = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
    EUR: "€",
};

function getCurrencySymbol() {
    const currency = localStorage.getItem("currency") || "NGN";
    return CURRENCY_SYMBOLS[currency] || "₦";
}

function getInvoices() {
    try {
        const saved = localStorage.getItem("invoices");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function Receipts() {
    const invoices = getInvoices();
    const paidInvoices = invoices.filter(
        (invoice) => invoice.status === "Paid"
    );

    const currencySymbol = getCurrencySymbol();
    const businessName =
        localStorage.getItem("businessName") || "My Business";

    function printReceipt(invoice) {
        const printWindow = window.open(
            "",
            "_blank",
            "width=700,height=800"
        );

        if (!printWindow) return;

        const receiptNumber =
            `REC-${String(invoice.id).slice(-6)}`;

        const paidDate = invoice.paidAt
            ? new Date(invoice.paidAt).toLocaleDateString()
            : new Date().toLocaleDateString();

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>${receiptNumber}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            max-width: 700px;
                            margin: 0 auto;
                            padding: 40px;
                            color: #111827;
                        }
                        .center {
                            text-align: center;
                        }
                        .line {
                            border-top: 1px solid #e5e7eb;
                            margin: 24px 0;
                        }
                        .row {
                            display: flex;
                            justify-content: space-between;
                            gap: 20px;
                            margin: 12px 0;
                        }
                        .total {
                            font-size: 26px;
                            font-weight: bold;
                        }
                        .muted {
                            color: #6b7280;
                        }
                    </style>
                </head>
                <body>
                    <div class="center">
                        <h1>Payment Receipt</h1>
                        <p class="muted">${businessName}</p>
                        <p>Receipt ${receiptNumber}</p>
                    </div>

                    <div class="line"></div>

                    <div class="row">
                        <strong>Received From</strong>
                        <span>${invoice.clientName}</span>
                    </div>

                    <div class="row">
                        <strong>Invoice</strong>
                        <span>${invoice.number}</span>
                    </div>

                    <div class="row">
                        <strong>Description</strong>
                        <span>${invoice.description}</span>
                    </div>

                    <div class="row">
                        <strong>Payment Date</strong>
                        <span>${paidDate}</span>
                    </div>

                    <div class="line"></div>

                    <div class="row total">
                        <span>Amount Paid</span>
                        <span>${currencySymbol}${Number(invoice.amount).toLocaleString()}</span>
                    </div>

                    <div class="line"></div>

                    <div class="center">
                        <p>Thank you for your payment.</p>
                    </div>
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
                    <div>
                        <Link
                            to="/invoices"
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                            ← Back to Invoices
                        </Link>

                        <h1 className="mt-2 text-3xl font-bold text-gray-900">
                            Receipts
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Print receipts for paid invoices.
                        </p>
                    </div>

                    <Link
                        to="/dashboard"
                        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Dashboard
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-8">

                {paidInvoices.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900">
                            No paid invoices yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Once an invoice is marked as paid, its receipt will appear here.
                        </p>

                        <Link
                            to="/invoices"
                            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Go to Invoices
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {paidInvoices.map((invoice) => (
                            <div
                                key={invoice.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Receipt
                                        </p>

                                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                                            REC-{String(invoice.id).slice(-6)}
                                        </h2>

                                        <p className="mt-2 text-gray-700">
                                            {invoice.clientName}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Invoice {invoice.number}
                                        </p>
                                    </div>

                                    <div className="sm:text-right">
                                        <p className="text-2xl font-bold text-green-600">
                                            {currencySymbol}
                                            {Number(invoice.amount).toLocaleString()}
                                        </p>

                                        <button
                                            onClick={() =>
                                                printReceipt(invoice)
                                            }
                                            className="mt-3 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
                                        >
                                            Print / PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Receipts;
