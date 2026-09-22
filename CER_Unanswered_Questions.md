# C.E.R. — Unanswered Questions (from ChatGPT Import Integration Pass)

Companion to `CER_ChatGPT_Import_Integration.md`. Everything below is a real open item — either a question that was asked in the imported conversation and never answered, a decision that was explicitly deferred ("investigate before adopting," "test in a branch," "needs verification"), or a gap my integration pass surfaced. Nothing here has been decided on your behalf. Organized by topic, cross-referenced to the relevant section of the Integration doc.

---

## Design decisions waiting on you

1. **Akashic Tome vs. Eccentric Tome.** Both are currently installed; the original discussion explicitly said not to run both. Which role do you actually want a "library/compendium" item to fill — a lore object, a mechanical one, or do you want to cut one now before content gets built around either? *(Integration §6)*

2. **Fusion's place on the Field Guide's Variants page.** The mockup shows Normal / Shiny / Shadow / Fractured tabs but no Fusion tab. Is Fusion meant to be a fifth variant tab, or does a Fusion result belong in its own Species Index entry (since it's arguably a distinct creature rather than a variant of one parent)? *(Integration §1a)*

3. **Final base Overworld worldgen mod/stack.** Terralith was explicitly rejected; Tectonic was left at "maybe, only if it fits the final stack." No worldgen mod has actually been locked in. This blocks finishing the Aero Islands sky-layer integration and the Lost Biomes ground-layer design, both of which need to know what they're layering on top of. *(Integration §16)*

4. **ProgressiveStages vs. AStages.** Explicitly deferred to "build a test branch and see which wins" — never resolved. This also gates whether §8's "unify the progression backbone" proposal is even actionable, since it names ProgressiveStages as the assumed winner. *(Integration §8, §18)*

5. **Do you want the Route Mode idea built at all**, and if so, on the terms I proposed (Routes mod for geography + a custom opt-in `/routemode` toggle riding on ProgressiveStages + RCT key-trainer triggers)? Confirmed via fresh research: no pre-made mod does sequential route-gating, so this is a "build it or shelve it" decision, not a "which mod" decision. *(Integration §18)*

---

## Technical verification needed (apply the Bridge-Eligible Mod Principle properly before deciding)

6. **Does Pokébelt have a native NeoForge port**, a Connector/Forgified-Fabric-API path, or should it just be dropped in favor of the reskinned-Bundle alternative I proposed? Only a Fabric build was confirmed in the original research pass. *(Integration §4)*

7. **Does Vanilla Storage Interface have a NeoForge build**, or the same Fabric-only status? Same open question as Pokébelt, never re-verified. *(Integration §13)*

8. **Can Cobblemon Snap's aspect-tracking system recognize custom aspects (Shadow, Fractured, Fusion)**, or is its shiny-tracking hardcoded to Cobblemon's one built-in flag? This needs someone to actually check Snap's source/API or ask its author — I gave you my best-guess opinion (probably hardcoded to shiny only) in the Integration doc, but flagged it explicitly as an opinion, not a confirmed answer. The mockup's Variants page design assumes this works, so it's worth resolving before UI work goes further. *(Integration §1a, §10)*

9. **Does Cobblemon Snap's task system support custom tabs/categories**, or only custom task content within its existing fixed page structure? Not documented either way in the original research; the workaround (treat the Species entry page itself as the category) was adopted without confirming whether a real tabbed alternative exists. *(Integration §9)*

10. **Is Exposure's photograph/entity data actually readable by KubeJS, FTB Quests, or Cobblemon triggers?** Flagged in the original discussion as "the big question" before committing Exposure to the research-photography role — never verified. Under the current two-camera resolution (§11), this matters less for research mechanics (Snap owns that job now) but still matters if you want Exposure photos to trigger anything beyond being decorative/personal. *(Integration §11)*

11. **Cobblemon 1.8.1 party-UI / Pokédex bug — is this still happening?** The original troubleshooting thread ended on a diagnostic request that was never answered:
    - Exact Minecraft version, loader, and loader version
    - Exact Cobblemon version and exact CobbleDex version currently installed
    - Which Cobblemon-specific keybinds actually appear under Options → Controls, and what they're bound to
    - Result of `/pc`
    - Result of `/openstarterscreen @p` (after first confirming you're fine resetting a test-world party/PC — this command wipes both)
    - Result of `/spawnpokemon pikachu` — can you interact with, catch, and party-manage a freshly spawned one
    - Exact Kotlin for Forge version currently installed, checked against what Cobblemon 1.8.1 requires (new hypothesis added in this pass — a mismatch here would explain "loads fine but core state silently doesn't work" better than a hard crash would)
    
    If this is resolved, this item can just be closed out. If not, send the above and I'll actually work the bug. *(Integration §7)*

---

## Dependency/audit housekeeping

12. **MezzConfig and Kotlin for Forge** — confirm which mods in the *current final* list actually require these before they're carried forward as permanent core dependencies. Flagged as "keep only if something needs it," never actually audited against the finalized list. *(Integration §6)*

---

## Open narrative/lore question (intentionally left open, tracked so it doesn't get forgotten)

13. **What actually caused the original corruption event** behind the Lost Biomes? This was deliberately left as a late-game mystery in the original discussion, which is fine — but flagging it here so it stays a tracked open thread rather than something that quietly needs answering by the time endgame content gets written. Now also tangled up with the Lost Mob Grinders lore-merge I proposed (Integration §15) — if you take that proposal, this question also implicitly covers "what happened to the civilization that built the grinders."

---

## Governance proposals awaiting your sign-off (not questions exactly, but not locked either)

These are the "Proposal" items from the Integration doc, collected here as a checklist since accepting/rejecting each one has downstream effects on what I build going forward:

- [ ] Lock the **Implementation Layer Principle** as F.R.M.'s 5th governance principle *(§2)*
- [ ] Adopt **`cer:`** as the single canonical namespace *(§2)*
- [ ] Split Vanilla Backport into two independent M.M.I. entries *(§3)*
- [ ] Drop Pokébelt in favor of a reskinned Bundle *(§4, pending #6 above)*
- [ ] Adopt the **Research System Charter** (Snap / Research Tasks / Field Journal / FTB Quests scope split) *(§9)*
- [ ] Adopt **ProgressiveStages as the single progression source of truth** *(§8, pending #4 above)*
- [ ] Adopt the **two-camera resolution** (Snap = research, Exposure = personal) and retire the generic handheld-camera placeholder *(§11)*
- [ ] Downgrade the Remote Access-style dynamic multiblock GUI to a stretch goal *(§12)*
- [ ] Merge the Lost Mob Grinders and Lost Biomes lore threads *(§15)*
- [ ] Adopt the **Threshold Anchor (primary) + Dream Echo (secondary)** Biosphere access split *(§16)*
- [ ] Decouple the Affinity biome-distribution system from Vanilla Backport's specific tags *(§17)*
- [ ] Build **Route Mode** on the terms proposed, once #5 above is answered *(§18)*
