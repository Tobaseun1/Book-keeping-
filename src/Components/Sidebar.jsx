import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const NAV_ITEMS = [
    { to: "/dashboard", icon: "📊", label: "Dashboard" },
    { to: "/transactions", icon: "💳", label: "Transactions" },
    { to: "/categories", icon: "📁", label: "Categories" },
    { to: "/savings-target", icon: "🎯", label: "Savings Target" },
    { to: "/reports", icon: "📈", label: "Reports" },
    { to: "/invoices", icon: "🧾", label: "Invoices" },
    { to: "/settings", icon: "⚙️", label: "Settings" },
];

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    function handleSignOut() {
        signOut(auth);
        navigate("/login");
    }

    return (
        <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 min-h-screen flex-col">

            <div className="p-6 border-b border-gray-200">
                <Link to="/" aria-label="Go to the BasirSeun home page">
                    <img
                        src="/Basir.png"
                        alt="BasirSeun"
                        className="h-24 w-full object-contain"
                    />
                </Link>

                <p className="text-xs text-gray-500 mt-1">
                    Simple financial management
                </p>
            </div>

            <nav className="p-4 flex-1">

                <p className="text-xs font-semibold text-gray-400 uppercase px-3 mb-3">
                    Menu
                </p>

                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.to;

                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={
                                isActive
                                    ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold mb-2"
                                    : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 mb-2"
                            }
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}

            </nav>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
                >
                    <span>🚪</span>
                    Sign Out
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;
