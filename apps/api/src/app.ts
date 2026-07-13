import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";
import { creatorRoutes } from "./routes/creator.js";
import { searchRoutes } from "./routes/search.js";

export function buildApp() {
  const app = Fastify({ logger: true });
  app.register(cors, { origin: process.env.CORS_ORIGIN?.split(",") ?? true });
  app.register(rateLimit, { max: 60, timeWindow: "1 minute" });
  app.get("/health", async () => ({ status: "ok" }));
  app.register(searchRoutes);
  app.register(creatorRoutes);
  return app;
}
