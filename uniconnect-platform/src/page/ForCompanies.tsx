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
      
      {/* Stats Section - Animated Numbers */}
      <StatsSection />
      
      {/* Why Choose Us - Feature Cards */}
      <WhyChooseUsSection />
      
      
      {/* CTA Section - Get Started */}
      <GetStartedSection />
      
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};
