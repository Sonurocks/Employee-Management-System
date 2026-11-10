# BMDU Employee Management System

A full-stack Employee Management System built for the BMDU technical assessment using the MERN stack (MongoDB, Express.js, React.js, Node.js). It delivers a responsive admin dashboard for managing workforce records with real-time search, status and department filtering, form validation, and complete CRUD operations.

---

## Project Overview

The BMDU Employee Management System enables human resource administrators to:
- Monitor key workforce metrics (Total Employees, Active, Inactive, Departments count).
- View, search, and filter employee records with pagination.
- Add new employees with client-side and server-side validation.
- View detailed employee profiles with tenure and status indicators.
- Update existing employee details with duplicate email prevention.
- Delete employee records safely with confirmation dialogs.

---

## Key Features

### Frontend (React.js + Tailwind CSS)
- **Responsive Admin Dashboard:** Modern layout with collapsible sidebar and mobile drawer navigation.
- **Real-Time Workforce Metrics:** Dynamic calculation of Total Employees, Active Employees, Inactive Employees, and Department Count directly from backend aggregation.
- **Employee Data Table:** Displays employee name with initials avatar, department badge, role, contact number, joining date, status pill, and action buttons.
- **Search & Filtering:**
  - Real-time search across Employee Name, Email, and Department.
  - Status filter (`All`, `Active`, `Inactive`).
  - Department filter dynamically populated from backend records.
  - Clear filters button to quickly reset active filters.
- **Form Validation (React Hook Form + Zod):**
  - Validation for name length, email format, phone pattern, department, designation, and valid joining date.
  - Duplicate email error handling.
  - Submission loading spinners to prevent double submission.
- **Employee Details Modal:** Full profile display with formatted dates, employee ID, and quick edit shortcut.
- **Delete Confirmation Modal:** Protects against accidental deletions.
- **Toast Notifications:** Floating non-intrusive alerts for success and error states.

### Backend (Node.js + Express.js + Mongoose)
- **RESTful MVC Architecture:** Clean separation of concerns across config, controllers, models, routes, validators, and middleware.
- **Zod Request Validation:** Strict schema validation on incoming request payloads.
- **Rate Limiting:** Protects against abusive requests using `express-rate-limit`.
- **CORS Protection:** Configured with client origin verification.
- **Mongoose Data Modeling:** Schema-level data validation, unique indexes, and timestamps.
- **Centralized Error Handling:** Consistent JSON error responses with proper HTTP status codes.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router DOM v6, Tailwind CSS, React Hook Form, Zod, Lucide React, Axios |
| **Backend** | Node.js, Express.js, Mongoose, Zod, express-rate-limit, cors, dotenv |
| **Database** | MongoDB (Local instance or MongoDB Atlas) |

---

## Architecture & Folder Structure

```
employee-management-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx             # Collapsible navigation sidebar
│   │   │   │   ├── Header.jsx              # Top bar with page title and profile
│   │   │   │   └── DashboardLayout.jsx     # Master layout wrapper
│   │   │   ├── employees/
│   │   │   │   ├── EmployeeTable.jsx       # Employee listing with action buttons
│   │   │   │   ├── EmployeeForm.jsx        # Add / Edit modal form with validation
│   │   │   │   ├── EmployeeDetails.jsx     # Full employee profile modal
│   │   │   │   ├── EmployeeFilters.jsx     # Search bar, status and department dropdowns
│   │   │   │   └── DeleteConfirmation.jsx  # Deletion confirmation dialog
│   │   │   └── common/
│   │   │       ├── Button.jsx              # Reusable button with variants and loading state
│   │   │       ├── Modal.jsx               # Reusable dialog modal with backdrop blur
│   │   │       ├── Loader.jsx              # Centered spinner and inline loader
│   │   │       └── EmptyState.jsx          # Illustrated empty state placeholder
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx               # Metrics cards and recent employee feed
│   │   │   └── Employees.jsx               # Main employee management page with CRUD flow
│   │   ├── services/
│   │   │   ├── api.js                      # Axios instance with response interceptor
│   │   │   └── employeeService.js          # Employee API service calls
│   │   ├── App.jsx                         # React Router DOM configuration
│   │   ├── index.css                       # Tailwind CSS directives
│   │   └── main.jsx                        # React root entry point
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js                           # MongoDB Mongoose connection handler
│   ├── controllers/
│   │   └── employeeController.js           # CRUD controllers & stats aggregation
│   ├── models/
│   │   └── Employee.js                     # Employee Mongoose model schema
│   ├── routes/
│   │   └── employeeRoutes.js               # REST API endpoints mapping
│   ├── middleware/
│   │   ├── errorMiddleware.js              # Centralized error handler
│   │   └── validateRequest.js              # Zod request validation middleware
│   ├── validators/
│   │   └── employeeValidator.js            # Zod validation schemas
│   ├── seeder/
│   │   └── seed.js                         # Sample database population script
│   ├── server.js                           # Express application entry point
│   ├── .env.example
│   └── package.json
├── docs/
│   └── screenshots/                        # Application preview screenshots
├── .gitignore
├── package.json                            # Root runner scripts with concurrently
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [MongoDB](https://www.mongodb.com/) (Local service or MongoDB Atlas cluster URI)

---

## Environment Variables

### Server (`server/.env`)

Copy `server/.env.example` to `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bmdu_employee_db
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

*(For MongoDB Atlas, set `MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bmdu_employee_db`)*

