import { sql } from 'drizzle-orm';
import { 
    sqliteTable, 
    text, 
    integer 
} from 'drizzle-orm/sqlite-core';

export const userLogs = sqliteTable('user', {
	id: text(),
	email: text(),
	full_name: text(),
	rnb: text(),
	sucursal_code: text(),
	isPremium: integer('is_premium', { mode: 'boolean' }).notNull().default(false),
});
