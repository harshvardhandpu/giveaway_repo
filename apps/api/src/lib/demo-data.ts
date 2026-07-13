import type { CreatorReport, GiveawaySummary } from "@giveaway/shared-types";

const giveaways: GiveawaySummary[] = [
  { id: "g-aurora-sol", title: "SOL community giveaway", token: "SOL", amount: "5 SOL", deadline: "2026-07-20T18:00:00.000Z", status: "ACTIVE", creatorUsername: "aurora_chain" },
  { id: "g-aurora-usdc", title: "USDC builder giveaway", token: "USDC", amount: "250 USDC", deadline: "2026-06-30T18:00:00.000Z", status: "COMPLETED", creatorUsername: "aurora_chain" },
  { id: "g-orbit-sol", title: "SOL launch giveaway", token: "SOL", amount: "2 SOL", deadline: "2026-07-18T18:00:00.000Z", status: "ACTIVE", creatorUsername: "orbit_rewards" }
];

const reports: Record<string, CreatorReport> = {
  aurora_chain: { username: "aurora_chain", trustScore: 85, riskLevel: "LOW", giveaways: giveaways.filter((g) => g.creatorUsername === "aurora_chain"), evidence: [{ type: "WINNER_CONFIRMATION", url: "https://example.com/public-winner-post", confidence: 0.91, description: "Public winner confirmation referenced by the creator." }, { type: "TRANSACTION_PROOF", url: "https://example.com/public-transaction", confidence: 0.88, description: "Public transaction reference for a completed giveaway." }], reasons: ["12 confirmed winners", "3 transaction proofs", "Historical giveaway success"], stats: { totalGiveaways: 8, confirmedWinners: 12, evidenceCollected: 21 }, timeline: [{ date: "July 1", title: "Giveaway created", description: "Public SOL giveaway post recorded.", type: "CREATED" }, { date: "July 2", title: "Winner announced", description: "Winner announcement detected in a public post.", type: "WINNER_ANNOUNCEMENT" }, { date: "July 3", title: "Winner confirmed receipt", description: "Public confirmation and transaction reference collected.", type: "WINNER_CONFIRMATION" }] },
  orbit_rewards: { username: "orbit_rewards", trustScore: 35, riskLevel: "HIGH", giveaways: giveaways.filter((g) => g.creatorUsername === "orbit_rewards"), evidence: [], reasons: ["No verifiable evidence found"] }
};

export function searchDemoGiveaways(keyword: string) { const query = keyword.toLowerCase(); return giveaways.filter((giveaway) => `${giveaway.title} ${giveaway.token} ${giveaway.creatorUsername}`.toLowerCase().includes(query)); }
export function getDemoCreator(username: string) { return reports[username.toLowerCase()]; }
