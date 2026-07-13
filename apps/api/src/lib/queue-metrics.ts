import { discoveryQueue,evidenceRefreshQueue,creatorUpdateQueue,trustScoreQueue } from "../workers/index.js";
export async function queueMetrics(){const queues=[discoveryQueue,evidenceRefreshQueue,creatorUpdateQueue,trustScoreQueue];const values=await Promise.all(queues.map(async q=>({name:q.name,...await q.getJobCounts("waiting","active","failed","completed")})));return values;}
