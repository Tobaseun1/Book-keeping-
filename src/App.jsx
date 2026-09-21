import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Transactions from "./Pages/Transactions";
import Categories from "./Pages/Categories";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";
import Invoices from "./Pages/Invoices";
import Receipts from "./Pages/Receipts";
import SavingsTarget from "./Pages/SavingsTarget";
import Contact from "./Pages/Contact";
import Features from "./Pages/Features";
import HowItWorks from "./Pages/HowItWorks";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

import ProtectedRoute from "./Components/ProtectedRoute";
import BusinessRegistration from "./Pages/BusinessRegistration";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/business-registration"
                    element={<BusinessRegistration />}
                />

                {/* Protected Pages */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute>
                            <Transactions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/savings-target"
                    element={
                        <ProtectedRoute>
                            <SavingsTarget />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/categories"
                    element={
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/invoices"
                    element={
                        <ProtectedRoute>
                            <Invoices />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/receipts"
                    element={
                        <ProtectedRoute>
                            <Receipts />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
