from fastapi import FastAPI
from pydantic import BaseModel, Field
from .pipeline import analyze_giveaway, analyze_evidence
from .agents import InvestigationAgent

app = FastAPI(title="Giveaway Intelligence AI Service", version="0.1.0")

class AnalyzeRequest(BaseModel):
    tweet_text: str = Field(min_length=2, max_length=10000)
class EvidenceRequest(BaseModel):
    posts: list[str] = Field(min_length=1, max_length=100)
    query: str = Field(default="", max_length=500)
class InvestigationRequest(BaseModel): evidence: list[dict] = Field(min_length=1, max_length=500)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
def analyze(payload: AnalyzeRequest):
    return analyze_giveaway(payload.tweet_text)
@app.post("/evidence/analyze")
def evidence(payload: EvidenceRequest):
    return analyze_evidence(payload.posts, payload.query)
@app.post("/investigate")
def investigate(payload: InvestigationRequest): return InvestigationAgent().investigate(payload.evidence)
