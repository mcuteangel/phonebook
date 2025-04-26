import React from "react";
import { ContactDetailsProps } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Briefcase, Home, User, X } from "lucide-react";
import { GROUP_TRANSLATIONS, GENDER_TRANSLATIONS, GROUP_COLORS } from "@/types";
import { cn } from "@/lib/utils";

const ContactDetails: React.FC<ContactDetailsProps> = ({ isOpen, onClose, contact }) => {
  if (!contact) return null;

  // Get first letters for avatar
  const getInitials = (firstName: string, lastName: string) => {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  // Get appropriate color class for the group
  const getGroupColorClass = (group: string) => {
    const color = GROUP_COLORS[group] || "gray";
    return {
      bg: `bg-${color}-100`,
      text: `text-${color}-600`,
      border: `border-${color}-200`,
      dot: `bg-${color}-500`,
    };
  };

  const colorClasses = getGroupColorClass(contact.group);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">اطلاعات مخاطب</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            جزئیات کامل اطلاعات {contact.firstName} {contact.lastName}
          </DialogDescription>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute left-2 top-2">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center">
            <div className={cn(
              "h-16 w-16 rounded-full flex items-center justify-center font-semibold text-xl ml-4",
              colorClasses.bg,
              colorClasses.text
            )}>
              {getInitials(contact.firstName, contact.lastName)}
            </div>
            <div>
              <h4 className="text-xl font-semibold">{contact.firstName} {contact.lastName}</h4>
              <div className="flex items-center mt-1">
                <span className={cn("h-2 w-2 rounded-full ml-2", colorClasses.dot)}></span>
                <span className="text-gray-600">
                  {GROUP_TRANSLATIONS[contact.group as keyof typeof GROUP_TRANSLATIONS] || contact.group}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3 border-t border-b py-4">
            <div className="flex items-center">
              <User className="h-5 w-5 ml-3 text-gray-500" />
              <div>
                <span className="text-sm text-gray-500 block">جنسیت</span>
                <span>{GENDER_TRANSLATIONS[contact.gender as keyof typeof GENDER_TRANSLATIONS] || contact.gender}</span>
              </div>
            </div>
            
            {contact.position && (
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 ml-3 text-gray-500" />
                <div>
                  <span className="text-sm text-gray-500 block">سمت/تخصص</span>
                  <span>{contact.position}</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 ml-3 text-gray-500" />
              <div>
                <span className="text-sm text-gray-500 block">شماره اصلی</span>
                <span dir="ltr">{contact.phoneNumber}</span>
              </div>
            </div>
            
            {contact.officeHomeNumber && (
              <div className="flex items-center">
                <Home className="h-5 w-5 ml-3 text-gray-500" />
                <div>
                  <span className="text-sm text-gray-500 block">شماره مطب/منزل</span>
                  <span dir="ltr">{contact.officeHomeNumber}</span>
                </div>
              </div>
            )}
            
            {contact.email && (
              <div className="flex items-center">
                <Mail className="h-5 w-5 ml-3 text-gray-500" />
                <div>
                  <span className="text-sm text-gray-500 block">ایمیل</span>
                  <span>{contact.email}</span>
                </div>
              </div>
            )}
            
            {contact.address && (
              <div className="flex items-center">
                <MapPin className="h-5 w-5 ml-3 text-gray-500" />
                <div>
                  <span className="text-sm text-gray-500 block">آدرس</span>
                  <span>{contact.address}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Additional phone numbers section */}
          {(contact.additionalPhone1 || contact.additionalPhone2 || contact.additionalPhone3) && (
            <div className="space-y-3">
              <h5 className="font-medium">شماره‌های اضافی</h5>
              
              {contact.additionalPhone1 && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 ml-3 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-500 block">شماره اضافی ۱</span>
                    <span dir="ltr">{contact.additionalPhone1}</span>
                  </div>
                </div>
              )}
              
              {contact.additionalPhone2 && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 ml-3 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-500 block">شماره اضافی ۲</span>
                    <span dir="ltr">{contact.additionalPhone2}</span>
                  </div>
                </div>
              )}
              
              {contact.additionalPhone3 && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 ml-3 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-500 block">شماره اضافی ۳</span>
                    <span dir="ltr">{contact.additionalPhone3}</span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Notes section */}
          {contact.notes && (
            <div>
              <h5 className="font-medium mb-2">یادداشت</h5>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{contact.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetails;
