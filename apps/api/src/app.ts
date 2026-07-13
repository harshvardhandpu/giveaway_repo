import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";
import { creatorRoutes } from "./routes/creator.js";
import { searchRoutes } from "./routes/search.js";
import { discoveryRoutes } from "./routes/discovery.js";
import { investigationRoutes } from "./routes/investigation.js";
import { evaluationRoutes } from "./routes/evaluation.js";
import { connectorRoutes } from "./routes/connectors.js";
import { authRoutes } from "./routes/auth.js";
import { incrementRequests, operationsRoutes } from "./routes/operations.js";
import { config } from "./lib/config.js";

export function buildApp() {
  const app = Fastify({ logger: true });
  app.addHook("onRequest",async(request)=>{incrementRequests();request.headers["x-request-id"]??=crypto.randomUUID();});
  app.addHook("onSend",async(_request,reply)=>{reply.header("x-content-type-options","nosniff").header("x-frame-options","DENY").header("referrer-policy","no-referrer");});
  app.register(cors, { origin: config.CORS_ORIGIN.split(","), credentials:true });
  app.register(rateLimit, { max: 60, timeWindow: "1 minute" });
  app.get("/health", async () => ({ status: "ok" }));
  app.register(searchRoutes);
  app.register(creatorRoutes);
  app.register(discoveryRoutes);
  app.register(investigationRoutes);
  app.register(evaluationRoutes);
  app.register(connectorRoutes);
  app.register(authRoutes);app.register(operationsRoutes);
  return app;
}
