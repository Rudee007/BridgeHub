import { Mail, User, Lock, Search, ArrowRight, Heart, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, FeatureCard, TestimonialCard, StatCard } from '../ui/Card';
import { Input } from '../ui/Input';
import { FadeIn } from '../react-bits/FadeIn';

export const ComponentShowcase = () => {
  return (
    <section className="section-spacing bg-gray-50">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Component Library</h2>
            <p className="text-xl text-gray-600">Phase 3: Design System Components</p>
          </div>
        </FadeIn>

        {/* Buttons */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8">Buttons (4 Variants)</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" icon={<ArrowRight size={20} />} iconPosition="right">
              Primary Button
            </Button>
            <Button variant="secondary" icon={<Star size={20} />}>
              Secondary Button
            </Button>
            <Button variant="tertiary">
              Tertiary Button
            </Button>
            <Button variant="icon" icon={<Heart size={20} />} />
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <Button variant="primary" size="sm">Small Primary</Button>
            <Button variant="primary" size="md">Medium Primary</Button>
            <Button variant="primary" size="lg">Large Primary</Button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8">Cards (3 Types)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <FeatureCard
              icon={<Star className="text-white" size={32} />}
              title="Feature Card"
              description="Glass morphism with border and hover lift effect"
              stat="10K+ Users"
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Heart className="text-white" size={32} />}
              title="Another Feature"
              description="Animated icon rotation on hover"
              stat="95% Rating"
              gradient="from-violet-500 to-purple-500"
            />
            <FeatureCard
              icon={<Star className="text-white" size={32} />}
              title="Third Feature"
              description="Smooth animations and transitions"
              stat="24/7 Support"
              gradient="from-pink-500 to-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <TestimonialCard
              quote="This is an amazing testimonial card with left accent border and clean design."
              author="John Doe"
              role="CEO"
              company="TechCorp"
            />
            <TestimonialCard
              quote="The component library is incredibly well-designed and easy to use!"
              author="Jane Smith"
              role="Designer"
              company="CreativeHub"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              value={500}
              suffix="+"
              label="Companies"
              subtext="Active partners"
              gradient="from-blue-500 to-cyan-500"
            />
            <StatCard
              value={200}
              suffix="+"
              label="Universities"
              subtext="Worldwide"
              gradient="from-violet-500 to-purple-500"
            />
            <StatCard
              value={50}
              suffix="K+"
              label="Students"
              subtext="Placed"
              gradient="from-pink-500 to-rose-500"
            />
            <StatCard
              value={98}
              suffix="%"
              label="Satisfaction"
              subtext="Rate"
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        </div>

        {/* Input Fields */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8">Input Fields</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Input
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              icon={<Mail size={20} />}
              iconPosition="left"
            />
            <Input
              label="Full Name"
              placeholder="Enter your name"
              icon={<User size={20} />}
              iconPosition="left"
            />
            <Input
              label="Password"
              placeholder="Enter password"
              type="password"
              icon={<Lock size={20} />}
              iconPosition="left"
            />
            <Input
              label="Search"
              placeholder="Search anything..."
              icon={<Search size={20} />}
              iconPosition="right"
            />
            <Input
              label="Success State"
              value="validated@email.com"
              success="Email is valid!"
              icon={<Mail size={20} />}
            />
            <Input
              label="Error State"
              value="invalid-email"
              error="Please enter a valid email"
              icon={<Mail size={20} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
