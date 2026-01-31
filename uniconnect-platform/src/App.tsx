// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { ProjectsList } from '@/page/Company/Projects/ProjectsList';
import { CreateProject } from '@/page/Company/Projects/CreateProject';
import {JobsList} from '@/page/Company/Jobs/JobList';
import {CreateJob} from '@/page/Company/Jobs/CreateJob'
import {JobDetails} from '@/page/Company/Jobs/JobDetails'
import  ProjectDetails  from '@/page/Company/Projects/ProjectDetails';
import UniList from './page/Company/University/UniList';
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

          {/* ============ COMPANY ROUTES (Dashboard & Features) ============ */}
          <Route path="/company">
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/new" element={<CreateProject />} />
            <Route path="jobs" element={<JobsList />} />           {/* NEW */}
            <Route path="jobs/new" element={<CreateJob />} />   
              <Route path="jobs/:id" element={<JobDetails />} />    
            <Route path="universities" element={<UniList />} />

            {/* <Route path="talent-pool" element={<TalentPool />} /> */}
            {/* <Route path="applications" element={<ApplicationsList />} /> */}
            {/* <Route path="analytics" element={<Analytics />} /> */}
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>

          <Route path="/jobs" element={<Navigate to="/company/jobs" replace />} />
<Route path="/jobs/new" element={<Navigate to="/company/jobs/new" replace />} />

          {/* ============ CONVENIENCE REDIRECTS ============ */}
          <Route path="/dashboard" element={<Navigate to="/company/dashboard" replace />} />
          <Route path="/projects" element={<Navigate to="/company/projects" replace />} />
          // Route: /company/projects/:id → ProjectDetails
<Route path="/company/projects/:id" element={<ProjectDetails />} />

          <Route path="/projects/new" element={<Navigate to="/company/projects/new" replace />} />

          {/* ============ 404 FALLBACK ============ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
