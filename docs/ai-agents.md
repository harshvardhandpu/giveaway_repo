# AI Agents

- `EvidenceCollectorAgent`: extracts public proof signals, winner handles, amounts, confidence, and evidence type.
- `ParserAgent`: extracts giveaway terms and requirements.
- `EmbeddingService`: creates deterministic development embeddings, stores evidence records, and retrieves related public evidence. Replace its embedding provider and memory adapter with Qdrant-backed production clients through environment configuration.
- `VerificationAgent`: produces explainable risk signals. It is decision support, not a guarantee.
