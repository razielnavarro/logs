import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { eventLogs } from '../entities';
import { Env } from '../common/types';
import { eventsSchema } from "../schemas/events.schema";
import { apiKeyMiddleware } from "../middleware";

export const eventsController = new Hono<Env>();

eventsController.post('/', apiKeyMiddleware, async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    const parsed = eventsSchema.safeParse(data);
    if (!parsed.success) {
        return c.json({ error: parsed.error }, 400);
    }
    const [record] = await db.insert(eventLogs).values(data).returning();
    return c.json({ record });
});

export default eventsController;
