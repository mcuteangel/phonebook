import { Contact, ContactGroup, Gender } from "@shared/schema";

export interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onViewDetails: (contact: Contact) => void;
}

export interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Contact, "id">) => void;
  isLoading?: boolean;
}

export interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Contact) => void;
  contact: Contact | null;
  isLoading?: boolean;
}

export interface ContactDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  contactName: string;
  isLoading?: boolean;
}

export interface FilterControlsProps {
  groups: ContactGroup[];
  activeGroup: ContactGroup | undefined;
  onGroupChange: (group: ContactGroup | undefined) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onAddContact: () => void;
}

export interface GroupColorMap {
  [key: string]: string;
}

export const GROUP_COLORS: GroupColorMap = {
  family: "blue",
  colleagues: "green",
  friends: "purple",
  doctors: "yellow",
  others: "gray"
};

export const GROUP_TRANSLATIONS: Record<ContactGroup, string> = {
  family: "خانواده",
  colleagues: "همکاران",
  friends: "دوستان",
  doctors: "پزشکان",
  others: "سایر"
};

export const GENDER_TRANSLATIONS: Record<Gender, string> = {
  male: "مرد",
  female: "زن",
  other: "سایر"
};
