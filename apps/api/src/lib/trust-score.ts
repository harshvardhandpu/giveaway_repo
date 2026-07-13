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

export interface EvidenceScoreInput { transactionProofs: number; winnerConfirmations: number; confirmedWinners: number; historicalSuccess: boolean; creatorAgeDays: number; scamReports: number; missingProof: boolean; suspiciousPattern: boolean; }

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

export function calculateEvidenceTrustScore(input: EvidenceScoreInput): TrustScoreResult {
  let score = 50;
  const reasons: string[] = [];
  if (input.transactionProofs) { score += 30; reasons.push(`${input.transactionProofs} transaction proof${input.transactionProofs === 1 ? "" : "s"}`); }
  if (input.winnerConfirmations) { score += 20; reasons.push(`${input.winnerConfirmations} winner confirmation${input.winnerConfirmations === 1 ? "" : "s"}`); }
  if (input.confirmedWinners >= 2) { score += 15; reasons.push(`${input.confirmedWinners} confirmed winners`); }
  if (input.historicalSuccess) { score += 15; reasons.push("Historical giveaway success"); }
  if (input.creatorAgeDays >= 180) { score += 10; reasons.push("Established creator history"); }
  if (input.scamReports) { score -= 40; reasons.push(`${input.scamReports} public scam report${input.scamReports === 1 ? "" : "s"}`); }
  if (input.missingProof) { score -= 15; reasons.push("Missing public proof"); }
  if (input.suspiciousPattern) { score -= 20; reasons.push("Suspicious public pattern"); }
  score = Math.max(0, Math.min(100, score));
  const confidence = Math.min(0.98, Number((0.42 + Math.min(0.5, (input.transactionProofs + input.winnerConfirmations + input.confirmedWinners) * 0.07)).toFixed(2)));
  return { score, risk: score >= 70 ? "LOW" : score >= 40 ? "MEDIUM" : "HIGH", rating: score >= 70 ? "HIGH" : score >= 40 ? "MODERATE" : "LOW", confidence, reasons };
}
