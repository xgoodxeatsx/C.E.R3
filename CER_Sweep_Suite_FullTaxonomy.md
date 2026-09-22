# C.E.R. — Sweep Suite (Fused Taxonomy, Working Reference)

**Status:** CONFIRMED — this is the official, working sweep methodology going forward. Built by fusing the 73 micro-sweeps + 6 meta-processes ChatGPT proposed (preserved verbatim in `CER_Sweep_Suite_Source.md`) into a smaller set of named, overarching sweeps, per Wesley's explicit direction to integrate/optimize/fuse/rework using F.R.M. discretion. Every original micro-sweep still exists conceptually — it's now a named **check** inside one of the 19 fused sweeps below, not lost. This doc is the one to actually use day-to-day; the quick reference (`CER_Sweeps_Quick_Reference.md`) is the cheat-sheet version of this.

---

## The 19 fused sweeps

### 1. Mod Inventory Sweep
*Absorbs: MMI Sweep, Mod List Deduplication Sweep, Dependency/Library Sweep, Mod Purpose Sweep, MMI Confidence Sweep, Candidate→Confirmed Promotion Sweep.*
The master-inventory pass. Reconciles every mod source into one canonical MMI; checks for duplicate/renamed mods, loader variants, true dependency footprint, and confirms every entry can state its own purpose and carries an honest confidence tag (CONFIRMED / LIKELY / POTENTIAL / UNVERIFIED / REJECTED). This is what "Mod Audit" always meant — now formalized with real sub-checks instead of being a loose catch-all term.

### 2. Redundancy & Overlap Sweep
*Absorbs: Redundancy Sweep, Functionality Overlap Sweep, Feature Saturation Sweep, Replacement-vs-Integration Sweep, "Remove One Mod" Sweep.*
Asks whether something is being done more than once — as an outright duplicate, a partial functional overlap, or simple category saturation (too many biome/cave/structure mods even if none duplicate exactly) — and, for any hit, whether the fix is replace, merge, justify-both, or just delete one and see what breaks.

### 3. Implementation Layer Sweep
*Absorbs: Implementation Layer Sweep, KubeJS vs Mod vs Datapack Sweep, Configuration-First Sweep, Custom Mechanics Feasibility Sweep.*
For every desired feature: what's the lowest-complexity layer that can do it correctly (Vanilla → Datapack → KubeJS → mod config → mod integration → custom addon → custom mod)? Never reach for more power than the job needs. This is the same principle already locked as a proposed 5th F.R.M. governance principle — this sweep is its enforcement mechanism.

### 4. Compatibility & Version Sweep
*Absorbs: Compatibility Sweep, Cobblemon Compatibility Sweep, Version Drift Sweep, Update Regression Sweep, Config Conflict Sweep.*
Confirms every retained mod actually works in *our exact* environment — Minecraft/NeoForge/Cobblemon/KubeJS versions, required APIs, and Cobblemon-specific surfaces (battles, capture, spawning, evolution, breeding, riding, storage) — and re-checks this after any version bump or major update, not just at intake. (This is the sweep the Cobblemon 1.8.0→1.7.3 Snap-crash revert this session should have triggered proactively.)

### 5. Worldgen Integrity Sweep
*Absorbs: Worldgen Conflict Sweep, Worldgen Density/Chaos Sweep.*
Checks that terrain, biomes, caves, structures, dimensions, Aero Islands, and Pokémon structures coexist rather than overwrite or multiply into chaos, and that the resulting world *feels* intentionally authored rather than merely non-crashing.

### 6. Progression & Economy Sweep
*Absorbs: Progression Redundancy Sweep, Progression Gate Sweep, Progression Bypass Sweep, Recipe/Acquisition Sweep, Economy Sweep, Automation/Infinite Resource Sweep, Loot Table Sweep, Quest Reward Economy Sweep. Future check folded in: the previously-proposed Balance/Numbers Sweep, once numeric tuning becomes relevant.*
Maps every progression system and every way to acquire every important item/resource, and checks that gates are meaningful, unbypassed, rewards aren't accidentally trivializing the rest of the pack's economy, and nothing becomes silently infinite through automation.

