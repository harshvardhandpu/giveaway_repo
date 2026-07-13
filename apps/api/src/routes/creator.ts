import type { FastifyPluginAsync } from "fastify";
import { getDemoCreator } from "../lib/demo-data.js";
import { cached } from "../lib/cache.js";

export const creatorRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Params: { username: string } }>("/api/creator/:username", async (request, reply) => {
    const username = request.params.username.replace(/^@/, "");
    if (!/^[a-zA-Z0-9_]{1,30}$/.test(username)) return reply.code(400).send({ error: "invalid username" });
    const creator = await cached(`creator:${username}`, async () => getDemoCreator(username), 60);
    return creator ?? reply.code(404).send({ error: "creator report not found" });
  });
};
