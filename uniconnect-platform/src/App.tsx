// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { CompanyLayout } from './components/layout/CompanyLayout'; // ✅ Import the new layout

// Landing Components
import { Navbar } from './components/landing/Navbar'; // Landing Navbar
import { Hero } from './components/landing/Hero';
import { Testimonials } from './components/landing/Testimonials';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';
import { StatsAndTrust } from './components/landing/StatsAndTrust';
import { ProblemSolution } from './components/landing/ProblemSolution';

// Pages
import { ForCompaniesPage } from '@/page/ForCompanies';
import { ForUniversitiesPage } from '@/page/ForUniversities';
import { SignupPage } from '@/page/auth/SignupPage';
import { LoginPage } from '@/page/auth/LoginPage';

// Company Dashboard Pages
import { CompanyDashboard } from '@/page/Company/CompanyDashboard';
import { ProjectsList } from '@/page/Company/Projects/ProjectsList';
import { CreateProject } from '@/page/Company/Projects/CreateProject';
import ProjectDetails from '@/page/Company/Projects/ProjectDetails';
import { JobsList } from '@/page/Company/Jobs/JobList';
import { CreateJob } from '@/page/Company/Jobs/CreateJob';
import { JobDetails } from '@/page/Company/Jobs/JobDetails';
import { UniList } from '@/page/Company/University/UniList';
import { TalentList } from '@/page/Company/Talent/TalentList';
import { AnalyticsDashboard } from '@/page/Company/Analytics/AnalyticsDashboard';
import { ApplicationsPage } from './page/Applications/ApplicationsPage';

const HomePage = () => (
  <>
    <Hero />
    <div id="features"><StatsAndTrust /></div>
    <div id="how-it-works"><ProblemSolution /></div>
    <div id="testimonials"><Testimonials /></div>
    <div id="about"><CTA /></div>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden font-sans">
        <Routes>
          {/* ============ PUBLIC ROUTES ============ */}
          {/* These use the Landing Navbar */}
          <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
          <Route path="/for-companies" element={<><Navbar /><ForCompaniesPage /><Footer /></>} />
          <Route path="/for-universities" element={<><Navbar /><ForUniversitiesPage /><Footer /></>} />

          {/* ============ AUTH ROUTES ============ */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ============ COMPANY ROUTES (PROTECTED) ============ */}
          {/* ✅ Wrapped in CompanyLayout to provide Global Sidebar & Navbar */}
          <Route path="/company" element={<CompanyLayout />}>
            
            {/* The index route redirects to dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            
            <Route path="dashboard" element={<CompanyDashboard />} />
            
            {/* Projects */}
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/new" element={<CreateProject />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            
            {/* Jobs */}
            <Route path="jobs" element={<JobsList />} />
            <Route path="jobs/new" element={<CreateJob />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            
            {/* Network & Talent */}
            <Route path="universities" element={<UniList />} />
            <Route path="talent-pool" element={<TalentList />} />
            <Route path="applications" element={<ApplicationsPage />} />
            
            {/* Insights */}
            <Route path="analytics" element={<AnalyticsDashboard />} />
            
            {/* Settings Placeholder */}
            <Route path="settings" element={<div className="p-10 text-center text-gray-500">Settings Page Coming Soon</div>} />
          </Route>

          {/* ============ REDIRECTS ============ */}
          {/* If user tries to access /dashboard directly, send them to /company/dashboard */}
          <Route path="/dashboard" element={<Navigate to="/company/dashboard" replace />} />
          
          {/* 404 / Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;