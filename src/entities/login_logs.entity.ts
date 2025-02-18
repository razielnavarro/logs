import { sql } from 'drizzle-orm';
import { generateId } from '../utils/random';
import { relations } from 'drizzle-orm';
import { userLogs } from './user_logs.entity';
import { 
    sqliteTable, 
    text, integer } from 'drizzle-orm/sqlite-core';

export const loginLogs = sqliteTable('login_logs', {
	id: text("id").primaryKey().$defaultFn(() => generateId()),
    user_id: text().references(() => userLogs.id),
    success: integer("success", { mode: "boolean"}).notNull().default(false),
    ip: text(),
    country: text(),
    user_agent: text(),
});

export const loginRelations = relations(loginLogs, ({ one }) => ({
    userLogs: one(userLogs, {
        fields: [loginLogs.user_id],
        references: [userLogs.id],
    }),
}));