import React from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Mail, Phone, Building2, Briefcase, Calendar, ShieldCheck, Clock, Edit2 } from "lucide-react";

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
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const EmployeeDetails = ({
  isOpen,
  onClose,
  employee,
  onEdit,
}) => {
  if (!employee) return null;

  const isActive = employee.status === "Active";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="-mt-6 -mx-6 mb-6 h-24 bg-gradient-to-r from-indigo-600 to-indigo-800" />

      <div className="-mt-14 mb-5 flex items-end justify-between">
        <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md ring-1 ring-gray-100">
          <div className="w-full h-full rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
            {getInitials(employee.employeeName)}
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isActive
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-gray-100 text-gray-600 border-gray-200"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isActive ? "bg-emerald-500" : "bg-gray-400"
            }`}
          />
          {employee.status}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">{employee.employeeName}</h2>
        <p className="text-sm font-medium text-indigo-600">{employee.designation}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>Email Address</span>
          </div>
          <p className="text-sm font-semibold text-gray-800 truncate" title={employee.email}>
            {employee.email}
          </p>
        </div>

        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>Phone Number</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{employee.phoneNumber}</p>
        </div>

        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
            <Building2 className="w-4 h-4 text-gray-400" />
            <span>Department</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{employee.department}</p>
        </div>

        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span>Designation</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{employee.designation}</p>
        </div>

        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Joining Date</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">
            {formatDate(employee.joiningDate)}
          </p>
        </div>

        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span>Status</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{employee.status}</p>
        </div>
      </div>

      {employee.createdAt && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Created {formatDate(employee.createdAt)}
          </span>
          <span>ID: {employee._id}</span>
        </div>
      )}

      <div className="mt-6 flex items-center justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {onEdit && (
          <Button
            onClick={() => {
              onClose();
              onEdit(employee);
            }}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Employee
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default EmployeeDetails;
