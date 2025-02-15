import { sql } from 'drizzle-orm';
import { generateId } from '../utils/random';
import { 
    sqliteTable, 
    text,  
} from 'drizzle-orm/sqlite-core';

export const eventLogs = sqliteTable('event_logs', {
    id: text("id").primaryKey(),
    event_name: text(),
    module: text(),
    data: text(),
    userId: text()
});