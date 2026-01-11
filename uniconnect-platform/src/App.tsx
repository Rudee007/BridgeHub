import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { TrustBar } from './components/landing/TrustBar';
import { Features } from './components/landing/Features';
import { Stats } from './components/landing/Stats';
import { Testimonials } from './components/landing/Testimonials';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
