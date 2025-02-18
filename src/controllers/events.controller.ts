import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { eventLogs } from '../entities';
import { Env } from '../common/types';
import { eventsSchema } from "../schemas/events.schema";
import { authMiddleware } from "../middleware";
import { getConnInfo } from "hono/cloudflare-workers";

export const eventsController = new Hono<Env>();

eventsController.post('/', authMiddleware, async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    const customerId = c.get('customerId');
    console.log('customerId', customerId);
    const user_agent = c.req.header('User-Agent') || 'Unknown';
    const country = c.req.header('CF-IPCountry') || 'Unknown';
    const info = getConnInfo(c);
    const ip = info.remote.address || 'Unknown';
    const inputData = { ...data, ip, user_agent, country, user_id: customerId };
    const parsed = eventsSchema.safeParse(inputData);
    if (!parsed.success) {
        return c.json({ error: parsed.error }, 400);
    }
    const [record] = await db.insert(eventLogs).values(inputData).returning();

    return c.json({ record });
});

export default eventsController;