### Client (`client/.env`)

Copy `client/.env.example` to `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sonurocks/bmdu-employee-management-system.git
cd bmdu-employee-management-system
```

### 2. Install Dependencies

You can install all dependencies (root, server, and client) with a single command:

```bash
npm run install:all
```

Or install individually:

```bash
# Root dependencies
npm install

# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../client
npm install
cd ..
```

### 3. Seed Sample Data (Optional)

To populate the database with 10 realistic employee records across departments:

```bash
npm run seed
```

---

## Run Commands

### Run Both Frontend and Backend Concurrently (Recommended)

From the project root:

```bash
npm run dev
```

- **Backend API:** `http://localhost:5000`
- **Frontend Dashboard:** `http://localhost:5173`

### Run Individually

**Backend Server:**
```bash
cd server
npm run dev
```

**Frontend Client:**
```bash
cd client
npm run dev
```

**Frontend Production Build:**
```bash
cd client
npm run build
```

---

## REST API Documentation

### Base URL: `/api/employees`

| Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/employees` | Retrieve paginated employees with search & filters | `?search=&status=&department=&page=1&limit=10` |
| `GET` | `/api/employees/stats` | Retrieve workforce metrics for dashboard | None |
| `GET` | `/api/employees/:id` | Retrieve single employee by ID | `:id` (MongoDB ObjectId) |
| `POST` | `/api/employees` | Create a new employee | JSON payload (validated by Zod) |
| `PUT` | `/api/employees/:id` | Update an existing employee | JSON payload (validated by Zod) |
| `DELETE` | `/api/employees/:id` | Delete an employee record | `:id` (MongoDB ObjectId) |
| `GET` | `/api/health` | Health check route | None |

### Sample Request: `POST /api/employees`

```json
{
  "employeeName": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "phoneNumber": "+91 98765 43210",
  "department": "Engineering",
  "designation": "Senior Full Stack Developer",
  "joiningDate": "2023-03-15",
  "status": "Active"
}
```

### Sample Response: `201 Created`

```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "6730a8421b44ec0a99ff1e20",
    "employeeName": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "phoneNumber": "+91 98765 43210",
    "department": "Engineering",
    "designation": "Senior Full Stack Developer",
    "joiningDate": "2023-03-15T00:00:00.000Z",
    "status": "Active",
    "createdAt": "2024-11-10T12:00:00.000Z",
    "updatedAt": "2024-11-10T12:00:00.000Z"
  }
}
```

### Sample Error Response: `400 Bad Request`

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Please provide a valid email address",
    "Please provide a valid phone number (7-20 characters)"
  ]
}
```

---

## Validation & Error Handling

- **Zod Schema Validation:** Validates payloads on both frontend and backend before touching the database.
- **Duplicate Email Prevention:** Checks email uniqueness and catches MongoDB code `11000` to return user-friendly errors.
- **ObjectId Format Check:** Validates MongoDB ID format and returns `400 Bad Request` for malformed IDs.
- **Rate Limiting:** Protects backend endpoints against brute force and request spam.

---

## Security Considerations

- **CORS Allowed Origins:** Restricts API consumption to authorized frontend client URLs.
- **Input Sanitization:** Express body parser limit set to `10mb` to avoid payload attacks.
- **Credential Protection:** All database URIs and port configs are kept in `.env` files; `.env` is strictly excluded in `.gitignore`.
- **Safe Error Responses:** Production mode suppresses stack traces and returns sanitised error messages.

---

## Screenshots

Screenshots of the running application are organized under `docs/screenshots/`:

| Screen | Description | Path |
| :--- | :--- | :--- |
| **Dashboard Overview** | Metric cards and recent employee feed | `docs/screenshots/dashboard.png` *(placeholder)* |
| **Employee Directory** | Responsive table with search, status & department filters | `docs/screenshots/employee-table.png` *(placeholder)* |
| **Add / Edit Modal** | Form with Zod validation | `docs/screenshots/employee-form.png` *(placeholder)* |
| **Employee Details** | Full modal preview with tenure information | `docs/screenshots/employee-details.png` *(placeholder)* |

---

## Testing Instructions

1. **Verify Backend Build & Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   # Expected: {"success":true,"message":"BMDU Employee Management API is running"}
   ```
2. **Verify Frontend Build:**
   ```bash
   cd client && npm run build
   # Expected: vite build succeeds with zero errors
   ```
3. **Verify CRUD Operations:**
   - Navigate to `http://localhost:5173/employees`.
   - Click "Add Employee" and create a record.
   - Click the Eye icon to view the employee profile.
   - Click the Pencil icon to edit employee designation.
   - Click the Trash icon to delete with confirmation.
   - Test search and status dropdown filters.

---

## Known Limitations

- Authentication is not included as it was marked optional for this technical assessment.
- File upload for employee profile pictures is not implemented (initials avatars are generated dynamically).

---

## Future Improvements

- Add JWT-based role-based access control (Admin vs. Employee).
- Export employee records to CSV or Excel.
- Profile picture upload to AWS S3 or Cloudinary.
- Dark mode toggle with persistent local storage.

---

## Author

- **Author:** Sonu Gupta
- **GitHub:** [https://github.com/sonurocks](https://github.com/sonurocks)
- **Repository:** [https://github.com/sonurocks/bmdu-employee-management-system](https://github.com/sonurocks/bmdu-employee-management-system)

