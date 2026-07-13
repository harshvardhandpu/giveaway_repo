import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { createBullBoard } from "@bull-board/api";
import { FastifyAdapter } from "@bull-board/fastify";
import { creatorUpdateQueue, discoveryQueue, evidenceRefreshQueue, trustScoreQueue } from "../workers/index.js";
import type { FastifyInstance } from "fastify";
export function registerBullBoard(app: FastifyInstance) { const adapter = new FastifyAdapter(); adapter.setBasePath("/admin/queues"); createBullBoard({ queues: [discoveryQueue,evidenceRefreshQueue,creatorUpdateQueue,trustScoreQueue].map(queue => new BullMQAdapter(queue)), serverAdapter: adapter }); app.register(adapter.registerPlugin(), { prefix: "/admin/queues" }); }
