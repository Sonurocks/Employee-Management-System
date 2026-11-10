import React from "react";
import { Search, RotateCcw, X, Filter } from "lucide-react";

export const EmployeeFilters = ({
  filters,
  onFilterChange,
  departments = [],
}) => {
  const hasActiveFilters = Boolean(
    filters.search ||
      (filters.status && filters.status !== "All") ||
      (filters.department && filters.department !== "All")
  );

  const handleClear = () => {
    onFilterChange({
      search: "",
      status: "All",
      department: "All",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs space-y-3">
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            placeholder="Search by employee name, email, or department..."
            className="w-full pl-10 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="min-w-[130px]">
            <select
              value={filters.status || "All"}
              onChange={(e) =>
                onFilterChange({ ...filters, status: e.target.value })
              }
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="min-w-[160px]">
            <select
              value={filters.department || "All"}
              onChange={(e) =>
                onFilterChange({ ...filters, department: e.target.value })
              }
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              <option value="All">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilters;
