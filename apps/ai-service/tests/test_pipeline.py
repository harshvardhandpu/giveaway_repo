from app.pipeline import analyze_giveaway
from app.agents.evidence_collector import EvidenceCollectorAgent

def test_pipeline_extracts_and_scores_evidence():
    result = analyze_giveaway("Giving away 5 SOL. Winner confirmed. Transaction tx: https://example.com/tx")
    assert result["parsed"]["token"] == "SOL"
    assert result["verification"]["score"] == 95
    assert result["verification"]["risk"] == "LOW"

def test_pipeline_flags_missing_evidence():
    result = analyze_giveaway("New community giveaway, ends Friday")
    assert result["verification"]["score"] == 35
    assert result["verification"]["risk"] == "HIGH"

def test_winner_announcement_extraction():
    result = EvidenceCollectorAgent().analyze_post("Congrats @alice you won 5 SOL giveaway")
    assert result["type"] == "WINNER_ANNOUNCEMENT"
    assert result["winner"] == "alice"
    assert result["amount"] == "5 SOL"
    assert result["confidence"] == 0.91

def test_payment_evidence_classification():
    assert EvidenceCollectorAgent().analyze_post("Payment sent, txid is public on Solscan")["type"] == "TRANSACTION_PROOF"
