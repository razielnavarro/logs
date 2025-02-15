import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { userLogs } from '../entities';
import { Env } from '../common/types';
import { userSchema } from "../schemas/user.schema";
import { apiKeyMiddleware } from "../middleware";

export const userController = new Hono<Env>();

userController.post('/', apiKeyMiddleware, async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    const parsed = userSchema.safeParse(data);
    if (!parsed.success) {
        return c.json({ error: parsed.error}, 400);
    }
    const [record] = await db.insert(userLogs).values(data).returning();
    return c.json({ record });
});

export default userController;
