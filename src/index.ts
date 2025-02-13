import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { userLogs, loginLogs, eventLogs } from './entities';
import { inputSchema } from './validators/inputValidator';
import { getConnInfo } from 'hono/cloudflare-workers'
import { Env } from './common/types';

const app = new Hono<{ Bindings: Env }>();
app.route("/", app);

export default app;