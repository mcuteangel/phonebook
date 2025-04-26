import React from "react";
import { useLocation } from "wouter";
import { Home, Users, FolderOpen, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileMenu: React.FC = () => {
  const [location] = useLocation();

  const menuItems = [
    { name: "خانه", href: "/", icon: Home },
    { name: "مخاطبین", href: "/contacts", icon: Users },
    { name: "گروه‌ها", href: "/groups", icon: FolderOpen },
    { name: "تنظیمات", href: "/settings", icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t flex">
      {menuItems.map((item) => (
        <div
          key={item.name}
          role="button"
          tabIndex={0}
          className={cn(
            "flex-1 p-3 text-center font-medium flex flex-col items-center justify-center cursor-pointer",
            location === item.href ? "text-primary" : "text-gray-500"
          )}
          onClick={() => {
            window.location.href = item.href;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.location.href = item.href;
            }
          }}
        >
          <item.icon className="h-6 w-6 mx-auto" />
          <span className="text-xs mt-1">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MobileMenu;
