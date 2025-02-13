import { sql } from 'drizzle-orm';
import { 
    sqliteTable, 
    text,  
} from 'drizzle-orm/sqlite-core';

export const eventLogs = sqliteTable('event_logs', {
    id: text(),
    event_name: text(),
    module: text(),
    data: text(),
    userId: text()
});