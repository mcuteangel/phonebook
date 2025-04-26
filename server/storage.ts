import { contacts as contactsTable, type Contact, type InsertContact, type ContactFilters } from "@shared/schema";
import { db } from "./db";
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
    let whereClause = '';
    const params: any[] = [];
    let paramIndex = 1;
    
    // Build WHERE clause if filters exist
    if (filters) {
      const conditions = [];
      
      // Filter by group
      if (filters.group) {
        conditions.push(`group = $${paramIndex++}`);
        params.push(filters.group);
      }
      
      // Filter by search term
      if (filters.searchTerm) {
        const searchTerm = `%${filters.searchTerm}%`;
        conditions.push(`(
          "firstName" ILIKE $${paramIndex} OR 
          "lastName" ILIKE $${paramIndex} OR 
          "phoneNumber" ILIKE $${paramIndex} OR
          "email" ILIKE $${paramIndex} OR
          "position" ILIKE $${paramIndex}
        )`);
        paramIndex++;
        params.push(searchTerm);
      }
      
      if (conditions.length > 0) {
        whereClause = `WHERE ${conditions.join(' AND ')}`;
      }
    }
    
    // Build ORDER BY clause
    let orderByClause = 'ORDER BY "lastName" ASC';
    if (filters?.sortBy) {
      const direction = filters.sortDirection === 'desc' ? 'DESC' : 'ASC';
      
      if (filters.sortBy === 'firstName') {
        orderByClause = `ORDER BY "firstName" ${direction}`;
      } else if (filters.sortBy === 'lastName') {
        orderByClause = `ORDER BY "lastName" ${direction}`;
      }
    }
    
    // Combine the query
    const query = `
      SELECT * FROM "contacts"
      ${whereClause}
      ${orderByClause}
    `;
    
    // Execute the query
    const result = await pool.query(query, params);
    return result.rows as Contact[];
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const result = await pool.query('SELECT * FROM "contacts" WHERE id = $1', [id]);
    return result.rows[0] as Contact | undefined;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    // Build column names and value placeholders
    const columns = Object.keys(contact).map(key => `"${key}"`).join(', ');
    const placeholders = Object.keys(contact).map((_, index) => `$${index + 1}`).join(', ');
    const values = Object.values(contact);
    
    const query = `
      INSERT INTO "contacts" (${columns})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    return result.rows[0] as Contact;
  }

  async updateContact(id: number, contactData: Partial<InsertContact>): Promise<Contact | undefined> {
    // If no data to update, return early
    if (Object.keys(contactData).length === 0) {
      return this.getContact(id);
    }
    
    // Build SET clause
    const setItems = Object.keys(contactData).map((key, index) => `"${key}" = $${index + 1}`);
    const setClause = setItems.join(', ');
    const values = [...Object.values(contactData), id];
    
    const query = `
      UPDATE "contacts"
      SET ${setClause}
      WHERE id = $${values.length}
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    return result.rows[0] as Contact | undefined;
  }

  async deleteContact(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM "contacts" WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
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
