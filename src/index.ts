import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { user, loginLogs, eventLogs } from './entities';
import { inputSchema } from './validators/inputValidator';
import { getConnInfo } from 'hono/cloudflare-workers'

export type Env = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();
app.route("/", app);

// POST endpoint for evengLogs
app.post('/events', async (c) => {
	const db = drizzle(c.env.DB);
	const data = await c.req.json();
	const parsed = inputSchema.safeParse(data);
	if (!parsed.success) {
		return c.json({ error: parsed.error }, 400);
	}
	const [record] = await db.insert(eventLogs).values(data).returning();
	return c.json({ record });
});

// POST endpoint for loginLogs
app.post('/user', async (c) => {
	const db = drizzle(c.env.DB);
	const data = await c.req.json();
	const parsed = inputSchema.safeParse(data);
	if (!parsed.success) {
		return c.json({ error: parsed.error }, 400);
	}
	const [record] = await db.insert(user).values(data).returning();
	return c.json({ record });
});

// POST endpoint for user
app.post('/login', async (c) => {
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

export default app;