import { Link } from "react-router-dom";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { CompanyAuthMarketingPanel } from "@/components/auth/CompanyAuthMarketingPanel";
import { AuthCard } from "@/components/auth/AuthCard";
import { GoogleAuthButtonPro } from "@/components/auth/GoogleAuthButtonPro";
import { OrDivider } from "@/components/auth/OrDivider";
import { LoginForm } from "@/components/auth/LoginForm";

export const LoginPage = () => {
  const handleGoogle = () => {
    // TODO: google auth logic
  };

  return (
    <AuthSplitLayout
      left={<CompanyAuthMarketingPanel />}
      right={
        // ✅ Using AuthCard to maintain the "No Shadow, No Border" clean look
        <AuthCard
          title="Welcome back"
          subtitle="Log in to manage jobs, applicants, and your pipeline."
        >
          {/* Google Login Section */}
          <GoogleAuthButtonPro 
            label="Log in with Google" 
            onClick={handleGoogle} 
          />

          {/* Using the standardized OrDivider component */}
          <OrDivider text="or Log in with Email" />

          {/* Your LoginForm component */}
          <div className="mt-2">
             <LoginForm />
          </div>

          {/* Footer Link - Standardized with SignupPage style */}
          <p className="mt-8 text-center text-sm font-semibold text-gray-900">
            New to BridgeHub?{" "}
            <Link 
              className="underline text-primary-600 hover:text-primary-700 transition-colors" 
              to="/signup"
            >
              Create an account
            </Link>
          </p>
        </AuthCard>
      }
    />
  );
};
