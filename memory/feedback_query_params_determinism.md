---
name: Pin down ALL query parameters for data extraction tasks
description: Web data queries must specify every parameter/toggle to ensure deterministic results across different users
type: feedback
---

When a prompt requires querying a web database (like UN Comtrade), specify EVERY parameter on the query page — not just the obvious ones (Reporter, Partner, Period). Include classification system, revision level, product code, aggregation type, and any other toggles/dropdowns that could change the results. Different defaults yield different trade values, reducing determinism and verifiability.

**Why:** Reviewer got different 2022 China import values (575B vs 536B) because the Comtrade query page has parameters beyond Reporter/Partner/Period that weren't specified, leading to different result sets.

**How to apply:** Before finalizing any data-extraction prompt: (1) actually run the query yourself, (2) document every parameter setting you used, (3) include all of them in the prompt, (4) consider including an example value as an anchor. If the query UI has ambiguous defaults, specify them explicitly.
