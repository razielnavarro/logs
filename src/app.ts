import { Hono } from "hono";
import { Env } from "./common/types";
import {
  eventsController,
  userController,
  loginController,
} from "./controllers";

const app = new Hono<{Bindings: Env}>();

app.route("/events", eventsController);
app.route("/user", userController);
app.route("/login", loginController);

export default app;