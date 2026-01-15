// src/utils/smoothScroll.ts

export const smoothScrollToSection = (sectionId: string) => {
    // Remove the # if present
    const id = sectionId.replace('#', '');
    
    // Find the target element
    const element = document.getElementById(id);
    
    if (!element) {
      console.warn(`Section with id "${id}" not found`);
      return;
    }
  
    // Get navbar height (adjust if needed)
    const navbarHeight = 80; // 20px for h-20 (5rem = 80px)
    
    // Calculate position with offset
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
  
    // Smooth scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  