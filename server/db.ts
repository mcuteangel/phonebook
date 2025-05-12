import { drizzle } from "drizzle-orm/sql.js";
import initSqlJs from "sql.js";
import * as schema from "@shared/schema";
import fs from "fs";

let db: ReturnType<typeof drizzle>;

async function initDatabase() {
  const SQL = await initSqlJs();
  
  // Try to load existing database file
  let buffer;
  try {
    buffer = fs.readFileSync("sqlite.db");
  } catch (e) {
    // If file doesn't exist, create new database
    buffer = new Uint8Array(0);
  }
  
  const sqlDb = new SQL.Database(buffer);
  db = drizzle(sqlDb, { schema });
  
  // Save database to file when process exits
  process.on('exit', () => {
    const data = sqlDb.export();
    fs.writeFileSync("sqlite.db", Buffer.from(data));
  });
  
  return db;
}

export { initDatabase };