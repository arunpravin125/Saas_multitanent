import React from "react";
import {
  Calendar,
  User,
  Building,
  FileText,
  AlertCircle,
  ChevronDown,
  Plus,
  Filter,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sidebarItems = [
    { icon: Calendar, active: false },
    { icon: User, active: true },
    { icon: Building, active: false },
    { icon: FileText, active: false },
    { icon: AlertCircle, active: false },
    { icon: FileText, active: false },
  ];
  return (
    <div className="w-16 bg-white border-r border-gray-200 py-4">
      <div className="flex flex-col items-center space-y-4">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                item.active
                  ? "bg-red-100 text-red-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Link>
                <Icon className="h-5 w-5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
