import { Hono } from "hono";

import type { Env } from "./common/types";
import {
  backgroundController,
  categoryController,
  giftCardController,
} from "./controllers";

const app = new Hono<Env>();

app.route("/events", eventsController);
app.route("/user", userController);
app.route("/login", loginController);

export default app;