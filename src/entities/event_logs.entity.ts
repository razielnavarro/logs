import { sql } from 'drizzle-orm';
import { generateId } from '../utils/random';
import { relations } from 'drizzle-orm';
import { userLogs } from './user_logs.entity';
import { 
    sqliteTable, 
    text,  
} from 'drizzle-orm/sqlite-core';

export const eventLogs = sqliteTable('event_logs', {
    id: text("id").primaryKey().$defaultFn(() => generateId()),
    event_name: text(),
    module: text(),
    data: text(),
    user_id: text().references(() => userLogs.id),
    ip: text(),
    country: text(),
    user_agent: text()
,});

export const eventRelations = relations(eventLogs, ({ one }) => ({
    userLogs: one(userLogs, {
        fields: [eventLogs.user_id],
        references: [userLogs.id],
    }),
}));