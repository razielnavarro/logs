import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { loginLogs } from '../entities';
import { Env } from '../common/types';
import { getConnInfo } from 'hono/cloudflare-workers'
import { apiKeyMiddleware } from "../middleware";

export const loginController = new Hono<Env>();

loginController.post('/', apiKeyMiddleware, async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    const info = getConnInfo(c);
    const ip = info.remote.address || 'Unknown';
    const inputData = { ...data, ip };
    try {
    const [record] = await db.insert(loginLogs).values(inputData).returning();
    return c.json({ record });
    } catch (error) {
        console.error("Error inserting data: ", error);
        return c.json({ error: "Internal Server Error" }, 500);
        }
});


export default loginController;
