import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { User, Mail, Phone, Building2, Briefcase, Calendar, AlertCircle } from "lucide-react";

const departmentOptions = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Design",
  "Finance",
  "Sales",
  "Operations",
  "Product",
  "Legal",
];

const employeeSchema = z.object({
  employeeName: z
    .string()
    .min(2, "Employee name must be at least 2 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  phoneNumber: z
    .string()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Please enter a valid phone number (7-20 digits)"),
  department: z.string().min(1, "Please select a department"),
  designation: z.string().min(1, "Designation is required").trim(),
  joiningDate: z.string().min(1, "Joining date is required"),
  status: z.enum(["Active", "Inactive"]),
});

export const EmployeeForm = ({
  isOpen,
  onClose,
  onSubmit,
  employee = null,
  isSubmitting = false,
}) => {
  const isEdit = Boolean(employee);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employeeName: "",
      email: "",
      phoneNumber: "",
      department: "Engineering",
      designation: "",
      joiningDate: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (employee) {
      let formattedDate = "";
      if (employee.joiningDate) {
        const d = new Date(employee.joiningDate);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toISOString().split("T")[0];
        }
      }
      reset({
        employeeName: employee.employeeName || "",
        email: employee.email || "",
        phoneNumber: employee.phoneNumber || "",
        department: employee.department || "Engineering",
        designation: employee.designation || "",
        joiningDate: formattedDate,
        status: employee.status || "Active",
      });
    } else {
      reset({
        employeeName: "",
        email: "",
        phoneNumber: "",
        department: "Engineering",
        designation: "",
        joiningDate: "",
        status: "Active",
      });
    }
  }, [employee, isOpen, reset]);

  const onFormSubmit = async (data) => {
    await onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Employee" : "Add New Employee"}
      size="lg"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Employee Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              {...register("employeeName")}
              placeholder="e.g. John Doe"
              className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.employeeName
                  ? "border-red-300 focus:ring-red-500 bg-red-50/20"
                  : "border-gray-200 focus:ring-indigo-500"
              }`}
            />
          </div>
          {errors.employeeName && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.employeeName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                {...register("email")}
                placeholder="name@company.com"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-300 focus:ring-red-500 bg-red-50/20"
                    : "border-gray-200 focus:ring-indigo-500"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                {...register("phoneNumber")}
                placeholder="+91 98765 43210"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.phoneNumber
                    ? "border-red-300 focus:ring-red-500 bg-red-50/20"
                    : "border-gray-200 focus:ring-indigo-500"
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                {...register("department")}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            {errors.department && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.department.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Designation <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                {...register("designation")}
                placeholder="e.g. Senior Software Engineer"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.designation
                    ? "border-red-300 focus:ring-red-500 bg-red-50/20"
                    : "border-gray-200 focus:ring-indigo-500"
                }`}
              />
            </div>
            {errors.designation && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.designation.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Joining Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                {...register("joiningDate")}
                max={new Date().toISOString().split("T")[0]}
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.joiningDate
                    ? "border-red-300 focus:ring-red-500 bg-red-50/20"
                    : "border-gray-200 focus:ring-indigo-500"
                }`}
              />
            </div>
            {errors.joiningDate && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.joiningDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2 mt-0.5">
              <label className="flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-200 text-xs font-medium cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  value="Active"
                  {...register("status")}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active
              </label>
              <label className="flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-200 text-xs font-medium cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  value="Inactive"
                  {...register("status")}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                Inactive
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {isEdit ? "Update Employee" : "Add Employee"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeForm;

