// Breakpoint definitions
export const breakpoints = {
    mobile: 375,
    tablet: 641,
    desktop: 1025,
    large: 1441,
  } as const;
  
  // Tailwind breakpoint classes
  export const screens = {
    sm: '640px',   // Mobile landscape / Small tablet
    md: '768px',   // Tablet
    lg: '1024px',  // Desktop
    xl: '1280px',  // Large desktop
    '2xl': '1536px', // Extra large
  } as const;
  
  // Container max-widths
  export const containerSizes = {
    mobile: '100%',
    tablet: '768px',
    desktop: '1024px',
    large: '1280px',
  } as const;
  
  // Spacing scales
  export const spacing = {
    mobile: {
      section: 'py-12',
      container: 'px-4',
      gap: 'gap-6',
    },
    tablet: {
      section: 'py-16 md:py-20',
      container: 'px-6 md:px-8',
      gap: 'gap-6 md:gap-8',
    },
    desktop: {
      section: 'py-20 lg:py-24',
      container: 'px-6 lg:px-8',
      gap: 'gap-8 lg:gap-12',
    },
  } as const;
  
  // Grid configurations
  export const gridConfigs = {
    features: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    stats: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    testimonials: 'grid-cols-1 lg:grid-cols-3',
    projects: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  } as const;
  
  // Typography scales
  export const typography = {
    hero: {
      mobile: 'text-4xl sm:text-5xl',
      tablet: 'md:text-6xl',
      desktop: 'lg:text-7xl xl:text-8xl',
    },
    h2: {
      mobile: 'text-3xl sm:text-4xl',
      tablet: 'md:text-5xl',
      desktop: 'lg:text-6xl',
    },
    h3: {
      mobile: 'text-xl sm:text-2xl',
      tablet: 'md:text-3xl',
      desktop: 'lg:text-4xl',
    },
    body: {
      mobile: 'text-base',
      tablet: 'md:text-lg',
      desktop: 'lg:text-xl',
    },
  } as const;
  