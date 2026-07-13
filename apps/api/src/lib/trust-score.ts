import type { RiskLevel, TrustScoreResult } from "@giveaway/shared-types";

export interface TrustSignals {
  winnerConfirmation?: boolean;
  transactionProof?: boolean;
  longHistory?: boolean;
  multipleCompletedGiveaways?: boolean;
  noEvidence?: boolean;
  deletedGiveaway?: boolean;
  scamReports?: boolean;
}

const signals: Array<[keyof TrustSignals, number, string]> = [
  ["winnerConfirmation", 20, "Winner confirmation found"],
  ["transactionProof", 25, "Transaction proof found"],
  ["longHistory", 15, "Long giveaway history"],
  ["multipleCompletedGiveaways", 15, "Multiple completed giveaways"],
  ["noEvidence", -15, "No verifiable evidence found"],
  ["deletedGiveaway", -20, "Deleted giveaway detected"],
  ["scamReports", -40, "Public scam reports found"]
];

export function calculateTrustScore(input: TrustSignals): TrustScoreResult {
  const score = Math.max(0, Math.min(100, signals.reduce((total, [key, points]) => total + (input[key] ? points : 0), 50)));
  const risk: RiskLevel = score >= 70 ? "LOW" : score >= 40 ? "MEDIUM" : "HIGH";
  return { score, risk, reasons: signals.filter(([key]) => input[key]).map(([, , reason]) => reason) };
}
