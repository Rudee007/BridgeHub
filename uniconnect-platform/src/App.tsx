import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { Testimonials } from './components/landing/Testimonials';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';
import { StatsAndTrust } from './components/landing/StatsAndTrust';  // ✅ New combined component
import { ProblemSolution } from './components/landing/ProblemSolution'; // ✅ NEW

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatsAndTrust /> 
      <ProblemSolution />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
