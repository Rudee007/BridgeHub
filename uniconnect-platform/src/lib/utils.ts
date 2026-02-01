// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes intelligently.
 * * @param inputs - List of class names, objects, or arrays
 * @returns A merged string of class names
 * * Example:
 * cn("px-2 py-1", "p-4") -> "p-4" (handles conflicts correctly)
 * cn("text-red-500", condition && "bg-blue-500") -> handles conditionals
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Helper to format currency numbers
 */
export function formatCurrency(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Helper to format large numbers (e.g., 1200 -> 1.2k)
 */
export function formatCompactNumber(number: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}