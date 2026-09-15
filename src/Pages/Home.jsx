import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import HowItWorks from "../Components/HowItWorks";
import CTA from "../Components/CTA";
import Footer from "../Components/Footer";

function Home() {
    return (
        <>
            <div className="relative">
                <Navbar />
                <Hero />
            </div>

            <Features />
            <HowItWorks />
            <CTA />
            <Footer />
        </>
    );
}

export default Home;