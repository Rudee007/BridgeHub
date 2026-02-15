import { Link } from "react-router-dom";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { UniAuthMarketingPanel } from "@/components/auth/UniAuthMarketingPanel";
import { AuthCard } from "@/components/auth/AuthCard";
import { GoogleAuthButtonPro } from "@/components/auth/GoogleAuthButtonPro";
import { OrDivider } from "@/components/auth/OrDivider";
import { inputBase } from "@/components/auth/inputBase";

export const UniSignupPage = () => {
  return (
    <AuthSplitLayout
      left={<UniAuthMarketingPanel />}
      right={
        <AuthCard
          title="Register Your Institute"
          subtitle="Join the network of modern universities transforming campus placements."
        >
          <GoogleAuthButtonPro label="Sign up with Institute Google ID" onClick={() => {}} />

          <OrDivider text="or Register with Email" />

          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">Official Representative Name</label>
              <input className={inputBase} placeholder="e.g. Dr. John Doe" type="text" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">University Email (.edu)</label>
              <input className={inputBase} placeholder="tpo@university.edu" type="email" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">Create Password</label>
              <input className={inputBase} placeholder="min 12 characters" type="password" />
            </div>

            <button
              className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition-all focus:ring-4 focus:ring-blue-100"
              type="submit"
            >
              Register Institute
            </button>

            <p className="pt-2 text-center text-sm font-semibold text-gray-900">
              Already registered?{" "}
              <Link className="underline hover:text-gray-700" to="/auth/university/login">
                Log in to Portal
              </Link>
            </p>
          </form>
        </AuthCard>
      }
    />
  );
};