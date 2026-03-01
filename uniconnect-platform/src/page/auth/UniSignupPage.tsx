import { Link, useNavigate } from "react-router-dom";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { UniAuthMarketingPanel } from "@/components/auth/UniAuthMarketingPanel";
import { AuthCard } from "@/components/auth/AuthCard";
import { GoogleAuthButtonPro } from "@/components/auth/GoogleAuthButtonPro";
import { OrDivider } from "@/components/auth/OrDivider";

export const UniSignupPage = () => {
  const navigate = useNavigate();

  // ✅ Force routing to the University Dashboard
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/university/dashboard"); 
  };

  const handleGoogle = () => {
    navigate("/university/dashboard");
  };

  return (
    <AuthSplitLayout
      left={<UniAuthMarketingPanel />}
      right={
        <AuthCard
          title="Register Your Institute"
          subtitle="Join the network of modern universities transforming campus placements."
        >
          <GoogleAuthButtonPro 
            label="Sign up with Institute Google ID" 
            onClick={handleGoogle} 
          />

          <OrDivider text="or register with email" />

          {/* Premium Custom Form Layout */}
          <form onSubmit={handleSignup} className="space-y-5 mt-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-bold text-gray-600 uppercase tracking-wider pl-1">
                Official Representative Name
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. Dr. Rajesh Kumar" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-bold text-gray-600 uppercase tracking-wider pl-1">
                University Email (.edu / .ac.in)
              </label>
              <input 
                type="email" 
                required
                placeholder="tpo@university.ac.in" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-bold text-gray-600 uppercase tracking-wider pl-1">
                Create Password
              </label>
              <input 
                type="password" 
                required
                placeholder="Minimum 12 characters" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3.5 text-[14px] font-bold text-white hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Register Institute
            </button>

            <p className="pt-4 text-center text-[14px] font-medium text-gray-500">
              Already registered?{" "}
              <Link 
                className="font-bold text-blue-600 hover:text-blue-700 transition-colors" 
                to="/auth/university/login"
              >
                Log in to Portal
              </Link>
            </p>
          </form>
        </AuthCard>
      }
    />
  );
};