import React from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm",
  secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 shadow-sm",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400",
};

const sizes = {
  sm: "px-2.5 py-1.5 text-xs font-medium rounded-md",
  md: "px-3.5 py-2 text-sm font-medium rounded-lg",
  lg: "px-4 py-2.5 text-base font-medium rounded-lg",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
