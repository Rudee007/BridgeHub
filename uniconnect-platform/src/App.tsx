import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { Testimonials } from './components/landing/Testimonials';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';
import { StatsAndTrust } from './components/landing/StatsAndTrust';
import { ProblemSolution } from './components/landing/ProblemSolution';
import { ForCompaniesPage } from '@/page/ForCompanies';
import { ForUniversitiesPage } from '@/page/ForUniversities';

// Home page component
const HomePage = () => {
  return (
    <>
      <Hero />
      <StatsAndTrust />
      <ProblemSolution />
      <Testimonials />
      <CTA />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Navbar />
        
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* For Companies Page */}
          <Route path="/for-companies" element={<ForCompaniesPage />} />
          
          {/* For Universities Page */}
          <Route path="/for-universities" element={<ForUniversitiesPage />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
