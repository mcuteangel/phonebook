import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, Database, Shield, Clock } from "lucide-react";

const Backup: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">پشتیبان‌گیری و بازیابی</h2>
        <p className="text-gray-600">از اطلاعات مخاطبین خود پشتیبان بگیرید یا آن‌ها را بازیابی کنید.</p>
      </div>

      <Tabs defaultValue="backup" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="backup">پشتیبان‌گیری</TabsTrigger>
          <TabsTrigger value="restore">بازیابی</TabsTrigger>
        </TabsList>
        
        <TabsContent value="backup" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="ml-2 h-5 w-5 text-primary" />
                  پشتیبان‌گیری دستی
                </CardTitle>
                <CardDescription>
                  پشتیبان‌گیری دستی از تمام اطلاعات مخاطبین
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  با استفاده از این گزینه می‌توانید از تمام اطلاعات مخاطبین خود یک فایل پشتیبان تهیه کنید.
                </p>
                <div className="bg-blue-50 p-3 rounded-md text-blue-700 text-sm mb-4">
                  <span className="font-semibold block mb-1">نکته:</span>
                  این فایل شامل تمام اطلاعات مخاطبین شما خواهد بود و می‌توانید در آینده از آن برای بازیابی اطلاعات استفاده کنید.
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button className="w-full" disabled>
                  <Download className="ml-2 h-4 w-4" />
                  دریافت پشتیبان
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="ml-2 h-5 w-5 text-primary" />
                  پشتیبان‌گیری خودکار
                </CardTitle>
                <CardDescription>
                  تنظیم زمان‌بندی برای پشتیبان‌گیری خودکار
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  برنامه‌ریزی کنید تا سیستم به صورت خودکار در فواصل زمانی مشخص از اطلاعات شما پشتیبان بگیرد.
                </p>
                <div className="bg-amber-50 p-3 rounded-md text-amber-700 text-sm">
                  این ویژگی در حال توسعه است و به زودی فعال خواهد شد.
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  <Clock className="ml-2 h-4 w-4" />
                  فعال‌سازی پشتیبان خودکار
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="restore" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="ml-2 h-5 w-5 text-primary" />
                بازیابی اطلاعات
              </CardTitle>
              <CardDescription>
                بازیابی اطلاعات مخاطبین از فایل پشتیبان
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                با استفاده از این گزینه می‌توانید اطلاعات مخاطبین خود را از فایل پشتیبان بازیابی کنید.
              </p>
              <div className="bg-yellow-50 p-3 rounded-md text-yellow-700 text-sm mb-4">
                <span className="font-semibold block mb-1">هشدار:</span>
                بازیابی اطلاعات باعث جایگزینی تمام اطلاعات فعلی با اطلاعات موجود در فایل پشتیبان خواهد شد.
              </div>
              <div className="bg-gray-100 border border-dashed border-gray-300 rounded-md p-6 text-center cursor-not-allowed">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">برای بارگذاری فایل پشتیبان کلیک کنید</p>
                <p className="text-gray-400 text-xs mt-1">(این ویژگی در حال توسعه است)</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full" disabled>
                <Database className="ml-2 h-4 w-4" />
                بازیابی اطلاعات
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Backup;