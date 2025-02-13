import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";

import { Env } from "./common/types";

export const apiKeyMiddleware = createMiddleware<{Bindings: Env}>(async (c, next) => {
  const apiKey = c.req.header("api-key");
  if (!apiKey || apiKey !== c.env.API_KEY) {
    return c.json({ error: "No autorizado" }, 401);
  }
  await next();
});