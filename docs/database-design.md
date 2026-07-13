# Database Design

## Entity relationships

```text
User
Creator 1 --- * Giveaway 1 --- * Evidence
                  |
                  + --- * Winner
Creator 1 --- * AIReport
Giveaway 1 --- * AIReport (optional association)
```

## Design decisions

- `Creator.username` is unique and stored without the leading `@`.
- `Giveaway` keeps parsed public fields alongside the original public text for auditability.
- `Evidence` is attached to one giveaway and classified by type, confidence, and URL.
- `AIReport` stores a versioned score snapshot and reasons, so later scoring changes do not overwrite history.
- `Winner` captures public confirmation references only; no wallet credentials are stored.

## Indexes

- Creator username and trust score support profile lookup and sorting.
- Giveaway keyword/title and deadline support topic search.
- Evidence giveaway/type supports report assembly.
