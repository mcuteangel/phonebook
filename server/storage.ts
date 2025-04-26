import { contacts, type Contact, type InsertContact, type ContactFilters } from "@shared/schema";

// Interface for Contact Storage
export interface IStorage {
  getContacts(filters?: ContactFilters): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: number, contact: Partial<InsertContact>): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private currentId: number;

  constructor() {
    this.contacts = new Map();
    this.currentId = 1;
  }

  async getContacts(filters?: ContactFilters): Promise<Contact[]> {
    let results = Array.from(this.contacts.values());

    // Apply group filter if provided
    if (filters?.group) {
      results = results.filter(contact => contact.group === filters.group);
    }

    // Apply search term filter if provided
    if (filters?.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      results = results.filter(contact => 
        contact.firstName.toLowerCase().includes(searchLower) ||
        contact.lastName.toLowerCase().includes(searchLower) ||
        contact.phoneNumber.includes(searchLower) ||
        (contact.position && contact.position.toLowerCase().includes(searchLower)) ||
        (contact.email && contact.email.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    if (filters?.sortBy) {
      const direction = filters.sortDirection === 'desc' ? -1 : 1;
      results.sort((a, b) => {
        switch (filters.sortBy) {
          case 'lastName':
            return direction * a.lastName.localeCompare(b.lastName);
          case 'firstName':
            return direction * a.firstName.localeCompare(b.firstName);
          default:
            return 0;
        }
      });
    } else {
      // Default sort by last name
      results.sort((a, b) => a.lastName.localeCompare(b.lastName));
    }

    return results;
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(contactData: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact: Contact = { ...contactData, id };
    this.contacts.set(id, contact);
    return contact;
  }

  async updateContact(id: number, contactData: Partial<InsertContact>): Promise<Contact | undefined> {
    const existingContact = this.contacts.get(id);
    
    if (!existingContact) {
      return undefined;
    }

    const updatedContact: Contact = { ...existingContact, ...contactData };
    this.contacts.set(id, updatedContact);
    
    return updatedContact;
  }

  async deleteContact(id: number): Promise<boolean> {
    return this.contacts.delete(id);
  }
}

export const storage = new MemStorage();
