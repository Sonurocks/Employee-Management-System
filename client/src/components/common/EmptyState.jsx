import React from "react";
import { FolderX } from "lucide-react";

export const EmptyState = ({
  icon: Icon = FolderX,
  title = "No data found",
  description = "There are no records matching your request.",
  action = null,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-gray-100 shadow-xs">
      <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 text-gray-400 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;

