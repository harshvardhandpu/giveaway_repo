import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { searchDemoGiveaways } from "../lib/demo-data.js";

export const searchRoutes: FastifyPluginAsync = async (app) => {
  app.post("/api/search", async (request, reply) => {
    const parsed = z.object({ keyword: z.string().trim().min(2).max(120) }).safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: "keyword must be between 2 and 120 characters" });
    return { giveaways: searchDemoGiveaways(parsed.data.keyword) };
  });
};
