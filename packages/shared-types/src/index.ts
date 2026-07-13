export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface TrustScoreResult {
  score: number;
  risk: RiskLevel;
  rating?: "HIGH" | "MODERATE" | "LOW";
  confidence?: number;
  reasons: string[];
}

export interface GiveawaySummary {
  id: string;
  title: string;
  token?: string | null;
  amount?: string | null;
  deadline?: string | null;
  status: "ACTIVE" | "COMPLETED" | "DELETED" | "UNKNOWN";
  creatorUsername: string;
}

export interface CreatorReport {
  username: string;
  trustScore: number;
  giveaways: GiveawaySummary[];
  evidence: Array<{ type: string; url: string; confidence: number; description: string }>;
  riskLevel: RiskLevel;
  reasons: string[];
  stats?: { totalGiveaways: number; confirmedWinners: number; evidenceCollected: number };
  timeline?: Array<{ date: string; title: string; description: string; type: string }>;
}
