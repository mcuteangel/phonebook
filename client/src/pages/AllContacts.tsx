import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import FilterControls from "@/components/FilterControls";
import ContactCard from "@/components/ContactCard";
import AddContactModal from "@/components/AddContactModal";
import EditContactModal from "@/components/EditContactModal";
import ContactDetails from "@/components/ContactDetails";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { useContacts } from "@/hooks/useContacts";
import { ContactGroup, Contact } from "@shared/schema";
import { CONTACT_GROUPS } from "@shared/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Mail, MapPin, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GROUP_TRANSLATIONS } from "@/types";

const AllContacts: React.FC = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGroup, setActiveGroup] = useState<ContactGroup | undefined>(undefined);
  const [sortBy, setSortBy] = useState("lastName-asc");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  const { 
    contacts, 
    isLoading, 
    createContact, 
    updateContact, 
    deleteContact, 
    isCreating,
    isUpdating,
    isDeleting
  } = useContacts({
    searchTerm,
    group: activeGroup,
    sortBy: sortBy.split("-")[0] as any,
    sortDirection: sortBy.split("-")[1] as any,
  });

  // Handlers
  const handleAddContact = (data: Omit<Contact, "id">) => {
    createContact(data, {
      onSuccess: () => {
        setIsAddModalOpen(false);
      },
    });
  };

  const handleEditContact = (data: Contact) => {
    updateContact(data, {
      onSuccess: () => {
        setIsEditModalOpen(false);
      },
    });
  };

  const handleDeleteContact = () => {
    if (selectedContact) {
      deleteContact(selectedContact.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
        },
      });
    }
  };

  const openEditModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  const openDetailsModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailsModalOpen(true);
  };

  // Function to get color for group label
  const getGroupColorClass = (group: string) => {
    switch (group) {
      case "family":
        return "bg-blue-500";
      case "colleagues":
        return "bg-green-500";
      case "friends":
        return "bg-purple-500";
      case "doctors":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      {/* Page header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">همه مخاطبین</h2>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onAddContact={() => setIsAddModalOpen(true)}
        />
      </div>

      {/* Filter controls */}
      <FilterControls
        groups={CONTACT_GROUPS}
        activeGroup={activeGroup}
        onGroupChange={setActiveGroup}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Contacts grid/list or loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent mb-4"></div>
            <p>در حال بارگذاری مخاطبین...</p>
          </div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">هیچ مخاطبی یافت نشد</h3>
          <p className="text-gray-500 mb-4">می‌توانید با کلیک بر روی دکمه «افزودن مخاطب» اولین مخاطب خود را اضافه کنید.</p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            افزودن مخاطب جدید
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={openEditModal}
              onDelete={openDeleteDialog}
              onViewDetails={openDetailsModal}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام</TableHead>
                <TableHead>گروه</TableHead>
                <TableHead>شماره تماس</TableHead>
                <TableHead>ایمیل</TableHead>
                <TableHead className="text-left">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="text-base">
                        {contact.firstName} {contact.lastName}
                      </div>
                      {contact.position && (
                        <div className="text-xs text-gray-500 mr-2">
                          ({contact.position})
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ml-2 ${getGroupColorClass(contact.group)}`}></span>
                      <span>{GROUP_TRANSLATIONS[contact.group as keyof typeof GROUP_TRANSLATIONS] || contact.group}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 ml-2 text-gray-400" />
                      <span dir="ltr">{contact.phoneNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>{contact.email || "-"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => openDetailsModal(contact)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => openEditModal(contact)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => openDeleteDialog(contact)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modals */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddContact}
        isLoading={isCreating}
      />

      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditContact}
        contact={selectedContact}
        isLoading={isUpdating}
      />

      <ContactDetails
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        contact={selectedContact}
      />

      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteContact}
        contactName={selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : ""}
        isLoading={isDeleting}
      />
    </>
  );
};

export default AllContacts;
