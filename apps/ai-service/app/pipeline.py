import re
from dataclasses import asdict, dataclass
from datetime import datetime, timezone

@dataclass
class ParsedGiveaway:
    token: str | None
    amount: str | None
    requirements: list[str]
    deadline: str | None

class DiscoveryAgent:
    """Organizes public giveaway information supplied to the service."""
    def run(self, text: str) -> dict:
        return {"source_text": text.strip(), "urls": re.findall(r"https?://[^\s]+", text)}

class ParserAgent:
    def run(self, text: str) -> ParsedGiveaway:
        amount_match = re.search(r"\b(\d+(?:\.\d+)?)\s*(SOL|USDC|USDT|ETH|BTC)\b", text, re.IGNORECASE)
        token = amount_match.group(2).upper() if amount_match else None
        amount = f"{amount_match.group(1)} {token}" if amount_match else None
        requirements = [phrase for phrase in ["follow" if re.search(r"\bfollow\b", text, re.I) else None, "repost" if re.search(r"\b(repost|retweet)\b", text, re.I) else None, "reply" if re.search(r"\b(reply|comment)\b", text, re.I) else None] if phrase]
        deadline_match = re.search(r"(?:ends?|deadline)[:\s]+([^\n.]+)", text, re.IGNORECASE)
        return ParsedGiveaway(token, amount, requirements, deadline_match.group(1).strip() if deadline_match else None)

class EvidenceAgent:
    def run(self, discovery: dict) -> list[dict]:
        text = discovery["source_text"].lower()
        evidence = []
        if "winner" in text and ("confirmed" in text or "congrats" in text): evidence.append({"type": "WINNER_CONFIRMATION", "confidence": 0.75})
        if "tx" in text or "transaction" in text or "explorer" in text: evidence.append({"type": "TRANSACTION_PROOF", "confidence": 0.8})
        if "scam" in text: evidence.append({"type": "SCAM_REPORT", "confidence": 0.6})
        return evidence

class VerificationAgent:
    def run(self, evidence: list[dict]) -> dict:
        types = {item["type"] for item in evidence}
        score = 50 + (20 if "WINNER_CONFIRMATION" in types else 0) + (25 if "TRANSACTION_PROOF" in types else 0) - (40 if "SCAM_REPORT" in types else 0)
        if not evidence: score -= 15
        score = max(0, min(100, score))
        return {"score": score, "risk": "LOW" if score >= 70 else "MEDIUM" if score >= 40 else "HIGH", "confidence": round(sum(item["confidence"] for item in evidence) / len(evidence), 2) if evidence else 0.0}

class ReportAgent:
    def run(self, parsed: ParsedGiveaway, evidence: list[dict], verification: dict) -> str:
        evidence_text = "No public supporting evidence was identified in the supplied text." if not evidence else f"{len(evidence)} public evidence signal(s) were identified."
        return f"Parsed {parsed.amount or 'an unquantified'} {parsed.token or 'crypto'} giveaway. {evidence_text} Current risk is {verification['risk']}. This is research assistance, not a guarantee."

def analyze_giveaway(tweet_text: str) -> dict:
    discovery = DiscoveryAgent().run(tweet_text)
    parsed = ParserAgent().run(discovery["source_text"])
    evidence = EvidenceAgent().run(discovery)
    verification = VerificationAgent().run(evidence)
    summary = ReportAgent().run(parsed, evidence, verification)
    return {"parsed": asdict(parsed), "evidence": evidence, "verification": verification, "summary": summary, "analyzed_at": datetime.now(timezone.utc).isoformat()}
