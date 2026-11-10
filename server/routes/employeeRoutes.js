const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
} = require("../controllers/employeeController");
const validateRequest = require("../middleware/validateRequest");
const {
  createEmployeeSchema,
  updateEmployeeSchema,
} = require("../validators/employeeValidator");

router.get("/stats", getEmployeeStats);
router.get("/", getAllEmployees);
router.post("/", validateRequest(createEmployeeSchema), createEmployee);
router.get("/:id", getEmployeeById);
router.put("/:id", validateRequest(updateEmployeeSchema), updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
