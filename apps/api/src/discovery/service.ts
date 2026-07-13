import type { DiscoveryProvider, PublicPost } from "./types.js";
export class DiscoveryService { constructor(private readonly provider: DiscoveryProvider) {} async discover(keyword: string): Promise<PublicPost[]> { return this.provider.search(keyword); } async creatorHistory(username: string) { return this.provider.fetchHistory(username); } }
