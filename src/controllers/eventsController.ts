import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { eventLogs } from '../entities';
import { inputSchema } from '../validators/inputValidator';
import { Env } from '../common/types';

export const eventsController = new Hono<Env>();

eventsController.post('/', async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    const parsed = inputSchema.safeParse(data);
    if (!parsed.success) {
        return c.json({ error: parsed.error }, 400);
    }
    const [record] = await db.insert(eventLogs).values(data).returning();
    return c.json({ record });
});

export default eventsController;
