import React from 'react';
import {
  SiAirbnb,
  SiUber,
  SiSpotify,
  SiSlack,
  SiStripe,
  SiNotion,
  SiVercel,
  SiFigma,
  SiTrello,
  SiAsana,
  SiZoom,
  SiDropbox,
  SiSquare,
  SiLinear,
  SiGithub,
  SiDiscord,
} from '@icons-pack/react-simple-icons';

interface CompanyLogoProps {
  name: string;
  className?: string;
}

export const CompanyLogo = ({ name, className = 'w-full h-full' }: CompanyLogoProps) => {
  const logoMap: Record<string, React.ReactElement> = {
    // Tech Startups
    Airbnb: <SiAirbnb className={className} />,
    Uber: <SiUber className={className} />,
    Spotify: <SiSpotify className={className} />,
    Slack: <SiSlack className={className} />,
    Stripe: <SiStripe className={className} />,
    Notion: <SiNotion className={className} />,
    Vercel: <SiVercel className={className} />,
    Figma: <SiFigma className={className} />,
    Trello: <SiTrello className={className} />,
    Asana: <SiAsana className={className} />,
    Zoom: <SiZoom className={className} />,
    Dropbox: <SiDropbox className={className} />,
    Square: <SiSquare className={className} />,
    Linear: <SiLinear className={className} />,
    Github: <SiGithub className={className} />,
    Discord: <SiDiscord className={className} />,
  };

  return logoMap[name] || <span className={className}>{name}</span>;
};
