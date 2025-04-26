import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Format for RTL display
export const formatPhoneNumber = (phone: string): string => {
  return phone;
};

// Format date to Persian date (simplified version)
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fa-IR').format(date);
};

// Debounce function for search
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => func(...args), waitFor);
  };
}
