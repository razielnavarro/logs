import { Hono } from "hono";
import { drizzle } from 'drizzle-orm/d1';
import { userLogs } from '../entities';
import { Env } from '../common/types';
import { apiKeyMiddleware } from "../middleware";

export const userController = new Hono<Env>();

userController.post('/', apiKeyMiddleware, async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    try {
    const [record] = await db.insert(userLogs).values(data).returning();
    return c.json({ record });
    } catch (error) {
        console.error("Error inserting data: ", error);
        return c.json({ error: "Internal Server Error" }, 500);
        }
});

export default userController;
