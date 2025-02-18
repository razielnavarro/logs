import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { loginLogs } from '../entities';
import { Env } from '../common/types';
import { loginSchema } from "../schemas/login.schema";
import { apiKeyMiddleware } from "../middleware";


export const loginController = new Hono<Env>();

loginController.post('/', apiKeyMiddleware, async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
        return c.json({ error: parsed.error }, 400);
    }
    const [record] = await db.insert(loginLogs).values(data).returning();

    return c.json({ record });
});


export default loginController;
