import { defineConfig } from "drizzle-kit";
import { resolve } from "path";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: resolve(process.cwd(), "sqlite.db"),
  },
});