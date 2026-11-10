import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";

export const Header = ({ onMenuToggle }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard Overview";
      case "/employees":
        return "Employee Management";
      default:
        return "Overview";
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              {getPageTitle()}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Live System
          </span>
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              AD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-gray-900 leading-none">Admin</p>
              <p className="text-[10px] text-gray-500 mt-0.5">HR Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
