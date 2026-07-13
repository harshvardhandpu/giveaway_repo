from datetime import datetime, timezone

class InvestigationAgent:
    """Explainable public-evidence investigator. It never takes social actions."""
    def confidence(self, item: dict) -> dict:
        extraction = float(item.get("confidence", 0.5)); source = float(item.get("source_reliability", 0.7)); relationship = float(item.get("relationship_confidence", 0.7)); recency = float(item.get("recency_score", 0.8)); uniqueness = float(item.get("uniqueness_score", 0.8))
        overall = round(source * .2 + extraction * .3 + relationship * .2 + recency * .15 + uniqueness * .15, 2)
        return {**item, "confidence_breakdown": {"source_reliability": source, "extraction_confidence": extraction, "relationship_confidence": relationship, "recency_score": recency, "uniqueness_score": uniqueness, "overall_confidence": overall}}
    def investigate(self, evidence: list[dict]) -> dict:
        enriched = [self.confidence(item) for item in evidence]
        timeline = sorted(enriched, key=lambda item: item.get("date", "9999-12-31"))
        texts = " ".join(item.get("text", "").lower() for item in enriched)
        contradictions = []
        if "winner" in texts and any(phrase in texts for phrase in ("never received", "did not receive", "unpaid")): contradictions.append({"type": "WINNER_UNPAID", "confidence": 0.88, "explanation": "A winner announcement conflicts with a public non-receipt statement."})
        if "deleted" in texts and not any(item.get("type") in ("WINNER_CONFIRMATION", "TRANSACTION_PROOF") for item in enriched): contradictions.append({"type": "DELETED_MISSING_PROOF", "confidence": 0.73, "explanation": "Deleted giveaway has no public completion evidence."})
        winners = {item.get("winner") for item in enriched if item.get("winner")}
        successful = sum(item.get("type") in ("WINNER_CONFIRMATION", "TRANSACTION_PROOF") for item in enriched)
        overall = round(sum(item["confidence_breakdown"]["overall_confidence"] for item in enriched) / len(enriched), 2) if enriched else 0.0
        level = "HIGH" if overall >= .75 and not contradictions else "MEDIUM" if overall >= .45 else "LOW"
        narrative = f"This creator has {len(enriched)} public evidence items. {successful} completion signals and {len(winners)} identified winners were found. {'No major contradictions were detected.' if not contradictions else f'{len(contradictions)} contradiction(s) require review.'} Overall confidence: {level}."
        return {"timeline": timeline, "contradictions": contradictions, "confidence": overall, "confidence_level": level, "successful_signals": successful, "narrative": narrative, "investigated_at": datetime.now(timezone.utc).isoformat()}
