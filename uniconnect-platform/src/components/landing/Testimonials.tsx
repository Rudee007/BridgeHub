import { Quote } from 'lucide-react';
import { FadeIn } from '../react-bits/FadeIn';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Half of the offers I give are sourced from BridgeHub. It's the best product for anyone looking for startup talent.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechCorp",
    color: 'from-pink-400/20 to-pink-500/20'
  },
  {
    quote: "I got my tech job through BridgeHub 4 years ago and I'm still happy! Great platform, unlimited opportunities.",
    author: "Michael Rodriguez",
    role: "Senior Developer",
    company: "Innovate Labs",
    color: 'from-blue-400/20 to-cyan-500/20'
  },
  {
    quote: "I love BridgeHub. I got my current job at a startup entirely through the site. Super easy to use and amazing UI.",
    author: "Priya Sharma",
    role: "Product Manager",
    company: "StartupXYZ",
    color: 'from-violet-400/20 to-purple-500/20'
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="section-spacing bg-gray-50">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 mb-3">TESTIMONIALS</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              From Our Users
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center mb-6`}>
                  <Quote className="text-primary-600" size={28} />
                </div>
                
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-primary-600 font-medium">{testimonial.company}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
