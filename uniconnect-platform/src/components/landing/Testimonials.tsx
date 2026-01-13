import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { FadeIn } from '../react-bits/FadeIn';

const testimonials = [
  {
    quote: "Half of the offers I give are sourced from BridgeHub. It's the best product for anyone looking for startup talent.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechCorp",
  },
  {
    quote: "I got my tech job through BridgeHub 4 years ago and I'm still happy! Great platform, unlimited opportunities.",
    author: "Michael Rodriguez",
    role: "Senior Developer",
    company: "Innovate Labs",
  },
  {
    quote: "I love BridgeHub. I got my current job at a startup entirely through the site. Super easy to use and amazing UI.",
    author: "Priya Sharma",
    role: "Product Manager",
    company: "StartupXYZ",
  },
  {
    quote: "The platform connects students with real-world projects seamlessly. Our hiring process has never been easier.",
    author: "David Kumar",
    role: "Hiring Manager",
    company: "Global Tech Inc",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      items.push({
        ...testimonials[index],
        key: `${index}-${currentIndex}`,
        position: i,
      });
    }
    return items;
  };

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="relative py-20 md:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Quotes
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                From our users
              </h2>
            </div>

            {/* Navigation Arrows - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl bg-[#FCF4F6] border border-pink-100 flex items-center justify-center hover:border-pink-200 hover:shadow-md transition-all duration-300 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl bg-[#FCF4F6] border border-pink-100 flex items-center justify-center hover:border-pink-200 hover:shadow-md transition-all duration-300 group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              </motion.button>
            </div>
          </div>
        </FadeIn>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop: 3-column grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-6">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                {getVisibleTestimonials().map((testimonial) => (
                  <motion.div
                    key={testimonial.key}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { 
                        type: 'tween',
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      },
                      opacity: { 
                        duration: 0.8,
                        ease: 'easeInOut'
                      },
                      layout: {
                        type: 'tween',
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    }}
                    layout
                  >
                    <div className="relative bg-[#FCF4F6] rounded-3xl p-8 shadow-sm border border-pink-100/50 hover:shadow-xl hover:border-pink-200 transition-all duration-300 h-full flex flex-col group">
                      {/* Quote Icon */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-50 flex items-center justify-center mb-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Quote className="w-7 h-7 text-primary-600 fill-primary-600" />
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="pt-4 border-t border-pink-100">
                        <p className="font-semibold text-gray-900 mb-1">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Tablet: 2-column grid */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-6">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                {getVisibleTestimonials().slice(0, 2).map((testimonial) => (
                  <motion.div
                    key={testimonial.key}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { 
                        type: 'tween',
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      },
                      opacity: { 
                        duration: 0.8,
                        ease: 'easeInOut'
                      },
                      layout: {
                        type: 'tween',
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    }}
                    layout
                  >
                    <div className="relative bg-[#FCF4F6] rounded-3xl p-8 shadow-sm border border-pink-100/50 hover:shadow-xl hover:border-pink-200 transition-all duration-300 h-full flex flex-col group">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-50 flex items-center justify-center mb-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Quote className="w-7 h-7 text-primary-600 fill-primary-600" />
                      </div>
                      <blockquote className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="pt-4 border-t border-pink-100">
                        <p className="font-semibold text-gray-900 mb-1">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: Single card */}
          <div className="md:hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { 
                    type: 'tween',
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  },
                  opacity: { 
                    duration: 0.8,
                    ease: 'easeInOut'
                  },
                }}
              >
                <div className="relative bg-[#FCF4F6] rounded-3xl p-8 shadow-sm border border-pink-100/50 h-full flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-50 flex items-center justify-center mb-6 flex-shrink-0">
                    <Quote className="w-7 h-7 text-primary-600 fill-primary-600" />
                  </div>
                  <blockquote className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  <div className="pt-4 border-t border-pink-100">
                    <p className="font-semibold text-gray-900 mb-1">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-8">
            <motion.button
              onClick={handlePrev}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl bg-[#FCF4F6] border border-pink-100 flex items-center justify-center active:bg-pink-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl bg-[#FCF4F6] border border-pink-100 flex items-center justify-center active:bg-pink-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
