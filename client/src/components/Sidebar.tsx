import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  FolderOpen,
  Download,
  Settings,
  Plus,
} from "lucide-react";

interface SidebarProps {
  onNavigation?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigation }) => {
  const [location] = useLocation();

  // Navigation handler
  const handleNavigation = () => {
    if (onNavigation) {
      onNavigation();
    }
  };

  // Navigation items
  const navItems = [
    { name: "داشبورد", href: "/", icon: Home },
    { name: "همه مخاطبین", href: "/contacts", icon: Users },
    { name: "گروه‌ها", href: "/groups", icon: FolderOpen },
    { name: "پشتیبان‌گیری", href: "/backup", icon: Download },
    { name: "تنظیمات", href: "/settings", icon: Settings },
  ];

  // Contact groups
  const contactGroups = [
    { name: "خانواده", color: "bg-blue-500" },
    { name: "همکاران", color: "bg-green-500" },
    { name: "دوستان", color: "bg-purple-500" },
    { name: "پزشکان", color: "bg-yellow-500" },
  ];

  return (
    <>
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-primary">سامانه مدیریت مخاطبین</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-1">
              <div
                role="button"
                tabIndex={0}
                className={cn(
                  "flex items-center p-2 rounded-md transition-colors cursor-pointer",
                  location === item.href
                    ? "bg-blue-50 text-primary"
                    : "hover:bg-gray-100 text-gray-700"
                )}
                onClick={() => {
                  window.location.href = item.href;
                  handleNavigation();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.location.href = item.href;
                    handleNavigation();
                  }
                }}
              >
                <item.icon className="h-5 w-5 ml-2" />
                {item.name}
              </div>
            </li>
          ))}
        </ul>

        <div className="pt-4 mt-4 border-t">
          <h3 className="text-xs font-medium text-gray-500 mb-2">گروه‌های مخاطبین</h3>
          <ul>
            {contactGroups.map((group) => (
              <li key={group.name} className="mb-1">
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    window.location.href = `/contacts?group=${group.name}`;
                    handleNavigation();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      window.location.href = `/contacts?group=${group.name}`;
                      handleNavigation();
                    }
                  }}
                >
                  <span className={`w-3 h-3 rounded-full ml-2 ${group.color}`}></span>
                  {group.name}
                </div>
              </li>
            ))}
            <li className="mb-1">
              <div
                role="button"
                tabIndex={0}
                className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-600 cursor-pointer"
                onClick={() => {
                  window.location.href = "/groups/new";
                  handleNavigation();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.location.href = "/groups/new";
                    handleNavigation();
                  }
                }}
              >
                <Plus className="h-4 w-4 ml-2" />
                گروه جدید
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
