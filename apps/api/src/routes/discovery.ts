import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { DemoDiscoveryProvider } from "../discovery/demo-provider.js";
import { DiscoveryService } from "../discovery/service.js";
const discovery = new DiscoveryService(new DemoDiscoveryProvider());
const watchlists = new Map<string, { id: string; kind: "KEYWORD" | "CREATOR"; value: string; enabled: boolean; createdAt: string; lastChecked?: string }>();
export const discoveryRoutes: FastifyPluginAsync = async (app) => {
  app.get("/discover", async (request, reply) => { const parsed = z.object({ keyword: z.string().min(2).max(120) }).safeParse(request.query); if (!parsed.success) return reply.code(400).send({ error: "keyword is required" }); return { posts: await discovery.discover(parsed.data.keyword) }; });
  app.get("/watchlists", async () => ({ watchlists: [...watchlists.values()] }));
  app.post("/watchlists", async (request, reply) => { const parsed = z.object({ kind: z.enum(["KEYWORD", "CREATOR"]), value: z.string().min(2).max(120) }).safeParse(request.body); if (!parsed.success) return reply.code(400).send({ error: "kind and value are required" }); const id = crypto.randomUUID(); const item = { id, ...parsed.data, enabled: true, createdAt: new Date().toISOString() }; watchlists.set(id, item); return reply.code(201).send(item); });
  app.delete<{ Params: { id: string } }>("/watchlists/:id", async (request, reply) => watchlists.delete(request.params.id) ? reply.code(204).send() : reply.code(404).send({ error: "watchlist not found" }));
  app.get<{ Params: { username: string } }>("/creator/history/:username", async (request) => ({ username: request.params.username, snapshots: [{ date: "2026-07-01", score: 72, riskLevel: "MEDIUM" }, { date: "2026-07-03", score: 81, riskLevel: "LOW" }, { date: "2026-07-09", score: 93, riskLevel: "LOW" }] }));
  app.get<{ Params: { username: string } }>("/creator/evidence/:username", async (request) => ({ username: request.params.username, evidence: await discovery.creatorHistory(request.params.username) }));
};
