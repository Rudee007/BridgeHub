import { FadeIn } from '../react-bits/FadeIn';
import { TestimonialCard } from '../ui/Card';

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
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="section-spacing bg-gray-50">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold text-primary-600 mb-3">TESTIMONIALS</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              From Our Users
            </h2>
          </div>
        </FadeIn>

        {/* Mobile: Single column with scroll snap */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-6 pb-4 snap-x snap-mandatory">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center">
                <FadeIn delay={0.1 * index}>
                  <TestimonialCard
                    quote={testimonial.quote}
                    author={testimonial.author}
                    role={testimonial.role}
                    company={testimonial.company}
                  />
                </FadeIn>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
              />
            </FadeIn>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="lg:hidden flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300"
              aria-label={`Testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
