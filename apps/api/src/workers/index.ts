import { Queue, Worker } from "bullmq";
const redisUrl = new URL(process.env.REDIS_URL ?? "redis://localhost:6379");
const connection = { host: redisUrl.hostname, port: Number(redisUrl.port || 6379), maxRetriesPerRequest: null };
export const discoveryQueue = new Queue("discovery", { connection });
export const evidenceRefreshQueue = new Queue("evidence-refresh", { connection });
export const creatorUpdateQueue = new Queue("creator-update", { connection });
export const trustScoreQueue = new Queue("trust-score", { connection });
export function startWorkers() { return [new Worker("discovery", async () => ({ status: "discovered" }), { connection }), new Worker("evidence-refresh", async () => ({ status: "refreshed" }), { connection }), new Worker("creator-update", async () => ({ status: "updated" }), { connection }), new Worker("trust-score", async () => ({ status: "scored" }), { connection })]; }
export async function scheduleRecurringJobs() { await discoveryQueue.upsertJobScheduler("discover-public-content", { pattern: "*/5 * * * *" }, { name: "discover" }); await evidenceRefreshQueue.upsertJobScheduler("refresh-evidence", { pattern: "*/10 * * * *" }, { name: "refresh" }); await trustScoreQueue.upsertJobScheduler("recalculate-trust", { pattern: "*/15 * * * *" }, { name: "score" }); }
