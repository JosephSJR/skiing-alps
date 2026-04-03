---
name: Interleave language must be coherent with paragraph content
description: Don't mechanically add interleave disclaimers — rewrite prompt so paragraph text and ordering flexibility are logically compatible
type: feedback
---

Don't just slap interleave language onto a prompt when paragraphs contain positional references like "Table 1 below." The interleave disclaimer and the paragraph text must be logically consistent. If verbatim paragraph text references a table's position (e.g., "below"), either rework the interleave language to be narrower (e.g., "each table follows its describing paragraph") or modify the paragraph text to remove positional references. The team rule about interleave language exists because evaluators can't verify relative table-vs-paragraph order — but the prompt itself must still make sense under whatever flexibility is granted.

**Why:** Reviewer rejected a task because the prompt said "Table 1 below presents..." but then a disclaimer said tables could go anywhere, creating a logical contradiction.

**How to apply:** After adding interleave language, re-read the full prompt and check whether any paragraph text references a table's position. If it does, resolve the conflict before finalizing.
