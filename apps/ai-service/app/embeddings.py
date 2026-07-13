import hashlib
import math

class EmbeddingService:
    """Deterministic Phase 2 embedding adapter. Swap create_embedding with a model provider in production."""
    def __init__(self): self._memory: list[dict] = []
    def create_embedding(self, text: str) -> list[float]:
        digest = hashlib.sha256(text.lower().encode()).digest()
        values = [byte / 255 for byte in digest[:16]]
        norm = math.sqrt(sum(value * value for value in values)) or 1
        return [round(value / norm, 6) for value in values]
    def store_evidence(self, evidence: dict) -> dict:
        record = {**evidence, "embedding": self.create_embedding(evidence["text"])}
        self._memory.append(record)
        return record
    def search_related_evidence(self, query: str, limit: int = 5) -> list[dict]:
        vector = self.create_embedding(query)
        def similarity(item): return sum(a * b for a, b in zip(vector, item["embedding"]))
        return [{key: value for key, value in item.items() if key != "embedding"} for item in sorted(self._memory, key=similarity, reverse=True)[:limit]]
