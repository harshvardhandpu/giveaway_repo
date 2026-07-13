from app.agents.investigation import InvestigationAgent
def test_detects_winner_nonreceipt_contradiction():
    result = InvestigationAgent().investigate([{ "type": "WINNER_ANNOUNCEMENT", "text": "Winner @alice announced", "date": "2026-05-01", "winner": "alice", "confidence": .9 }, { "type": "COMMUNITY_FEEDBACK", "text": "@alice says never received", "date": "2026-05-02", "confidence": .8 }])
    assert result["contradictions"][0]["type"] == "WINNER_UNPAID"
    assert result["confidence"] > 0
