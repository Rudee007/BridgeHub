import { ArrowRight, CheckCircle } from 'lucide-react';
import { FadeIn } from '../react-bits/FadeIn';
import { Button } from '../ui/Button';

export const CTA = () => {
  return (
    <section className="section-spacing bg-white relative overflow-hidden border-t border-gray-200">
      <div className="absolute inset-0 bg-animated-gradient opacity-5" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="glass p-12 md:p-16 rounded-3xl text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Ready to Transform <span className="gradient-text">Education</span>?
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join the future of university-industry collaboration. Get started in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                >
                  Get Started Free
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                >
                  Schedule a Demo
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <CheckCircle size={16} className="text-success" />
                <span>No credit card required • Setup in 5 minutes</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
