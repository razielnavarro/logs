import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { loginLogs } from '../entities';
import { Env } from '../common/types';
import { loginSchema } from "../schemas/login.schema";
import { getConnInfo } from 'hono/cloudflare-workers'
import { apiKeyMiddleware } from "../middleware";
import { generateId } from '../utils/random';

export const loginController = new Hono<Env>();

loginController.post('/', apiKeyMiddleware, async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    const id = generateId();
    const info = getConnInfo(c);
    const ip = info.remote.address || 'Unknown';
    const inputData = { ...data, id, ip };
    const parsed = loginSchema.safeParse(inputData);
    if (!parsed.success) {
        return c.json({ error: parsed.error }, 400);
    }
    const [record] = await db.insert(loginLogs).values(inputData).returning();
    return c.json({ record });
});


export default loginController;
