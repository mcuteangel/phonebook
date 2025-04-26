import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import { Bell, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 bg-white shadow-md flex-col h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 md:hidden absolute top-4 right-6 z-10"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 w-64">
          <Sidebar onNavigation={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top header */}
        <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <h1 className="text-lg font-semibold text-primary mr-3">مدیریت مخاطبین</h1>
          </div>

          <div className="flex items-center">
            <div className="relative mr-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative p-1 text-gray-400 hover:text-gray-600"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </div>

            <div className="relative">
              <Button variant="ghost" className="flex items-center space-x-4 focus:outline-none">
                <Avatar className="w-8 h-8 bg-primary text-white">
                  <AvatarFallback>کا</AvatarFallback>
                </Avatar>
                <span className="mr-2 text-sm font-medium hidden sm:block">کاربر سیستم</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Mobile navigation */}
      <MobileMenu />
    </div>
  );
};

export default Layout;
