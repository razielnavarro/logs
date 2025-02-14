import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { eventLogs } from '../entities';
import { Env } from '../common/types';
import { apiKeyMiddleware } from "../middleware";

export const eventsController = new Hono<Env>();

eventsController.post('/', apiKeyMiddleware, async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    try {
    const [record] = await db.insert(eventLogs).values(data).returning();
    return c.json({ record });
    } catch (error) {
        console.error("Error inserting data: ", error);
        return c.json({ error: "Internal Server Error" }, 500);
        }
});

export default eventsController;
