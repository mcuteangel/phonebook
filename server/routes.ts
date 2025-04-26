import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, editContactSchema, type ContactFilters } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all contacts with optional filtering
  app.get("/api/contacts", async (req: Request, res: Response) => {
    try {
      const filters: ContactFilters = {};

      // Extract filter parameters
      if (req.query.group) {
        filters.group = req.query.group as string;
      }

      if (req.query.searchTerm) {
        filters.searchTerm = req.query.searchTerm as string;
      }

      if (req.query.sortBy) {
        filters.sortBy = req.query.sortBy as 'lastName' | 'firstName' | 'dateAdded';
      }

      if (req.query.sortDirection) {
        filters.sortDirection = req.query.sortDirection as 'asc' | 'desc';
      }

      const contacts = await storage.getContacts(filters);
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Get a single contact by ID
  app.get("/api/contacts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }

      const contact = await storage.getContact(id);
      
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json(contact);
    } catch (error) {
      console.error("Error fetching contact:", error);
      res.status(500).json({ message: "Failed to fetch contact" });
    }
  });

  // Create a new contact
  app.post("/api/contacts", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const newContact = await storage.createContact(contactData);
      res.status(201).json(newContact);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "Failed to create contact" });
    }
  });

  // Update an existing contact
  app.patch("/api/contacts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }

      // Add id to the request body for validation
      const contactData = editContactSchema.parse({ ...req.body, id });
      
      // Remove id from the data we're updating since we already have it
      const { id: _, ...updateData } = contactData;

      const updatedContact = await storage.updateContact(id, updateData);
      
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json(updatedContact);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error updating contact:", error);
      res.status(500).json({ message: "Failed to update contact" });
    }
  });

  // Delete a contact
  app.delete("/api/contacts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }

      const deleted = await storage.deleteContact(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "Failed to delete contact" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
