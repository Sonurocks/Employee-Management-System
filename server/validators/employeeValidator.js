const { z } = require("zod");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

const createEmployeeSchema = z.object({
  employeeName: z
    .string({ required_error: "Employee name is required" })
    .trim()
    .min(2, "Employee name must be at least 2 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .regex(emailRegex, "Please provide a valid email address"),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .regex(phoneRegex, "Please provide a valid phone number (7-20 characters)"),
  department: z
    .string({ required_error: "Department is required" })
    .trim()
    .min(1, "Department is required"),
  designation: z
    .string({ required_error: "Designation is required" })
    .trim()
    .min(1, "Designation is required"),
  joiningDate: z
    .string({ required_error: "Joining date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Please provide a valid date",
    })
    .transform((val) => new Date(val)),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

const updateEmployeeSchema = z
  .object({
    employeeName: z
      .string()
      .trim()
      .min(2, "Employee name must be at least 2 characters")
      .optional(),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .regex(emailRegex, "Please provide a valid email address")
      .optional(),
    phoneNumber: z
      .string()
      .trim()
      .regex(phoneRegex, "Please provide a valid phone number (7-20 characters)")
      .optional(),
    department: z.string().trim().min(1, "Department is required").optional(),
    designation: z.string().trim().min(1, "Designation is required").optional(),
    joiningDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Please provide a valid date",
      })
      .transform((val) => new Date(val))
      .optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

module.exports = { createEmployeeSchema, updateEmployeeSchema };
