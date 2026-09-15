import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Transactions from "./Pages/Transactions";
import Categories from "./Pages/Categories";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";

import Contact from "./Pages/Contact";
import Features from "./Pages/Features";
import HowItWorks from "./Pages/HowItWorks";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;