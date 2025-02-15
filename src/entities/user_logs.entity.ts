import { sql } from 'drizzle-orm';
import { generateId } from '../utils/random';
import { 
    sqliteTable, 
    text, 
    integer 
} from 'drizzle-orm/sqlite-core';

export const userLogs = sqliteTable('user', {
	id: text("id").primaryKey(),
	email: text(),
	full_name: text(),
	rnb: text(),
	sucursal_code: text(),
	is_premium: integer('is_premium', { mode: 'boolean' }).notNull().default(false),
});
