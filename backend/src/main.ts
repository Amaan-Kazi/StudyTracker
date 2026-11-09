import deno_json from "../deno.json" with { type: "json" };

import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";

import { auth } from "@/lib/auth.ts";
import db from "@/db/index.ts";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: process.env.FRONTEND_URL,

    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],

    maxAge: 600,
    credentials: true,
  }),
);

app.get("/api/info", (c) => {
  return c.json({
    name: "Study Tracker",
    version: deno_json.version,
  }, 200);
});

app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));

if (import.meta.main) {
  const hostname = Deno.env.get("HOSTNAME");
  const port = Number(Deno.env.get("PORT"));

  Deno.serve({ hostname, port }, app.fetch);
}
