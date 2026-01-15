// components/onboarding/IdentityStep.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Building2, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface CompanyData {
  websiteUrl: string;
  companyName: string;
  industry: string;
  location: string;
  phoneNumber: string;
  description: string;
  logoUrl: string;
}

interface IdentityStepProps {
  data: CompanyData;
  updateData: (field: keyof CompanyData, value: string) => void;
  onNext: () => void;
}

const industries = [
  "SaaS", "EdTech", "FinTech", "HealthTech", "E-commerce", 
  "AI/ML", "Consulting", "Marketing", "Manufacturing",
  "Retail", "Real Estate", "Media", "Other"
];

type FetchStatus = 'idle' | 'fetching' | 'success' | 'error';

export const IdentityStep = ({ data, updateData, onNext }: IdentityStepProps) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchTimeout, setFetchTimeout] = useState<number | null>(null);

  // ✅ IMPROVED: Better logo validation
  const validateLogoImage = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        // Check if image is reasonably sized for a logo (not a full screenshot)
        // Logos are typically square or close to square, and not too large
        const aspectRatio = img.width / img.height;
        const isReasonableSize = img.width <= 1000 && img.height <= 1000;
        const isSquareish = aspectRatio >= 0.5 && aspectRatio <= 2;
        
        resolve(isReasonableSize && isSquareish);
      };
      
      img.onerror = () => resolve(false);
      
      // Set timeout for slow-loading images
      setTimeout(() => resolve(false), 5000);
      
      img.src = url;
    });
  };

  const fetchCompanyData = async (url: string) => {
    setFetchStatus('fetching');
    setErrorMessage('');

    try {
      let normalizedUrl = url.trim();
      if (!normalizedUrl.startsWith('http')) {
        normalizedUrl = `https://${normalizedUrl}`;
      }

      const urlObj = new URL(normalizedUrl);
      const domain = urlObj.hostname.replace('www.', '');

      // ✅ METHOD 1: Clearbit Logo API (Primary - Most Reliable)
      const clearbitLogo = `https://logo.clearbit.com/${domain}`;
      const isClearbitValid = await validateLogoImage(clearbitLogo);
      
      if (isClearbitValid) {
        updateData("logoUrl", clearbitLogo);
      }

      // ✅ METHOD 2: Try alternative logo APIs
      if (!isClearbitValid) {
        // Brandfetch API (free tier available)
        const brandfetchLogo = `https://logo.brandfetch.io/${domain}`;
        const isBrandfetchValid = await validateLogoImage(brandfetchLogo);
        
        if (isBrandfetchValid) {
          updateData("logoUrl", brandfetchLogo);
        }
      }

      // ✅ METHOD 3: Fetch metadata from website
      const corsProxy = 'https://api.allorigins.win/raw?url=';
      const response = await fetch(corsProxy + encodeURIComponent(normalizedUrl), {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch website data');
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Extract company name
      const companyName = 
        doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ||
        doc.querySelector('meta[name="application-name"]')?.getAttribute('content') ||
        doc.querySelector('title')?.textContent?.split('|')[0].split('-')[0].trim() ||
        domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);

      // Extract description
      const description = 
        doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
        doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
        '';

      // ✅ IMPROVED: Better logo extraction (avoid screenshots)
      // Try favicon first (usually actual logos)
      const faviconLinks = [
        doc.querySelector('link[rel="icon"]')?.getAttribute('href'),
        doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href'),
        doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href'),
      ];

      for (const faviconUrl of faviconLinks) {
        if (faviconUrl && !data.logoUrl) {
          let absoluteFaviconUrl = faviconUrl;
          if (!faviconUrl.startsWith('http')) {
            absoluteFaviconUrl = new URL(faviconUrl, normalizedUrl).href;
          }
          
          const isValidFavicon = await validateLogoImage(absoluteFaviconUrl);
          if (isValidFavicon) {
            updateData("logoUrl", absoluteFaviconUrl);
            break;
          }
        }
      }

      // Detect industry from page content
      const pageText = doc.body.textContent?.toLowerCase() || '';
      let detectedIndustry = '';
      
      if (pageText.includes('software') || pageText.includes('saas')) detectedIndustry = 'SaaS';
      else if (pageText.includes('education') || pageText.includes('learning')) detectedIndustry = 'EdTech';
      else if (pageText.includes('finance') || pageText.includes('banking')) detectedIndustry = 'FinTech';
      else if (pageText.includes('health') || pageText.includes('medical')) detectedIndustry = 'HealthTech';
      else if (pageText.includes('ecommerce') || pageText.includes('shop')) detectedIndustry = 'E-commerce';
      else if (pageText.includes('ai') || pageText.includes('machine learning')) detectedIndustry = 'AI/ML';

      // Auto-fill form
      if (companyName) {
        updateData("companyName", companyName);
      }

      if (description) {
        updateData("description", description.substring(0, 300));
      }

      if (detectedIndustry) {
        updateData("industry", detectedIndustry);
      }

      setFetchStatus('success');
      setTimeout(() => setFetchStatus('idle'), 3000);

    } catch (error) {
      console.error('Error fetching company data:', error);
      setFetchStatus('error');
      setErrorMessage('Unable to auto-fill. Please enter details manually.');
      
      setTimeout(() => {
        setFetchStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleWebsiteFetch = (url: string) => {
    updateData("websiteUrl", url);
    
    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }

    if (!url || url.length < 4 || !url.includes('.')) {
      setFetchStatus('idle');
      return;
    }

    const timeout = setTimeout(() => {
      fetchCompanyData(url);
    }, 1200);

    setFetchTimeout(timeout);
  };

  const isValid = data.websiteUrl && data.companyName && data.industry;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Website URL Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company Website
        </label>
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="url"
            value={data.websiteUrl}
            onChange={(e) => handleWebsiteFetch(e.target.value)}
            placeholder="coursera.org"
            className={`w-full pl-12 pr-12 py-3 border rounded-lg transition-all outline-none ${
              fetchStatus === 'success' 
                ? 'border-green-500 focus:ring-2 focus:ring-green-200' 
                : fetchStatus === 'error'
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-primary-200 focus:border-primary-500'
            }`}
          />
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {fetchStatus === 'fetching' && (
                <motion.div
                  key="fetching"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {/* ✅ CHANGED: Sparkles → Loader2 */}
                  <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
                </motion.div>
              )}
              {fetchStatus === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
              {fetchStatus === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <AnimatePresence>
          {fetchStatus === 'fetching' && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-xs text-primary-600 flex items-center gap-1"
            >
              {/* ✅ CHANGED: Sparkles → Loader2 */}
              <Loader2 className="h-3 w-3 animate-spin" />
              Fetching company details...
            </motion.p>
          )}
          {fetchStatus === 'success' && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-xs text-green-600 flex items-center gap-1"
            >
              <CheckCircle2 className="h-3 w-3" />
              Auto-filled! You can edit any details below
            </motion.p>
          )}
          {fetchStatus === 'error' && errorMessage && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-xs text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3" />
              {errorMessage}
            </motion.p>
          )}
          {fetchStatus === 'idle' && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-xs text-gray-500"
            >
              We'll auto-fill your company details from your website
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company Name
        </label>
        <div className="relative">
          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => updateData("companyName", e.target.value)}
            placeholder="Your company name"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all outline-none"
          />
        </div>
      </div>

      {/* Industry Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Industry
        </label>
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => updateData("industry", industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                data.industry === industry
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow-primary"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={!isValid}
        whileHover={isValid ? { scale: 1.02 } : {}}
        whileTap={isValid ? { scale: 0.98 } : {}}
        className={`mt-8 w-full py-4 rounded-lg font-semibold text-white transition-all ${
          isValid
            ? "bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-glow-primary cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Continue to Reach
      </motion.button>
    </motion.div>
  );
};