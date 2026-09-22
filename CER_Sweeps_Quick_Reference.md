# C.E.R. — Sweeps Quick Reference

Cheat-sheet on top of `CER_Sweep_Suite_FullTaxonomy.md` (the working reference, with what each sweep absorbs) and `CER_Sweep_Suite_Source.md` (verbatim original text, preserved for deep-dive/history). Use this doc to quickly pick the right sweep; go to the full taxonomy doc for scope details, and the source doc if you need the original reasoning behind a specific check.

---

## The two new headline terms

- **Archive Diet** — going through already-compiled archive material and trimming "fluff": content that's related to a topic but not actually load-bearing for understanding or rebuilding it. A trim, not a purge — nothing decision-relevant gets cut, and unclear cases stay in by default. Run periodically once an archive file gets "thick." Companion to **Archive Intake** (moving new in-progress discussion into the archive in the first place) — together these make up the new **Archive Sweep**.
- **Total Cleanse** — the single most exhaustive pass that exists: every fused sweep below, plus both Archive Sweep modes, run in Master Workflow order. Broader than Final Pre-Release Sweep because it also audits the project's own documentation/memory, not just the pack. Reserve for major milestones or a full project reset-and-verify.

---

## The 19 fused sweeps

| # | Sweep | Use it when |
|---|---|---|
| 1 | **Mod Inventory Sweep** | Reconciling the modlist, checking dedup/dependencies/purpose/confidence |
| 2 | **Redundancy & Overlap Sweep** | Two+ things might be doing the same job |
| 3 | **Implementation Layer Sweep** | Deciding vanilla vs. datapack vs. KubeJS vs. custom mod for a feature |
| 4 | **Compatibility & Version Sweep** | New mod, version bump, or "does this still work with Cobblemon 1.7.3" |
| 5 | **Worldgen Integrity Sweep** | Terrain/biome/structure/dimension mods might conflict or overcrowd |
| 6 | **Progression & Economy Sweep** | Checking gates, acquisition paths, loot, and resource economy |
| 7 | **Quest Design Sweep** | Reviewing quest structure, objectives, and pacing |
| 8 | **Fit & Identity Sweep** | "Does this belong in C.E.R." / lore & terminology consistency |
| 9 | **Feature Coverage & Integration Sweep** | Working backward from design intent to find gaps or missed connections |
| 10 | **Client & Input Sweep** | UI/HUD/keybind clutter or conflicts |
| 11 | **Performance & Load Sweep** | FPS, TPS, tick cost, chunk loading, memory, startup time |
| 12 | **Stability Sweep** | Crashes and log spam |
| 13 | **Architecture Integrity Sweep** | Data ownership, single source of truth, hardcoded values, script structure |
| 14 | **Persistence & Multiplayer Sweep** | Does it survive restart/death/dimension change; is scope right |
| 15 | **Exploit & Abuse Sweep** | Trying to break a system on purpose, AFK-abuse check |
| 16 | **Discovery & Design Philosophy Sweep** | Checking Discovery Over Prescription isn't being violated |
| 17 | **Build Validation Sweep** | Staged rollout of a new ambitious system (prototype → slice → full chain) |
| 18 | **Playtest Sweep** | Actually playing it — fresh world, blind playtester, or endgame perspective |
| 19 | **Archive Sweep** *(Intake / Diet)* | Getting discussion into the archive, or trimming an archive that's gotten thick |

## Composite processes

| Process | What it runs |
|---|---|
| **TriSweep** | Mod Inventory + Redundancy & Overlap + Fit & Identity (light, routine) |
| **Final Pre-Release Sweep** | All 19 sweeps except Archive Sweep, in ship-gate order |
| **Total Cleanse** | All 19 sweeps + both Archive Sweep modes — the full system reset-and-verify |
| **Targeted Regression Sweep** | Only the sweeps a specific new feature actually touches (not a fixed list — scoped per-feature) |

---

*Full scope, absorbed-checks list, and the fate of every prior sweep term (Mod Audit, Modification Sweep, Optimization Sweep, etc.): `CER_Sweep_Suite_FullTaxonomy.md`. Original ChatGPT-authored source text: `CER_Sweep_Suite_Source.md`.*