### 7. Quest Design Sweep
*Absorbs: Quest Sweep.*
Reviews quest structure end to end (intro → early game → exploration → Cobblemon → technology → magic → Affinity → Fracture → endgame) for redundant/missing quests, unclear objectives, gates, and discovery pacing. Reward-economy concerns are handled by Progression & Economy Sweep (#6); this one is about structure and pacing.

### 8. Fit & Identity Sweep
*Absorbs: "Cool But Doesn't Belong" Sweep, "Can We Actually Use This?" Sweep, Thematic Cohesion Sweep, Modpack Identity Sweep, Lore/Mechanics Consistency Sweep, and the previously-proposed Terminology/Consistency Sweep.*
The philosophical gate: does this reinforce C.E.R.'s identity, does the lore/mechanics/terminology stay internally consistent, and — stripped of mod names — would this still read as C.E.R. rather than a generic kitchen-sink pack? Also where a mod with a great concept but a poor real-world implementation gets caught before it's adopted.

### 9. Feature Coverage & Integration Sweep
*Absorbs: Feature-to-Mod Coverage Sweep, Integration Opportunity Sweep, Integration Gap Sweep, Cobblemon Ecosystem Sweep, "What Are We Missing?" Sweep, and the Reverse Audit / Interaction Audit / Integration Value Audit meta-processes.*
Works backward from design intent instead of forward from the mod list: what does C.E.R. actually need, what already covers it, what's missing, what two existing systems should be talking to each other but aren't, and how much cross-system value does a given mod unlock (not just its standalone feature count)?

### 10. Client & Input Sweep
*Absorbs: Client QoL Saturation Sweep, Keybind/Input Sweep.*
Checks UI/tooltip/inventory/HUD/map/keybind mods for duplicate functionality, clutter, and keybind conflicts, so the controls and interface don't become their own unmanageable pile.

### 11. Performance & Load Sweep
*Absorbs: Performance Sweep, Tick/Polling Sweep, Server Tick Cost Sweep, Chunk Loading Sweep, Entity Population Sweep, Memory/RAM Sweep, Startup/Load-Time Sweep.*
Covers everything about speed and resource cost — client FPS, server TPS, tick-frequency of scripts (prefer event/interval/state-change over polling — critical for Affinity thresholds), chunk-loading footprint, entity counts, RAM, and startup time.

### 12. Stability Sweep
*Absorbs: Crash/Error Sweep, Log Spam Sweep.*
Categorizes every crash and log warning by root cause (mod bug, dependency, config, script, worldgen, entity, rendering, memory, version mismatch) and asks whether it points to a deeper architectural problem rather than just "remove the mod."

### 13. Architecture Integrity Sweep
*Absorbs: Datapack Priority/Load Order Sweep, Script Namespace/Architecture Sweep, Hardcoded Value Sweep, State Ownership Sweep, Single Source of Truth Sweep, State Synchronization Sweep, and the Ownership Audit / Complexity Budget Audit / Maintenance Debt meta-processes.*
The Affinity lesson, generalized: who owns each piece of state, is it stored in exactly one authoritative place, are shared constants centralized instead of hardcoded in ten scripts, is the KubeJS folder structure sane, and — at milestones — what has been built that future-us will hate maintaining?

### 14. Persistence & Multiplayer Sweep
*Absorbs: Save/Restart Persistence Sweep, Multiplayer/Server Scope Sweep, FTB Teams Interaction Sweep.*
For every custom system: does it survive logout/restart/reload/dimension-travel/death, and is its scope (player/team/region/world/server) actually what's intended — especially before tying Affinity into Teams-based quests.

### 15. Exploit & Abuse Sweep
*Absorbs: Exploit Sweep, AFK/Automation Abuse Sweep, Player Behavior Sweep.*
Deliberately tries to break every major system (repeat/automate/reset/multiply/multi-player-trigger), checks the 12-hours-AFK case, and separately asks what a *non-malicious* player would naturally be drawn to do — flagging any mechanic whose "optimal" play is degenerate.

### 16. Discovery & Design Philosophy Sweep
*Absorbs: Discovery/Prescription Sweep.*
Kept as its own named sweep (rather than folded into Fit & Identity) because Discovery Over Prescription is a locked core pillar, not just a style preference: checks quests, item text, and system introductions for over-explaining mechanics the player should be finding for themselves.

### 17. Build Validation Sweep
*Absorbs: Proof-of-Concept Sweep, Vertical Slice Sweep, End-to-End Integration Sweep.*
The staged way any new ambitious system gets built: smallest possible prototype first, then one complete end-to-end example, then confirmation that the full chain (Cobblemon → KubeJS → C.E.R. → Affinity → FTB → reward → next stage) actually works together — never all 18 Affinities implemented before knowing one works.

### 18. Playtest Sweep
*Absorbs: Player Experience Sweep, Fresh-World Sweep, Blind Playtest Sweep, Endgame/Long-Term Loop Sweep.*
Actually playing the pack rather than auditing it on paper — as a normal player, from a completely fresh world with no dev commands, ideally by someone blind to the architecture, and separately from an endgame/100+-hour perspective to check what's still meaningful that far out.

### 19. Archive Sweep *(new family — not in the source text; established this session to fill a real gap)*
Covers the project's own documentation/memory health, in two modes:
- **Archive Intake** *(was "Archive/Memory Sweep")* — the additive mode: moves in-progress design discussion (chat, sessions) into properly structured, indexed archive/project docs before it's forgotten.
- **Archive Diet** *(new term, established this session at Wesley's request)* — the subtractive mode: goes through already-compiled archive material and strips "fluff" — content that's related to a topic but not actually load-bearing for understanding or rebuilding it — without touching the substantive decisions, reasoning, or history those archives exist to preserve. This is a *trim*, not a *purge*: nothing decision-relevant gets cut, and the archival philosophy of "preserve uncertainty rather than invent it" still applies — if it's unclear whether something is fluff, it stays.

These two modes are companions, not competitors: Intake grows the archive to keep it complete; Diet keeps that growth from calcifying into bloat. Run Intake after any substantial design session; run Diet periodically once an archive file gets "thick" (Wesley's own word for the trigger condition).

---

## Composite / umbrella processes

### TriSweep *(retained, redefined)*
The lightweight, frequent-use version: a quick pass of **Mod Inventory Sweep + Redundancy & Overlap Sweep + Fit & Identity Sweep**. Originally "running all three sweeps together as one optimized process" — now each of the three is itself a proper fused sweep, so TriSweep is the routine maintenance check between bigger passes, not the exhaustive one.

### Final Pre-Release Sweep *(retained)*
The release-gate chain, run in order, then the build is frozen:
Mod Inventory → Compatibility & Version → Worldgen Integrity → Progression & Economy → Quest Design → Performance & Load → Stability → Architecture Integrity → Persistence & Multiplayer → Exploit & Abuse → Playtest → Fit & Identity.

### Total Cleanse *(new term, established this session at Wesley's request)*
The maximal pass — **every one of the 19 fused sweeps above, plus both Archive Sweep modes, run in Master Workflow order.** This is the thing Final Pre-Release Sweep doesn't quite reach: it audits the pack *and* the project's own documentation/memory together, so it isn't only a "ready to ship" gate — it's a full reset-and-verify for the whole system, pack and archive alike. Reserve it for major milestones or whenever the entire project (not just the build) needs a clean bill of health. Final Pre-Release Sweep is effectively Total Cleanse minus the two Archive Sweep modes, scoped specifically to shipping.

### Targeted Regression Sweep *(retained as a standing meta-process, not a one-time sweep)*
After any major addition, don't run Total Cleanse — run only the fused sweeps whose domain the new feature actually touches. Example: adding Affinity would trigger Architecture Integrity, Compatibility & Version (Cobblemon-side), Progression & Economy, Persistence & Multiplayer, Exploit & Abuse, Discovery & Design Philosophy, and Client & Input (its UI) — not a blind retest of everything.

---

## Fate of prior sweep terms (so nothing that existed before quietly vanishes)

| Prior term | What happened to it |
|---|---|
| **Mod Audit** | Fused into and formalized as **Mod Inventory Sweep** (#1). |
| **Modification Sweep** | Split across **Fit & Identity Sweep** (#8, cohesion-checking) and **Feature Coverage & Integration Sweep** (#9, "do the ideas connect"). |
| **Optimization Sweep** *(my provisional reconstruction, last session)* | Confirmed as the right instinct — formalized as **Redundancy & Overlap Sweep** (#2). |
| **TriSweep** | Retained, redefined above as the lightweight 3-part recurring check, now built from the fused sweeps rather than the original three. |
| **Archive/Memory Sweep** *(my proposal, last session)* | Renamed **Archive Intake**, now one of the two modes of the new **Archive Sweep** (#19). |
| **Compatibility & Version Sweep** *(my proposal, last session)* | Confirmed near-exactly, absorbed as **Compatibility & Version Sweep** (#4) with Config Conflict folded in. |
| **Terminology/Consistency Sweep** *(my proposal, last session)* | Folded into **Fit & Identity Sweep** (#8) as a named check. |
| **Balance/Numbers Sweep** *(my proposal, last session, flagged future)* | Folded into **Progression & Economy Sweep** (#6) as a future-phase check, still flagged as not urgent until numeric tuning starts. |

---

## Master workflow (unchanged in spirit, sweep names updated)

```
DESIGN → what do we want?
↓
Feature Coverage & Integration Sweep (reverse-audit half) → what provides it?
↓
Mod Inventory Sweep
↓
Redundancy & Overlap Sweep
↓
Compatibility & Version Sweep
↓
Implementation Layer Sweep
↓
Build Validation Sweep (prototype → vertical slice → end-to-end)
↓
Progression & Economy Sweep
↓
Exploit & Abuse Sweep
↓
Performance & Load Sweep
↓
Persistence & Multiplayer Sweep
↓
Playtest Sweep
↓
Fit & Identity Sweep
↓
SHIP
```

Archive Sweep (both modes) runs alongside this loop on its own cadence, not as a gate in the ship path — it keeps the record of *why* the loop happened intact and lean, rather than blocking the loop itself.
