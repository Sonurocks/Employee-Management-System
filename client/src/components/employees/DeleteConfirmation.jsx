import React from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { AlertTriangle } from "lucide-react";

export const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  employee = null,
  isDeleting = false,
}) => {
  if (!employee) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">Delete Employee</h3>
          <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone.</p>
        </div>
      </div>

      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm mb-6">
        <p className="text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">
            {employee.employeeName}
          </span>
          ? All associated records will be removed.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          loading={isDeleting}
        >
          Delete Employee
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;

