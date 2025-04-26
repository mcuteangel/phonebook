import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Palette, 
  BellRing, 
  Languages,
  Shield,
  UserCog,
  HardDrive
} from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">تنظیمات</h2>
        <p className="text-gray-600">تنظیمات و پیکربندی سیستم مدیریت مخاطبین</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">عمومی</TabsTrigger>
          <TabsTrigger value="appearance">ظاهر</TabsTrigger>
          <TabsTrigger value="notifications">اعلان‌ها</TabsTrigger>
          <TabsTrigger value="advanced">پیشرفته</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="ml-2 h-5 w-5 text-primary" />
                تنظیمات عمومی
              </CardTitle>
              <CardDescription>
                تنظیمات پایه و عمومی نرم‌افزار
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>نمایش تاریخ میلادی</Label>
                  <div className="text-sm text-gray-500">نمایش تاریخ میلادی در کنار تاریخ شمسی</div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>باز کردن خودکار آخرین گروه</Label>
                  <div className="text-sm text-gray-500">باز کردن خودکار آخرین گروه مشاهده شده هنگام ورود به برنامه</div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>نمایش شماره تلفن به صورت فرمت‌شده</Label>
                  <div className="text-sm text-gray-500">نمایش شماره تلفن‌ها به صورت فرمت‌شده و خوانا</div>
                </div>
                <Switch disabled />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages className="ml-2 h-5 w-5 text-primary" />
                زبان و منطقه
              </CardTitle>
              <CardDescription>
                تنظیمات مربوط به زبان و منطقه زمانی
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 p-3 rounded-md text-amber-700 text-sm">
                این بخش در حال توسعه است و به زودی فعال خواهد شد.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="ml-2 h-5 w-5 text-primary" />
                تم و رنگ‌بندی
              </CardTitle>
              <CardDescription>
                تنظیمات مربوط به ظاهر و رنگ‌بندی برنامه
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>حالت نمایش</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={theme === "light" ? "default" : "outline"} 
                    className="w-full" 
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="ml-2 h-4 w-4" />
                    روشن
                  </Button>
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"} 
                    className="w-full" 
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="ml-2 h-4 w-4" />
                    تیره
                  </Button>
                  <Button 
                    variant={theme === "system" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => setTheme("system")}
                  >
                    خودکار
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>انیمیشن‌ها</Label>
                  <div className="text-sm text-gray-500">فعال یا غیرفعال کردن انیمیشن‌های رابط کاربری</div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>فونت بزرگ</Label>
                  <div className="text-sm text-gray-500">افزایش اندازه فونت برای خوانایی بیشتر</div>
                </div>
                <Switch disabled />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellRing className="ml-2 h-5 w-5 text-primary" />
                اعلان‌ها و یادآوری‌ها
              </CardTitle>
              <CardDescription>
                تنظیمات مربوط به اعلان‌ها و یادآوری‌ها
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>اعلان‌های روز تولد</Label>
                  <div className="text-sm text-gray-500">دریافت اعلان در روز تولد مخاطبین</div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>اعلان‌های سیستمی</Label>
                  <div className="text-sm text-gray-500">دریافت اعلان‌های مربوط به سیستم و به‌روزرسانی‌ها</div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="bg-amber-50 p-3 rounded-md text-amber-700 text-sm">
                این بخش در حال توسعه است و به زودی فعال خواهد شد.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="ml-2 h-5 w-5 text-primary" />
                امنیت و حریم خصوصی
              </CardTitle>
              <CardDescription>
                تنظیمات مربوط به امنیت و حریم خصوصی
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>رمزگذاری اطلاعات</Label>
                  <div className="text-sm text-gray-500">رمزگذاری اطلاعات ذخیره شده برای امنیت بیشتر</div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>محافظت با رمز عبور</Label>
                  <div className="text-sm text-gray-500">محافظت از برنامه با رمز عبور هنگام ورود</div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="bg-amber-50 p-3 rounded-md text-amber-700 text-sm">
                این بخش در حال توسعه است و به زودی فعال خواهد شد.
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="ml-2 h-5 w-5 text-primary" />
                ذخیره‌سازی و داده‌ها
              </CardTitle>
              <CardDescription>
                تنظیمات مربوط به ذخیره‌سازی و مدیریت داده‌ها
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 p-3 rounded-md text-amber-700 text-sm mb-4">
                این بخش در حال توسعه است و به زودی فعال خواهد شد.
              </div>
              
              <Button variant="destructive" className="w-full" disabled>
                پاکسازی کامل داده‌ها
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;