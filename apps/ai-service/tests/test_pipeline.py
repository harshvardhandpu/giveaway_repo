from app.pipeline import analyze_giveaway

def test_pipeline_extracts_and_scores_evidence():
    result = analyze_giveaway("Giving away 5 SOL. Winner confirmed. Transaction tx: https://example.com/tx")
    assert result["parsed"]["token"] == "SOL"
    assert result["verification"]["score"] == 95
    assert result["verification"]["risk"] == "LOW"

def test_pipeline_flags_missing_evidence():
    result = analyze_giveaway("New community giveaway, ends Friday")
    assert result["verification"]["score"] == 35
    assert result["verification"]["risk"] == "HIGH"
