import { describe, expect, it } from "vitest";
import { calculateTrustScore } from "../src/lib/trust-score.js";
describe("calculateTrustScore", () => {
  it("adds positive evidence and produces low risk", () => { expect(calculateTrustScore({ winnerConfirmation: true, transactionProof: true, longHistory: true, multipleCompletedGiveaways: true })).toMatchObject({ score: 100, risk: "LOW" }); });
  it("subtracts risk signals and clamps the score", () => { expect(calculateTrustScore({ noEvidence: true, deletedGiveaway: true, scamReports: true })).toMatchObject({ score: 0, risk: "HIGH" }); });
});
