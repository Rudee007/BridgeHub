import { ForUniversitiesHeroV2 } from '../components/sections/ForUniversitiesHeroV2';
import { StatsSectionUni } from '@/components/universities/sections/StatsSectionUni';
import { WhyChooseUsSectionUni } from '@/components/universities/sections/WhyChooseUsSectionUni';
import { GetStartedSectionUni } from '@/components/universities/sections/GetStartedSectionUni';
export const ForUniversitiesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <ForUniversitiesHeroV2 />

    <div id='features'>
      <StatsSectionUni/>
    </div>

    <div id="how-it-works">
      <WhyChooseUsSectionUni/>
    </div>
      
    <div id='get-started'>
      <GetStartedSectionUni/>
    </div>
    
    </div>
  );
};
