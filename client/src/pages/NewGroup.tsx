import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FolderPlus, CircleDot } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "نام گروه باید حداقل 2 حرف باشد",
  }),
  description: z.string().optional(),
  color: z.string().min(1, {
    message: "لطفا یک رنگ انتخاب کنید",
  }),
});

const NewGroup: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6", // آبی به عنوان رنگ پیش‌فرض
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // این بخش در نسخه‌های آینده تکمیل خواهد شد
  }

  const colorOptions = [
    { name: "آبی", value: "#3b82f6" },
    { name: "سبز", value: "#10b981" },
    { name: "بنفش", value: "#8b5cf6" },
    { name: "قرمز", value: "#ef4444" },
    { name: "نارنجی", value: "#f97316" },
    { name: "زرد", value: "#facc15" },
    { name: "صورتی", value: "#ec4899" },
    { name: "خاکستری", value: "#6b7280" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ایجاد گروه جدید</h2>
        <p className="text-gray-600">ایجاد گروه جدید برای دسته‌بندی مخاطبین</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderPlus className="ml-2 h-5 w-5 text-primary" />
            گروه جدید
          </CardTitle>
          <CardDescription>
            اطلاعات گروه جدید را وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام گروه</FormLabel>
                    <FormControl>
                      <Input placeholder="نام گروه را وارد کنید" {...field} />
                    </FormControl>
                    <FormDescription>
                      نام گروه باید واضح و مختصر باشد
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات (اختیاری)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="توضیحاتی درباره این گروه وارد کنید"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رنگ گروه</FormLabel>
                    <div className="grid grid-cols-4 gap-3">
                      {colorOptions.map((color) => (
                        <div
                          key={color.value}
                          className={`flex items-center border rounded-md p-2 cursor-pointer transition-all ${
                            field.value === color.value
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => field.onChange(color.value)}
                        >
                          <div
                            className="w-5 h-5 rounded-full ml-2"
                            style={{ backgroundColor: color.value }}
                          />
                          <div className="text-sm">{color.name}</div>
                          {field.value === color.value && (
                            <CircleDot className="w-4 h-4 mr-auto text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="bg-amber-50 p-3 rounded-md text-amber-700 text-sm">
                این بخش در حال توسعه است و به زودی فعال خواهد شد.
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            انصراف
          </Button>
          <Button disabled>
            ذخیره گروه
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewGroup;