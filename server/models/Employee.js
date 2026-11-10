const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
      minlength: [2, "Employee name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^[0-9+\-\s()]{7,20}$/,
        "Please provide a valid phone number",
      ],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.index({ employeeName: "text", email: "text", department: "text" });

module.exports = mongoose.model("Employee", employeeSchema);
