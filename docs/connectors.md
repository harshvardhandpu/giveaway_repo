# Connectors

`DataConnector` normalizes public posts from replaceable sources. `XConnector` is credential-ready; configure an authorized public API before enabling it. Blockchain providers verify public transaction identifiers only.

Set `X_BEARER_TOKEN` in `.env` to enable the X API v2 connector. It uses recent search, user timelines, post lookup, conversation search for replies, bounded `next_token` pagination, and retry/backoff for 429 and transient server errors. Without credentials it returns no X data and the API continues with its demo connector. The normalized `Post` contract feeds the existing discovery and evidence pipeline.
