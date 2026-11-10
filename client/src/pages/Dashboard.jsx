import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, UserCheck, UserX, Building2, ArrowRight, Plus } from "lucide-react";
import { employeeService } from "../services/employeeService";
import Loader from "../components/common/Loader";

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [statsRes, employeesRes] = await Promise.all([
          employeeService.getEmployeeStats(),
          employeeService.getEmployees({ limit: 5, sortBy: "createdAt", sortOrder: "desc" }),
        ]);

        if (statsRes.success) {
          setStats(statsRes.data);
        }
        if (employeesRes.success) {
          setRecentEmployees(employeesRes.data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader message="Loading dashboard statistics..." />;
  }

  const statCards = [
    {
      title: "Total Employees",
      value: stats?.totalEmployees ?? 0,
      subtext: "Registered in system",
      icon: Users,
      iconBg: "bg-blue-50 text-blue-600",
      badge: "Workforce",
      badgeBg: "bg-blue-50 text-blue-700",
    },
    {
      title: "Active Employees",
      value: stats?.activeEmployees ?? 0,
      subtext: stats?.totalEmployees
        ? `${Math.round(((stats.activeEmployees || 0) / stats.totalEmployees) * 100)}% of total team`
        : "Active workforce",
      icon: UserCheck,
      iconBg: "bg-emerald-50 text-emerald-600",
      badge: "Active",
      badgeBg: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Inactive Employees",
      value: stats?.inactiveEmployees ?? 0,
      subtext: "On leave or exited",
      icon: UserX,
      iconBg: "bg-amber-50 text-amber-600",
      badge: "Inactive",
      badgeBg: "bg-amber-50 text-amber-700",
    },
    {
      title: "Total Departments",
      value: stats?.totalDepartments ?? 0,
      subtext: "Functional divisions",
      icon: Building2,
      iconBg: "bg-purple-50 text-purple-600",
      badge: "Divisions",
      badgeBg: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Employee Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time overview of workforce metrics and recent additions
          </p>
        </div>
        <Link
          to="/employees"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Manage Employees</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {card.title}
                </span>
                <div className={`p-2 rounded-lg ${card.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-bold text-gray-900 tracking-tight">
                  {card.value}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${card.badgeBg}`}>
                  {card.badge}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-500">{card.subtext}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recently Added Employees</h3>
            <p className="text-xs text-gray-500 mt-0.5">Latest registrations in the system</p>
          </div>
          <Link
            to="/employees"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEmployees.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No employee records available yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentEmployees.map((emp) => (
              <div
                key={emp._id}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {emp.employeeName ? emp.employeeName.substring(0, 2).toUpperCase() : "EM"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {emp.employeeName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{emp.designation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block text-xs text-gray-500">
                    {emp.department}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      emp.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        emp.status === "Active" ? "bg-emerald-500" : "bg-gray-400"
                      }`}
                    />
                    {emp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
