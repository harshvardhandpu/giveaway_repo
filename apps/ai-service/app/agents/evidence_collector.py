import re

EVIDENCE_TYPES = {"WINNER_ANNOUNCEMENT", "WINNER_CONFIRMATION", "QUOTE_TWEET", "TRANSACTION_PROOF", "SCREENSHOT_PROOF", "COMMUNITY_FEEDBACK", "HISTORICAL_GIVEAWAY"}

class EvidenceCollectorAgent:
    """Classifies proof signals in supplied public posts. No account actions are performed."""
    def analyze_post(self, text: str) -> dict:
        lower = text.lower()
        winner = re.search(r"(?:congrats|congratulations)\s+@([a-zA-Z0-9_]+).*?(?:won|winner)", text, re.I)
        received = re.search(r"@([a-zA-Z0-9_]+).*?(?:received|got|thank you|thanks)", text, re.I)
        amount = re.search(r"\b(\d+(?:\.\d+)?)\s*(SOL|USDC|USDT|ETH|BTC)\b", text, re.I)
        evidence_type = None
        confidence = 0.55
        username = None
        if winner: evidence_type, confidence, username = "WINNER_ANNOUNCEMENT", 0.91, winner.group(1)
        elif received: evidence_type, confidence, username = "WINNER_CONFIRMATION", 0.84, received.group(1)
        elif any(term in lower for term in ("txid", "transaction", "solscan", "etherscan")): evidence_type, confidence = "TRANSACTION_PROOF", 0.88
        elif any(term in lower for term in ("screenshot", "receipt attached", "proof attached")): evidence_type, confidence = "SCREENSHOT_PROOF", 0.72
        elif "quote" in lower or "quoted" in lower: evidence_type, confidence = "QUOTE_TWEET", 0.66
        elif any(term in lower for term in ("vouch", "legit", "paid out")): evidence_type, confidence = "COMMUNITY_FEEDBACK", 0.68
        elif any(term in lower for term in ("last giveaway", "previous giveaway", "history")): evidence_type, confidence = "HISTORICAL_GIVEAWAY", 0.64
        return {"type": evidence_type, "winner": username, "amount": f"{amount.group(1)} {amount.group(2).upper()}" if amount else None, "confidence": confidence, "text": text}

    def collect(self, posts: list[str]) -> list[dict]:
        return [item for item in (self.analyze_post(post) for post in posts) if item["type"]]
