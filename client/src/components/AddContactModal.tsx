import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactValidationSchema, CONTACT_GROUPS, GENDER_TYPES } from "@shared/schema";
import { AddContactModalProps } from "@/types";
import { GROUP_TRANSLATIONS, GENDER_TRANSLATIONS } from "@/types";
import { Plus, UserRound } from "lucide-react";

const AddContactModal: React.FC<AddContactModalProps> = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(contactValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      group: "family" as const,
      position: "",
      officeHomeNumber: "",
      gender: "male" as const,
      additionalPhone1: "",
      additionalPhone2: "",
      additionalPhone3: "",
      email: "",
      notes: "",
      address: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">افزودن مخاطب جدید</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام</FormLabel>
                    <FormControl>
                      <Input placeholder="نام" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input placeholder="نام خانوادگی" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تلفن</FormLabel>
                    <FormControl>
                      <Input placeholder="شماره تلفن" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>گروه</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب گروه" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CONTACT_GROUPS.map((group) => (
                          <SelectItem key={group} value={group}>
                            {GROUP_TRANSLATIONS[group]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سمت/تخصص</FormLabel>
                    <FormControl>
                      <Input placeholder="سمت یا تخصص" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="officeHomeNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره مطب/منزل</FormLabel>
                    <FormControl>
                      <Input placeholder="شماره مطب یا منزل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>جنسیت</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب جنسیت" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENDER_TYPES.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {GENDER_TRANSLATIONS[gender]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input placeholder="ایمیل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <FormLabel className="block mb-2">شماره‌های اضافی</FormLabel>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="additionalPhone1"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex">
                        <FormControl>
                          <Input placeholder="شماره تلفن اضافی ۱" {...field} />
                        </FormControl>
                        <div className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          ۱
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="additionalPhone2"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex">
                        <FormControl>
                          <Input placeholder="شماره تلفن اضافی ۲" {...field} />
                        </FormControl>
                        <div className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          ۲
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="additionalPhone3"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex">
                        <FormControl>
                          <Input placeholder="شماره تلفن اضافی ۳" {...field} />
                        </FormControl>
                        <div className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          ۳
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس</FormLabel>
                  <FormControl>
                    <Input placeholder="آدرس" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Textarea placeholder="توضیحات یا یادداشت‌های اضافی" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button variant="outline" type="button" onClick={onClose}>
                انصراف
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "در حال ذخیره..." : "ذخیره"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactModal;
