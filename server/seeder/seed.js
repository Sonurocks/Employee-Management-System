const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Employee = require("../models/Employee");

dotenv.config();

const sampleEmployees = [
  {
    employeeName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phoneNumber: "+91 98765 43210",
    department: "Engineering",
    designation: "Senior Full Stack Developer",
    joiningDate: new Date("2022-03-15"),
    status: "Active",
  },
  {
    employeeName: "Priya Patel",
    email: "priya.patel@example.com",
    phoneNumber: "+91 98123 45678",
    department: "Human Resources",
    designation: "HR Lead",
    joiningDate: new Date("2021-08-01"),
    status: "Active",
  },
  {
    employeeName: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phoneNumber: "+91 97654 32109",
    department: "Marketing",
    designation: "Digital Marketing Strategist",
    joiningDate: new Date("2023-01-10"),
    status: "Active",
  },
  {
    employeeName: "Ananya Verma",
    email: "ananya.verma@example.com",
    phoneNumber: "+91 99887 76655",
    department: "Design",
    designation: "UI/UX Designer",
    joiningDate: new Date("2022-11-20"),
    status: "Active",
  },
  {
    employeeName: "Vikram Singh",
    email: "vikram.singh@example.com",
    phoneNumber: "+91 91234 56789",
    department: "Engineering",
    designation: "Backend Architect",
    joiningDate: new Date("2020-06-01"),
    status: "Active",
  },
  {
    employeeName: "Neha Kapoor",
    email: "neha.kapoor@example.com",
    phoneNumber: "+91 98321 09876",
    department: "Finance",
    designation: "Financial Analyst",
    joiningDate: new Date("2023-04-12"),
    status: "Inactive",
  },
  {
    employeeName: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    phoneNumber: "+91 95432 10987",
    department: "Sales",
    designation: "Sales Executive",
    joiningDate: new Date("2023-09-01"),
    status: "Active",
  },
  {
    employeeName: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    phoneNumber: "+91 94567 89012",
    department: "Engineering",
    designation: "QA Engineer",
    joiningDate: new Date("2022-07-18"),
    status: "Active",
  },
  {
    employeeName: "Aditya Joshi",
    email: "aditya.joshi@example.com",
    phoneNumber: "+91 96789 01234",
    department: "Operations",
    designation: "Operations Coordinator",
    joiningDate: new Date("2021-12-05"),
    status: "Inactive",
  },
  {
    employeeName: "Tanvi Nair",
    email: "tanvi.nair@example.com",
    phoneNumber: "+91 93456 78901",
    department: "Design",
    designation: "Product Designer",
    joiningDate: new Date("2024-02-01"),
    status: "Active",
  },
];

const seedData = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bmdu_employee_db";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    await Employee.deleteMany();
    console.log("Cleared existing employee records.");

    await Employee.insertMany(sampleEmployees);
    console.log(`Successfully seeded ${sampleEmployees.length} employee records.`);

    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
