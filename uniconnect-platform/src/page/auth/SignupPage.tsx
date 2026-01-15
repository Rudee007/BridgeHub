import { Link } from "react-router-dom";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { CompanyAuthMarketingPanel } from "@/components/auth/CompanyAuthMarketingPanel";
import { AuthCard } from "@/components/auth/AuthCard";
import { GoogleAuthButtonPro } from "@/components/auth/GoogleAuthButtonPro";
import { OrDivider } from "@/components/auth/OrDivider";
import { inputBase } from "@/components/auth/inputBase";

export const SignupPage = () => {
  const handleGoogle = () => {
    // TODO: google auth
  };

  return (
    <AuthSplitLayout
      left={<CompanyAuthMarketingPanel />}
      right={
        <AuthCard
          title="Create Account"
          subtitle="Where fast-growing teams hire top university talent"
        >
          <GoogleAuthButtonPro label="Sign up with Google" onClick={handleGoogle} />

          <OrDivider text="or Sign up with Email" />

          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Full Name
              </label>
              <input 
                className={inputBase} 
                placeholder="enter text" 
                type="text"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Work Email
              </label>
              <input 
                className={inputBase} 
                placeholder="mail@website.com" 
                type="email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Password
              </label>
              <input 
                className={inputBase} 
                placeholder="min 12 characters" 
                type="password"
              />
            </div>

            <button
              className="mt-2 w-full rounded-lg bg-gray-900 px-4 py-3.5 text-sm font-semibold text-white
                         hover:bg-gray-800 transition-all focus:outline-none focus:ring-4 focus:ring-primary-100"
              type="submit"
            >
              Sign Up
            </button>

            <p className="pt-3 text-center text-xs text-gray-500">
              By continuing you accept our standard{" "}
              <a className="underline hover:text-gray-700" href="/terms">
                terms and conditions
              </a>{" "}
              and our{" "}
              <a className="underline hover:text-gray-700" href="/privacy">
                privacy policy
              </a>.
            </p>

            <p className="pt-2 text-center text-sm font-semibold text-gray-900">
              Already have an account?{" "}
              <Link className="underline hover:text-gray-700" to="/login">
                Log in
              </Link>
            </p>
          </form>
        </AuthCard>
      }
    />
  );
};
