import React from "react";
import { Eye, Edit2, Trash2, Mail, Phone, Calendar, UserX } from "lucide-react";
import EmptyState from "../common/EmptyState";

const departmentColors = {
  Engineering: "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Human Resources": "bg-pink-50 text-pink-700 border-pink-200",
  Marketing: "bg-amber-50 text-amber-700 border-amber-200",
  Design: "bg-purple-50 text-purple-700 border-purple-200",
  Finance: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Sales: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Operations: "bg-orange-50 text-orange-700 border-orange-200",
  Product: "bg-blue-50 text-blue-700 border-blue-200",
  Legal: "bg-slate-50 text-slate-700 border-slate-200",
};

const getInitials = (name) => {
  if (!name) return "EM";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const EmployeeTable = ({
  employees = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-20 hidden md:block" />
              <div className="h-4 bg-gray-200 rounded w-24 hidden lg:block" />
              <div className="h-4 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <EmptyState
        icon={UserX}
        title="No employees found"
        description="Try adjusting your search or filter to find what you're looking for."
      />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-3.5 px-4 sm:px-6">Employee</th>
              <th className="py-3.5 px-4">Department & Role</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Phone</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Joining Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right sm:pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {employees.map((emp) => {
              const deptStyle =
                departmentColors[emp.department] ||
                "bg-gray-100 text-gray-700 border-gray-200";
              const isActive = emp.status === "Active";

              return (
                <tr
                  key={emp._id}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-white shadow-xs">
                        {getInitials(emp.employeeName)}
                      </div>
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => onView(emp)}
                          className="font-semibold text-gray-900 hover:text-indigo-600 truncate text-left transition-colors"
                        >
                          {emp.employeeName}
                        </button>
                        <div className="text-xs text-gray-500 flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                          <span className="truncate">{emp.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${deptStyle}`}
                      >
                        {emp.department}
                      </span>
                      <span className="text-xs text-gray-600 truncate max-w-[160px]">
                        {emp.designation}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{emp.phoneNumber}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{formatDate(emp.joiningDate)}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      />
                      {emp.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right sm:pr-6">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onView(emp)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(emp)}
                        className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Employee"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(emp)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
