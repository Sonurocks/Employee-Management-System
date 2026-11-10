import React from "react";
import { Loader2 } from "lucide-react";

export const Spinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };
  return <Loader2 className={`animate-spin text-indigo-600 ${sizes[size] || sizes.md} ${className}`} />;
};

export const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin mb-4" />
      <p className="text-sm font-medium text-gray-500">{message}</p>
    </div>
  );
};

export default Loader;
