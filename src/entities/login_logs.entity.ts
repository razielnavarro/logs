import { sql } from 'drizzle-orm';
import { generateId } from '../utils/random';
import { 
    sqliteTable, 
    text, integer } from 'drizzle-orm/sqlite-core';

export const loginLogs = sqliteTable('login_logs', {
	id: text("id").primaryKey(),
    user_id: text(),
    success: integer("success", { mode: "boolean"}).notNull().default(false),
    ip: text(),
    country: text(),
    user_agent: text()
});