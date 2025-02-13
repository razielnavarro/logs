import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { loginLogs } from '../entities';
import { inputSchema } from '../validators/inputValidator';
import { Env } from '../common/types';
import { getConnInfo } from 'hono/cloudflare-workers'

export const loginController = new Hono<{Bindings: Env}>();

loginController.post('/login', async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    const info = getConnInfo(c);
    const ip = info.remote.address || 'Unknown';
    const inputData = { ...data, ip };
    const parsed = inputSchema.safeParse(inputData);
    if (!parsed.success) {
        return c.json({ error: parsed.error }, 400);
    }
    const [record] = await db.insert(loginLogs).values(data).returning();
    return c.json({ record });
});


export default loginController;
