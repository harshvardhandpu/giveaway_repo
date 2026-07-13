# Evidence Model

`Evidence` records a public URL, classification, description, and confidence. `EvidenceRelationship` maps generic entity identifiers with `CREATED`, `WON_BY`, `CONFIRMED_BY`, `SUPPORTS`, `CONTRADICTS`, and `REFERENCES` edges. Generic IDs allow Creator -> Giveaway -> Winner -> Evidence paths without forcing a polymorphic foreign key.

All evidence is public-source research. Private wallet material is neither collected nor stored.
