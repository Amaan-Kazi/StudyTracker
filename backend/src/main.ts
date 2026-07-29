import deno_json from "../deno.json" with { type: "json" };
import { Hono } from "@hono/hono";

const app = new Hono();

app.get("/api/info", (c) => {
  return c.json({
    name: "Study Tracker",
    version: deno_json.version,
  }, 200);
});

if (import.meta.main) {
  const hostname = Deno.env.get("HOSTNAME");
  const port = Number(Deno.env.get("PORT"));

  Deno.serve({ hostname, port }, app.fetch);
}
