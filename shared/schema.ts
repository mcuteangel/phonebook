import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define contact groups as a constant for consistency
export const CONTACT_GROUPS = [
  "family",
  "colleagues",
  "friends",
  "doctors",
  "others"
] as const;

// Define gender types
export const GENDER_TYPES = [
  "male",
  "female",
  "other"
] as const;

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  group: text("group").notNull(),
  position: text("position"),
  officeHomeNumber: text("office_home_number"),
  gender: text("gender").notNull(),
  additionalPhone1: text("additional_phone1"),
  additionalPhone2: text("additional_phone2"),
  additionalPhone3: text("additional_phone3"),
  email: text("email"),
  notes: text("notes"),
  address: text("address"),
});

export const insertContactSchema = createInsertSchema(contacts).omit({ id: true });

// Extended schema for validation
export const contactValidationSchema = insertContactSchema.extend({
  firstName: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
  phoneNumber: z.string().min(1, "شماره تلفن الزامی است"),
  group: z.enum(CONTACT_GROUPS, {
    errorMap: () => ({ message: "گروه معتبر نیست" }),
  }),
  gender: z.enum(GENDER_TYPES, {
    errorMap: () => ({ message: "جنسیت معتبر نیست" }),
  }),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type ContactGroup = typeof CONTACT_GROUPS[number];
export type Gender = typeof GENDER_TYPES[number];

// Schema for editing a contact
export const editContactSchema = contactValidationSchema.partial().extend({
  id: z.number(),
});

export type EditContact = z.infer<typeof editContactSchema>;

// Create a type for filtering contacts
export type ContactFilters = {
  group?: ContactGroup;
  searchTerm?: string;
  sortBy?: 'lastName' | 'firstName' | 'dateAdded';
  sortDirection?: 'asc' | 'desc';
};