import { describe, expect, it } from "vitest";
import { calculateTrustScore } from "../src/lib/trust-score.js";
import { calculateEvidenceTrustScore } from "../src/lib/trust-score.js";
describe("calculateTrustScore", () => {
  it("adds positive evidence and produces low risk", () => { expect(calculateTrustScore({ winnerConfirmation: true, transactionProof: true, longHistory: true, multipleCompletedGiveaways: true })).toMatchObject({ score: 100, risk: "LOW" }); });
  it("subtracts risk signals and clamps the score", () => { expect(calculateTrustScore({ noEvidence: true, deletedGiveaway: true, scamReports: true })).toMatchObject({ score: 0, risk: "HIGH" }); });
});
describe("calculateEvidenceTrustScore", () => { it("weights public evidence into a high-confidence result", () => { expect(calculateEvidenceTrustScore({ transactionProofs: 3, winnerConfirmations: 12, confirmedWinners: 12, historicalSuccess: true, creatorAgeDays: 365, scamReports: 0, missingProof: false, suspiciousPattern: false })).toMatchObject({ score: 100, rating: "HIGH" }); }); });
