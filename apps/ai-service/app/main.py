from fastapi import FastAPI
from pydantic import BaseModel, Field
from .pipeline import analyze_giveaway

app = FastAPI(title="Giveaway Intelligence AI Service", version="0.1.0")

class AnalyzeRequest(BaseModel):
    tweet_text: str = Field(min_length=2, max_length=10000)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
def analyze(payload: AnalyzeRequest):
    return analyze_giveaway(payload.tweet_text)
