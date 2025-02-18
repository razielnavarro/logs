import { sql } from 'drizzle-orm';
import { generateId } from '../utils/random';
import { loginLogs } from './login_logs.entity';
import { eventLogs } from './event_logs.entity';
import { relations } from 'drizzle-orm';
import { 
    sqliteTable, 
    text, 
    integer 
} from 'drizzle-orm/sqlite-core';

export const userLogs = sqliteTable('user_logs', {
	id: text("id").primaryKey(),
	email: text(),
	full_name: text(),
	rnb: text(),
	sucursal_code: text(),
	is_premium: integer('is_premium', { mode: 'boolean' }).notNull().default(false),
});

export const userRelations = relations(userLogs, ({ many }) => ({
	loginLogs: many(loginLogs),
	eventLogs: many(eventLogs),
}));