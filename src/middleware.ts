import { createMiddleware } from "hono/factory";

import { Env } from "./common/types";

export const apiKeyMiddleware = createMiddleware<Env>(async (c, next) => {
  const apiKey = c.req.header("api-key");
  if (!apiKey || apiKey !== c.env.API_KEY) {
    return c.json({ error: "No autorizado" }, 401);
  }
  await next();
});