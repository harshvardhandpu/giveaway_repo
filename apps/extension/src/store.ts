import { create } from "zustand";
import type { CreatorReport, GiveawaySummary } from "@giveaway/shared-types";
type Page = "dashboard" | "search" | "profile" | "investigation" | "watchlists" | "settings";
interface State { page: Page; results: GiveawaySummary[]; report?: CreatorReport; loading: boolean; error?: string; setPage: (page: Page) => void; search: (keyword: string) => Promise<void>; loadCreator: (username: string) => Promise<void>; }
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const useAppStore = create<State>((set) => ({
  page: "dashboard", results: [], loading: false,
  setPage: (page) => set({ page, error: undefined }),
  search: async (keyword) => { set({ loading: true, error: undefined }); try { const response = await fetch(`${API_URL}/api/search`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ keyword }) }); if (!response.ok) throw new Error("Search could not be completed"); set({ results: (await response.json()).giveaways }); } catch (error) { set({ error: error instanceof Error ? error.message : "Network error" }); } finally { set({ loading: false }); } },
  loadCreator: async (username) => { set({ loading: true, error: undefined }); try { const response = await fetch(`${API_URL}/api/creator/${encodeURIComponent(username)}`); if (!response.ok) throw new Error("Creator report was not found"); set({ report: await response.json(), page: "profile" }); } catch (error) { set({ error: error instanceof Error ? error.message : "Network error" }); } finally { set({ loading: false }); } }
}));
