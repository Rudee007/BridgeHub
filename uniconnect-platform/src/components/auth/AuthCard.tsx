import { type ReactNode } from "react";

export const AuthCard = ({
  brand = "BridgeHub",
  title,
  subtitle,
  children,
}: {
  brand?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="mb-4 text-center">
        <p className="text-sm font-semibold tracking-wide text-gray-900">{brand}:</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-sm text-gray-600">{subtitle}</p>
        )}
      </div>

      {/* ✅ COMPLETELY FLAT - No shadow, no border, nothing */}
      <div className="bg-white">
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
};
