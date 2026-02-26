import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { CompanyLayout } from '@/components/layout/CompanyLayout';

// Landing Components
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Testimonials } from '@/components/landing/Testimonials';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';
import { StatsAndTrust } from '@/components/landing/StatsAndTrust';
import { ProblemSolution } from '@/components/landing/ProblemSolution';

// Pages
import { ForCompaniesPage } from '@/page/ForCompanies';
import { ForUniversitiesPage } from '@/page/ForUniversities';

// --- AUTH PAGES ---
import { LoginPage } from '@/page/auth/LoginPage'; 
import { SignupPage } from '@/page/auth/SignupPage'; 
import { UniLoginPage } from '@/page/auth/UniLoginPage'; 
import { UniSignupPage } from '@/page/auth/UniSignupPage'; 

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
import { ApplicationsPage } from '@/page/Applications/ApplicationsPage';

// ✅ FIX 1: Imported without curly braces (Default Import)
import UniversityDashboard from '@/page/University/UniversityDashboard';
import { VerifyStudents } from './page/University/VerifyStudents';
import { EndorsementPipeline } from './page/University/EndorsementPipeline';
import { ActiveProjects } from './page/University/ActiveProjects';
import { MyStudents } from './page/University/MyStudents';
import { Placements } from './page/University/Placements';
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
          {/* ============ PUBLIC LANDING ROUTES ============ */}
          <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
          <Route path="/for-companies" element={<><Navbar /><ForCompaniesPage /><Footer /></>} />
          <Route path="/for-universities" element={<><Navbar /><ForUniversitiesPage /><Footer /></>} />

          {/* ============ AUTHENTICATION ROUTES ============ */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/company/login" element={<LoginPage />} />
          <Route path="/auth/company/signup" element={<SignupPage />} />
          <Route path="/auth/university/login" element={<UniLoginPage />} />
          <Route path="/auth/university/signup" element={<UniSignupPage />} />

          {/* ============ COMPANY DASHBOARD ROUTES ============ */}
          <Route path="/company" element={<CompanyLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/new" element={<CreateProject />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="jobs" element={<JobsList />} />
            <Route path="jobs/new" element={<CreateJob />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="universities" element={<UniList />} />
            <Route path="talent-pool" element={<TalentList />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="settings" element={<div className="p-10 text-center text-gray-500">Settings Page Coming Soon</div>} />
          </Route>

          {/* ============ UNIVERSITY DASHBOARD ROUTES ============ */}
          {/* ✅ FIX 2: Removed element={<UniversityLayout />} since the dashboard already includes it */}
          <Route path="/university">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<UniversityDashboard />} />
            <Route path='verify' element={<VerifyStudents />} />
            <Route path='endorse' element={<EndorsementPipeline />} />
            <Route path='students' element={<MyStudents/>}/>
            <Route path='projects' element={<ActiveProjects/>}/>
            <Route path='placements' element={<Placements/>}/>

            {/* Future university-specific routes can be added here */}
          </Route>

          {/* ============ REDIRECTS & 404 ============ */}
          <Route path="/dashboard" element={<Navigate to="/company/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;