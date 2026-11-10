import React, { useState, useEffect, useCallback, useRef } from "react";
import { Plus, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "../components/common/Button";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeDetails from "../components/employees/EmployeeDetails";
import DeleteConfirmation from "../components/employees/DeleteConfirmation";
import { employeeService } from "../services/employeeService";

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    department: "All",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formEmployee, setFormEmployee] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsEmployee, setDetailsEmployee] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteEmployeeData, setDeleteEmployeeData] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const debounceTimer = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };

      if (filters.search) params.search = filters.search;
      if (filters.status && filters.status !== "All") params.status = filters.status;
      if (filters.department && filters.department !== "All") params.department = filters.department;

      const res = await employeeService.getEmployees(params);
      if (res.success) {
        setEmployees(res.data || []);
        if (res.pagination) {
          setPagination((prev) => ({
            ...prev,
            total: res.pagination.total || 0,
            pages: res.pagination.pages || 1,
          }));
        }
      }
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  const fetchDepartments = async () => {
    try {
      const res = await employeeService.getEmployeeStats();
      if (res.success && res.data && res.data.departments) {
        setDepartments(res.data.departments);
      }
    } catch {
      // Ignore if stats fail initially
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      fetchEmployees();
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [fetchEmployees]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleOpenAdd = () => {
    setFormEmployee(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setFormEmployee(emp);
    setIsFormOpen(true);
  };

  const handleOpenView = (emp) => {
    setDetailsEmployee(emp);
    setIsDetailsOpen(true);
  };

  const handleOpenDelete = (emp) => {
    setDeleteEmployeeData(emp);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (formEmployee) {
        await employeeService.updateEmployee(formEmployee._id, formData);
        showToast("Employee updated successfully", "success");
      } else {
        await employeeService.createEmployee(formData);
        showToast("Employee created successfully", "success");
      }
      setIsFormOpen(false);
      setFormEmployee(null);
      fetchEmployees();
      fetchDepartments();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteEmployeeData) return;
    setIsDeleting(true);
    try {
      await employeeService.deleteEmployee(deleteEmployeeData._id);
      showToast("Employee deleted successfully", "success");
      setIsDeleteOpen(false);
      setDeleteEmployeeData(null);

      if (employees.length === 1 && pagination.page > 1) {
        setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
      } else {
        fetchEmployees();
      }
      fetchDepartments();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const startRecord = (pagination.page - 1) * pagination.limit + 1;
  const endRecord = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Employees
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your team members and their account permissions
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <EmployeeFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        departments={departments}
      />

      <EmployeeTable
        employees={employees}
        loading={loading}
        onView={handleOpenView}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {pagination.pages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-xs">
          <div className="text-xs text-gray-500">
            Showing <span className="font-semibold text-gray-700">{startRecord}</span> to{" "}
            <span className="font-semibold text-gray-700">{endRecord}</span> of{" "}
            <span className="font-semibold text-gray-700">{pagination.total}</span> records
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page <= 1}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-semibold text-gray-700 px-2">
              Page {pagination.page} of {pagination.pages}
            </span>

            <button
              type="button"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= pagination.pages}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <EmployeeForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setFormEmployee(null);
        }}
        onSubmit={handleFormSubmit}
        employee={formEmployee}
        isSubmitting={isSubmitting}
      />

      <EmployeeDetails
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setDetailsEmployee(null);
        }}
        employee={detailsEmployee}
        onEdit={(emp) => handleOpenEdit(emp)}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeleteEmployeeData(null);
        }}
        onConfirm={handleDeleteConfirm}
        employee={deleteEmployeeData}
        isDeleting={isDeleting}
      />

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4 animate-in slide-in-from-bottom-4 duration-200">
          <div
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg bg-white ${
              toast.type === "error"
                ? "border-red-200 shadow-red-50 text-red-900"
                : "border-emerald-200 shadow-emerald-50 text-emerald-900"
            }`}
          >
            {toast.type === "error" ? (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-sm font-medium">{toast.message}</div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
