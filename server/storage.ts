import { contacts as contactsTable, type Contact, type InsertContact, type ContactFilters } from "@shared/schema";
import { db, pool } from "./db";
import { eq, desc, asc, and, or, ilike, sql } from "drizzle-orm";

// Interface for Contact Storage
export interface IStorage {
  getContacts(filters?: ContactFilters): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: number, contact: Partial<InsertContact>): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<boolean>;
}

// Database implementation of IStorage
export class DatabaseStorage implements IStorage {
  async getContacts(filters?: ContactFilters): Promise<Contact[]> {
    let query = db.select().from(contactsTable);
    const whereConditions = [];
    
    // Apply filters
    if (filters) {
      // Filter by group
      if (filters.group) {
        whereConditions.push(eq(contactsTable.group, filters.group));
      }
      
      // Filter by search term
      if (filters.searchTerm) {
        const searchTerm = `%${filters.searchTerm}%`;
        whereConditions.push(
          sql`(
            ${contactsTable.firstName} ILIKE ${searchTerm} OR
            ${contactsTable.lastName} ILIKE ${searchTerm} OR
            ${contactsTable.phoneNumber} ILIKE ${searchTerm} OR
            ${contactsTable.email} ILIKE ${searchTerm} OR
            ${contactsTable.position} ILIKE ${searchTerm}
          )`
        );
      }
    }
    
    // Apply where conditions
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }
    
    // Apply sorting
    if (filters?.sortBy) {
      if (filters.sortBy === 'firstName') {
        if (filters.sortDirection === 'desc') {
          query = query.orderBy(desc(contactsTable.firstName));
        } else {
          query = query.orderBy(asc(contactsTable.firstName));
        }
      } else if (filters.sortBy === 'lastName') {
        if (filters.sortDirection === 'desc') {
          query = query.orderBy(desc(contactsTable.lastName));
        } else {
          query = query.orderBy(asc(contactsTable.lastName));
        }
      }
    } else {
      // Default sort by last name
      query = query.orderBy(asc(contactsTable.lastName));
    }
    
    try {
      const contacts = await query;
      return contacts;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }

  async getContact(id: number): Promise<Contact | undefined> {
    try {
      const [contact] = await db
        .select()
        .from(contactsTable)
        .where(eq(contactsTable.id, id));
        
      return contact;
    } catch (error) {
      console.error('Error fetching contact:', error);
      return undefined;
    }
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    try {
      const [newContact] = await db
        .insert(contactsTable)
        .values(contact)
        .returning();
        
      return newContact;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  async updateContact(id: number, contactData: Partial<InsertContact>): Promise<Contact | undefined> {
    try {
      const [updatedContact] = await db
        .update(contactsTable)
        .set(contactData)
        .where(eq(contactsTable.id, id))
        .returning();
        
      return updatedContact;
    } catch (error) {
      console.error('Error updating contact:', error);
      return undefined;
    }
  }

  async deleteContact(id: number): Promise<boolean> {
    try {
      const result = await db
        .delete(contactsTable)
        .where(eq(contactsTable.id, id))
        .returning({ id: contactsTable.id });
        
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  }
}

// Memory implementation (keeping as reference, but not using)
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

// Using database storage instead of memory storage
export const storage = new DatabaseStorage();
