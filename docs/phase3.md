# Phase 3 - Discovery and Monitoring

`DiscoveryService` delegates public-content lookups to a pluggable `DiscoveryProvider`, then normalizes results for persistence and evidence analysis. The included provider is safe demo data; production providers must use authorized public APIs and never automate engagement.

BullMQ runs Discovery, Evidence Refresh, Creator Update, and Trust Score workers. Recurring discovery runs every five minutes, evidence refresh every ten, and scoring every fifteen. Watchlists persist keyword or creator monitoring preferences and creator snapshots retain historical score changes.
