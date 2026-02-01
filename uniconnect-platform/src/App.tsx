// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Landing Components
import { Navbar } from './components/landing/Navbar';
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
import { UniList } from '@/page/Company/University/UniList'; // Ensure this path is correct

const HomePage = () => {
  return (
    <>
      <Hero />
      <div id="features"><StatsAndTrust /></div>
      <div id="how-it-works"><ProblemSolution /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="about"><CTA /></div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Routes>
          {/* ============ PUBLIC ROUTES ============ */}
          <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
          <Route path="/for-companies" element={<><Navbar /><ForCompaniesPage /><Footer /></>} />
          <Route path="/for-universities" element={<><Navbar /><ForUniversitiesPage /><Footer /></>} />

          {/* ============ AUTH ROUTES ============ */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ============ COMPANY ROUTES ============ */}
          <Route path="/company">
            <Route path="dashboard" element={<CompanyDashboard />} />
            
            {/* Projects */}
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/new" element={<CreateProject />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            
            {/* Jobs */}
            <Route path="jobs" element={<JobsList />} />
            <Route path="jobs/new" element={<CreateJob />} />
            <Route path="jobs/:id" element={<JobDetails />} />
            
            {/* Universities (New) */}
            <Route path="universities" element={<UniList />} />
          </Route>

          {/* ============ REDIRECTS ============ */}
          <Route path="/dashboard" element={<Navigate to="/company/dashboard" replace />} />
          <Route path="/jobs" element={<Navigate to="/company/jobs" replace />} />
          <Route path="/projects" element={<Navigate to="company/projects" replace/>}/>
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;