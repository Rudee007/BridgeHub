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

import { SignupPage } from '@/page/auth/SignupPage';
import { LoginPage } from '@/page/auth/LoginPage';
import { CompanyDashboard } from '@/page/Company/CompanyDashboard';

// Home page component - WITH SECTION IDs ✅
const HomePage = () => {
  return (
    <>
      <Hero />
      
      {/* ✅ ADD ID="features" */}
      <div id="features">
        <StatsAndTrust />
      </div>
      
      {/* ✅ ADD ID="how-it-works" */}
      <div id="how-it-works">
        <ProblemSolution />
      </div>
      
      {/* ✅ ADD ID="testimonials" */}
      <div id="testimonials">
        <Testimonials />
      </div>
      
      {/* ✅ ADD ID="about" */}
      <div id="about">
        <CTA />
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Routes>
          {/* ============ PUBLIC ROUTES (With Navbar & Footer) ============ */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            }
          />
          
          <Route
            path="/for-companies"
            element={
              <>
                <Navbar />
                <ForCompaniesPage />
                <Footer />
              </>
            }
          />
          
          <Route
            path="/for-universities"
            element={
              <>
                <Navbar />
                <ForUniversitiesPage />
                <Footer />
              </>
            }
          />

          {/* ============ AUTH ROUTES (No Navbar/Footer) ============ */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ============ PROTECTED ROUTES (Dashboard) ============ */}
          <Route path="/dashboard" element={<CompanyDashboard />} />
          
          {/* ✅ REMOVED /onboarding route - it's a modal inside dashboard */}

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
