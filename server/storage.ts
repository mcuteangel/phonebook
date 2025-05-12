import { contacts as contactsTable, type Contact, type InsertContact, type ContactFilters } from "@shared/schema";
import { initDatabase } from "./db";
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
  private async getDb() {
    return await initDatabase();
  }

  async getContacts(filters?: ContactFilters): Promise<Contact[]> {
    const db = await this.getDb();
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
            ${contactsTable.firstName} LIKE ${searchTerm} OR
            ${contactsTable.lastName} LIKE ${searchTerm} OR
            ${contactsTable.phoneNumber} LIKE ${searchTerm} OR
            ${contactsTable.email} LIKE ${searchTerm} OR
            ${contactsTable.position} LIKE ${searchTerm}
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
      const db = await this.getDb();
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
      const db = await this.getDb();
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
      const db = await this.getDb();
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
      const db = await this.getDb();
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

// Using database storage
export const storage = new DatabaseStorage();