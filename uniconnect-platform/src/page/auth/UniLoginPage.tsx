import { Link, useNavigate } from "react-router-dom";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { UniAuthMarketingPanel } from "@/components/auth/UniAuthMarketingPanel";
import { AuthCard } from "@/components/auth/AuthCard";
import { GoogleAuthButtonPro } from "@/components/auth/GoogleAuthButtonPro";
import { OrDivider } from "@/components/auth/OrDivider";

export const UniLoginPage = () => {
  const navigate = useNavigate();

  // ✅ Force routing to the University Dashboard
  const handleLogin = (e: React.FormEvent) => {
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
          title="University Portal Login"
          subtitle="Log in to manage students, approve applications, and track placements."
        >
          <div className="flex flex-col h-full">
            <GoogleAuthButtonPro 
              label="Log in with Institute ID" 
              onClick={handleGoogle} 
            />

            <OrDivider text="or log in with email" />

            {/* Adjusted vertical spacing (space-y-4 instead of 5, py-3 instead of 3.5) */}
            <form onSubmit={handleLogin} className="space-y-4 mt-3">
              <div>
                <label className="mb-1.5 block text-[12px] font-bold text-gray-600 uppercase tracking-wider pl-1">
                  University Email
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="tpo@institute.edu.in" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm placeholder:text-gray-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 pl-1 pr-1">
                  <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot?
                  </a>
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm placeholder:text-gray-400"
                />
              </div>

              {/* Reduced margin top to mt-4 */}
              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-[14px] font-bold text-white hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Sign In to Portal
              </button>

              {/* Added pb-2 to ensure it doesn't get cut off at the very bottom edge */}
              <p className="pt-3 pb-2 text-center text-[13px] font-medium text-gray-500">
                Don't have an institute account?{" "}
                <Link 
                  className="font-bold text-blue-600 hover:text-blue-700 transition-colors" 
                  to="/auth/university/signup"
                >
                  Register your campus
                </Link>
              </p>
            </form>
          </div>
        </AuthCard>
      }
    />
  );
};