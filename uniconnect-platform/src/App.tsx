import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { Features } from './components/landing/Features';
import { Testimonials } from './components/landing/Testimonials';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';
import { StatsAndTrust } from './components/landing/StatsAndTrust';  // ✅ New combined component

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatsAndTrust />  {/* ✅ Combined TrustBar + Stats */}
      <Features />
      
      {/* <Stats /> */}
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
