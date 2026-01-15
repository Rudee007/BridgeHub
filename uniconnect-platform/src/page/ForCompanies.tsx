// NOW (COMPLETE) ✅
import { ForCompaniesHeroV2 } from '../components/sections/ForCompaniesHeroV2';
import { StatsSection } from '../components/sections/StatsSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { GetStartedSection } from '../components/sections/GetStartedSection';

export const ForCompaniesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Floating Chips */}
      <ForCompaniesHeroV2 />
      
      {/* ✅ Stats Section - ID: features */}
      <div id="features">
        <StatsSection />
      </div>
      
      {/* ✅ Why Choose Us - ID: how-it-works */}
      <div id="how-it-works">
        <WhyChooseUsSection />
      </div>
      
      {/* ✅ CTA Section - ID: get-started */}
      <div id="get-started">
        <GetStartedSection />
      </div>
    </div>
  );
};
