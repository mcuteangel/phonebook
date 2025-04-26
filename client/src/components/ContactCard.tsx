import React from "react";
import { ContactCardProps } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ChevronLeft, Phone, Mail, MapPin } from "lucide-react";
import { GROUP_TRANSLATIONS, GROUP_COLORS } from "@/types";
import { cn } from "@/lib/utils";

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete, onViewDetails }) => {
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
    <Card className="overflow-hidden hover:shadow-md transition duration-150">
      <CardHeader className="border-b px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold text-lg flex items-center">
          <span className={cn("w-2 h-2 rounded-full ml-2", colorClasses.dot)}></span>
          {GROUP_TRANSLATIONS[contact.group as keyof typeof GROUP_TRANSLATIONS] || contact.group}
        </h3>
        <div className="flex space-x-1 space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600"
            onClick={() => onEdit(contact)}
          >
            <Pencil className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-red-600"
            onClick={() => onDelete(contact)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center font-semibold text-lg ml-3",
            colorClasses.bg,
            colorClasses.text
          )}>
            {getInitials(contact.firstName, contact.lastName)}
          </div>
          <div>
            <h4 className="font-semibold text-lg">{contact.firstName} {contact.lastName}</h4>
            <p className="text-gray-600 text-sm">{contact.position}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Phone className="h-5 w-5 ml-2 text-gray-400" />
            <span dir="ltr">{contact.phoneNumber}</span>
          </div>
          {contact.email && (
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 ml-2 text-gray-400" />
              <span>{contact.email}</span>
            </div>
          )}
          {contact.address && (
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 ml-2 text-gray-400" />
              <span>{contact.address}</span>
            </div>
          )}
        </div>
        <Button 
          variant="link" 
          size="sm" 
          className="mt-4 text-primary hover:text-primary/90 p-0"
          onClick={() => onViewDetails(contact)}
        >
          نمایش جزئیات بیشتر
          <ChevronLeft className="h-4 w-4 mr-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
