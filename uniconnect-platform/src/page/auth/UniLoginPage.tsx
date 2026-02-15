import { Link } from "react-router-dom";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { UniAuthMarketingPanel } from "@/components/auth/UniAuthMarketingPanel"; // ✅ Uses Uni Panel
import { AuthCard } from "@/components/auth/AuthCard";
import { GoogleAuthButtonPro } from "@/components/auth/GoogleAuthButtonPro";
import { OrDivider } from "@/components/auth/OrDivider";
import { LoginForm } from "@/components/auth/LoginForm";

export const UniLoginPage = () => {
  const handleGoogle = () => {
    // TODO: Google Auth for Universities
  };

  return (
    <AuthSplitLayout
      left={<UniAuthMarketingPanel />}
      right={
        <AuthCard
          title="University Portal Login"
          subtitle="Log in to manage students, approve applications, and track placements."
        >
          <GoogleAuthButtonPro 
            label="Log in with Institute ID" 
            onClick={handleGoogle} 
          />

          <OrDivider text="or Log in with Email" />

          <div className="mt-2">
             <LoginForm />
          </div>

          <p className="mt-8 text-center text-sm font-semibold text-gray-900">
            Don't have an institute account?{" "}
            <Link 
              className="underline text-blue-600 hover:text-blue-700 transition-colors" 
              to="/auth/university/signup"
            >
              Register your campus
            </Link>
          </p>
        </AuthCard>
      }
    />
  );
};