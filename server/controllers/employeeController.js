const mongoose = require("mongoose");
const Employee = require("../models/Employee");

const getAllEmployees = async (req, res, next) => {
  try {
    const {
      search,
      status,
      department,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const filter = {};

    if (search) {
      const searchRegex = new RegExp(search, "i");
      filter.$or = [
        { employeeName: searchRegex },
        { email: searchRegex },
        { department: searchRegex },
      ];
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    if (department && department !== "All") {
      filter.department = department;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [employees, total] = await Promise.all([
      Employee.find(filter).sort(sort).skip(skip).limit(limitNum),
      Employee.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: employees,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID format",
        errors: ["Invalid employee ID format"],
      });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
        errors: ["Employee not found"],
      });
    }

    res.json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const existingEmployee = await Employee.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "An employee with this email already exists",
        errors: ["An employee with this email already exists"],
      });
    }

    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID format",
        errors: ["Invalid employee ID format"],
      });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
        errors: ["Employee not found"],
      });
    }

    if (req.body.email && req.body.email.toLowerCase() !== employee.email) {
      const existingEmployee = await Employee.findOne({
        email: req.body.email.toLowerCase(),
      });
      if (existingEmployee) {
        return res.status(409).json({
          success: false,
          message: "An employee with this email already exists",
          errors: ["An employee with this email already exists"],
        });
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID format",
        errors: ["Invalid employee ID format"],
      });
    }

    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
        errors: ["Employee not found"],
      });
    }

    res.json({
      success: true,
      message: "Employee deleted successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const getEmployeeStats = async (req, res, next) => {
  try {
    const [totalEmployees, activeEmployees, inactiveEmployees, departments] =
      await Promise.all([
        Employee.countDocuments(),
        Employee.countDocuments({ status: "Active" }),
        Employee.countDocuments({ status: "Inactive" }),
        Employee.distinct("department"),
      ]);

    res.json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        totalDepartments: departments.length,
        departments,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
};
