import { FormEvent, useState } from "react";
import { Button, Card, Input } from "@giveaway/ui";
import { useAppStore } from "../store";
export function SearchPage() {
  const [keyword, setKeyword] = useState("SOL giveaway"); const { search, results, loading, error, loadCreator } = useAppStore();
  const submit = (event: FormEvent) => { event.preventDefault(); void search(keyword); };
  return <main className="space-y-4"><div><p className="eyebrow">Public research</p><h1>Giveaway signals</h1><p className="muted">Search public giveaway topics and review evidence-backed creator reports.</p></div><form onSubmit={submit} className="search-form"><label htmlFor="keyword">Search topic</label><div className="search-row"><Input id="keyword" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="SOL giveaway" /><Button type="submit" disabled={loading}>{loading ? "Searching" : "Search"}</Button></div></form>{error && <p className="error" role="alert">{error}</p>}<div className="results">{results.map((item) => <Card key={item.id} className="result"><div><span className="token">{item.token ?? "Crypto"}</span><h2>{item.title}</h2><p className="muted">{item.amount ?? "Amount not parsed"} · {item.status.toLowerCase()}</p></div><Button variant="secondary" onClick={() => void loadCreator(item.creatorUsername)}>View @{item.creatorUsername}</Button></Card>)}{!loading && results.length === 0 && <Card><h2>Start with a topic</h2><p className="muted">Try “SOL giveaway” or “USDC giveaway” to see public research examples.</p></Card>}</div></main>;
}
