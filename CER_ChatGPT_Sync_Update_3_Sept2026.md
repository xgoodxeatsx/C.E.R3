# C.E.R. — ChatGPT Sync Update #3 (Sept 2026)

*Compiled by Claude (Cowork), Sept 22 2026. Paste this directly into your next ChatGPT session as context.*

**Purpose of this doc:** This continues the "lab notes, not changelog" standard set by Sync Update #1 (early Sept) and Sync Update #2 (~CLR-0156–0181). It's built from three sources: (1) the current Claude Project's permanent doc store (`overview.md`, `governance-and-workflow.md`, `affinity-architecture.md`, `research-system.md`, `world-architecture.md`, `CER_Shadow_Fractured_Identity_Design.md`, `CER_Type_Relationship_Matrix.md`, `CER_Master_Mod_Index.md`, `CER_Supplementary_Mod_Research.md`, `CER_Unanswered_Questions.md`) — this is the most current, most-reconciled state of the design; (2) the full history of two Claude chats ("Organizing Minecraft modpack ideas into archives" and "Affinity system design") that did a large integration pass on ChatGPT material and a from-scratch Affinity deep-dive; (3) both prior ChatGPT sync docs, cross-checked line by line so nothing gets silently dropped.

**Important finding up front:** A significant chunk of Sync Update #2's content — the entire **Ball System architecture**, the **player-origin backstory**, the **Sundering/three-era renaming**, and the **Research Station's 3-position interaction design** — does **not appear anywhere in the current Claude Project doc store.** It's not contradicted, it's just absent — never migrated into the permanent docs during the big "Total Cleanse" reorganization on 2026-09-18. That doesn't mean it was rejected; it means it's an actual gap. It's reproduced below in full so it isn't lost, flagged clearly as "carried forward, not re-confirmed by Claude." If any of it has since changed on your end, that supersedes what's below.

Tags used throughout, same convention as before: 🔒 = locked/confirmed, 🟡 = candidate/strong direction not fully locked, 🔵 = live proposal/brainstorm, ❓ = open question, ⚠️ = flagged gap or unresolved conflict.

---

## 0. What C.E.R. is (for anyone hearing this cold)

**Cobblemon: Ecological Resonance (C.E.R.)** is a deeply custom Cobblemon modpack for Minecraft 1.21.1 / NeoForge, designed by Wesley (iiKiipCreating). The core idea: restoring and understanding the relationship between Pokémon, ecology, people, technology, magic, and an underlying connective force called **Resonance** is the primary form of progression — not gear tiers, not a linear story.

- The 18 Pokémon types double as **18 World Affinities** describing the world's actual ecological state (regional, not global).
- Progression follows two locked design pillars: **Discovery Over Prescription** (learn by observing/experimenting, not checklists) and **Creation Over Crafting** (create by understanding the world, not by following fixed recipes).
- Pokémon are ecological participants — research subjects, indicators, technology contributors — not just battle units.
- Exceptional categories (Alpha, Noble, Fusion, Shadow, Fractured, Titan, and more) each answer a *different design question*, not just a bigger-number tier.
- The world begins **welcoming but incomplete, not dead.** The game is about restoring a living world and discovering why it broke.

Confirmed environment: **Minecraft 1.21.1, NeoForge, Cobblemon pinned to 1.7.3** (see §8). Design and doc work is organized in a Claude Project with a permanent "doc store" — the closest thing to a single source of truth — which replaced an older informal "Master Archive Parts / CLR-number" system during a full reorganization pass ("Total Cleanse") on 2026-09-18.

---

## 1. Governance, workflow, and how the project documents itself

🔒 **F.R.M. (Free Reign Mode) — four locked governance principles:**
1. **Bridge-Eligible Mod Principle** — for any Fabric-only mod: (1) check for a native port → (2) Connector/Forgified Fabric API → (3) find an alternative → (4) only then weigh forcing it in anyway.
2. **Mental Economy Delegation Principle** — small/cosmetic/QoL mods serve a genuinely necessary cognitive-rest function distinct from deep systemic mods. "Lower-stakes" must never be read as "lower priority."
3. **Integration Depth Tiers** — Direct / Indirect / Observational / Social tiers for how a mod connects to Affinity/Resonance, so not every integration becomes a flat Affinity trigger.
4. **Synergy Combos** — small mods are evaluated as *combinations*, not just standalone candidates.

🔵 **Proposed 5th principle, not yet locked: Implementation Layer Principle** — content/rules → datapack; new capability (blocks/entities/GUIs/state machines) → mod; cross-mod glue → KubeJS; presentation-only → resource pack. Never drop to a lower layer merely because it's technically possible.

🔒 **The Sweep Suite** — the project's full QA/audit methodology, built by fusing ~73 ChatGPT-proposed micro-sweeps + 6 meta-processes at Wesley's direction, locked 2026-09-18. **19 named sweeps**: Mod Inventory, Redundancy & Overlap, Implementation Layer, Compatibility & Version, Worldgen Integrity, Progression & Economy, Quest Design, Fit & Identity, Feature Coverage & Integration, Client & Input, Performance & Load, Stability, Architecture Integrity, Persistence & Multiplayer, Exploit & Abuse, Discovery & Design Philosophy, Build Validation, Playtest, Archive Sweep — plus four composite processes: **TriSweep** (light routine maintenance: Mod Inventory + Redundancy & Overlap + Fit & Identity), **Final Pre-Release Sweep** (all 19 minus Archive Sweep, ship-gated), **Total Cleanse** (all 19 + both Archive Sweep modes — full pack + documentation reset-and-verify), **Targeted Regression Sweep** (only the sweeps a new feature touches). The three source docs (`CER_Sweep_Suite_Source.md`, `_FullTaxonomy.md`, `_Quick_Reference.md`) are locked and referenced-only, never rewritten.

🔒 **Archive Sweep has two Wesley-coined modes:** **Archive Intake** (additive — fold new discussion in before it's forgotten) and **Archive Diet** (subtractive — trim non-load-bearing "fluff" without cutting anything decision-relevant; a trim, not a purge; when in doubt, it stays).

🔒 **Doc-store structure (current, post-Total-Cleanse):** `overview.md` (master orientation) → `governance-and-workflow.md` → `affinity-architecture.md` → `research-system.md` → `world-architecture.md` → `CER_Shadow_Fractured_Identity_Design.md` → `CER_Supplementary_Mod_Research.md` → `CER_Master_Mod_Index.md` → `CER_Unanswered_Questions.md` (the full open-backlog) → the three Sweep Suite docs → `CER_ChatGPT_Import_Integration.md` (historical reasoning trail, superseded where main docs overlap, kept as the "why"). Older references to "Master Archive Parts (20+)," CLR-numbered changelog entries, and an "Authorities Archive" describe a legacy structure from earlier sessions — **superseded**, not reconstructed.

🟡 **Open governance proposals awaiting Wesley's formal sign-off** (functionally in use in places, but not formally locked as principles):
- Adopt **`cer:`** as the single canonical namespace (replacing `cobblemon_er:`/`er:`). Note: Sync Update #2 described this as already adopted — treat as high-confidence but re-confirm, since the current governance doc still lists it as pending.
- Adopt the Research System Charter (§4).
- Adopt ProgressiveStages as the single progression source of truth (pending the ProgressiveStages-vs-AStages test branch — never resolved).
- Adopt the two-camera resolution (§4).
- Downgrade the "dynamic laboratory GUI" concept to a stretch goal.
- Adopt Threshold Anchor (primary) + Dream Echo (secondary) Biosphere access (§3).
- Decouple Affinity biome-distribution from Vanilla Backport's specific tag namespace.
- Split Vanilla Backport into two MMI entries (real backport vs. bundled "Chaos Cubed" content).
- Merge the Lost Mob Grinders and Lost Biomes lore threads.
- Build Route Mode on the terms researched (§3).

**Working-style notes for context:** Wesley runs actual in-game tests and reports exact error messages for rapid iteration. He distinguishes sharply between "confirmed/locked" (goes in the main docs) and "open proposal/unconfirmed" (goes in Unanswered Questions, flagged wherever referenced). Standing rule: **never add mods blindly** — every mod needs a stated C.E.R. design purpose, not just "this is popular."

---

## 2. Affinity & Resonance — the core system

🔒 **What Affinity actually is** (settled 2026-09-18, the single most load-bearing clarification this cycle):
- **Affinity is energy itself** — never the mechanism, always the *reason* mechanisms can operate. One substance, many expressions (a stat, a trigger, a distribution weight) — not several systems sharing a name.
- **World Affinity** = the world's ambient life essence, split into 18 equal elemental sources. Regional, not global — sized like a Biosphere/Anchor, meant to **collide and blend at borders** rather than sit sealed off (unlike Biospheres, which *are* quarantined).
- **Trainer Affinity** = a trainer's behavioral assimilation of that energy — both a record of what they've been around/done, and an eligibility gate for what they can select. (Prototype code calls this "Player Affinity" — cosmetic naming drift, not a design disagreement; needs a rename pass before real build.)
- **Resonance** = a *separate* stat from Affinity: how well a trainer's connection to an energy transfers to one specific partner Pokémon (the Ash-Greninja reference case). Affinity is "how much/what kind"; Resonance is "how well it transfers." ❓ Scope still open: per-partner, a per-type ceiling a bond fills toward, or both.
- **No negative values anywhere in Affinity.** All "gone wrong" states belong to corruption, never to Affinity itself, which stays purely non-negative across all 18 types. Opposition (below) is a coexistence rule, never a stat penalty.
- 🔒 **"Affinity Matter" resolved as a non-issue** — this was Wesley reusing Replication-mod matter-category labels for flavor, not a real spendable resource. No such resource exists.
- 🔒 **Type ≠ Affinity, explicitly:** the 18 types are used as *vocabulary* for Affinity, never as a literal hack into a Pokémon's real `types[]` array. They usually coincide (Moltres is Fire/Flying type *and* Fire Affinity — literally fire made manifest) but are structurally separate systems.
- 🔒 **Normal-as-fallback:** a Pokémon's true Affinity exists in world data regardless of player knowledge, but affinity-aware systems return "Normal" until the world's research state has actually discovered that Affinity — a world-level "Known Affinities" ledger, not a per-Pokémon unlock.

🔒 **The 18×18 Type Relationship Matrix** — a from-scratch, symmetric energy-relationship system (not a reskin of the real Pokémon combat chart, though it starts from it as a thematic prompt and overrides wherever "energy, not combat" logic disagrees). All 153 unique pairs categorized, defaulting to Neutral unless a real thematic case promotes them:
- **Opposed (3 pairs, mutual cancellation, cannot coexist):** Fire↔Water, Fire↔Ice, Dragon↔Fairy.
- **Suppressive (28 directional pairs, "A weakens B," both can still coexist):** e.g. Fighting weakens Normal, Fire weakens Grass/Bug/Ground, Electric weakens Water/Flying, Water weakens Rock/Steel, Ice weakens Grass/Ground/Flying/Dragon, Steel weakens Ice/Dragon, Fighting weakens Ice/Rock/Dark/Steel/Fairy, Ground weakens Electric/Poison, Poison weakens Fairy, Rock weakens Flying, Flying weakens Bug/Fighting, Bug weakens Psychic, Dark weakens Psychic, Psychic weakens Fighting, Fairy weakens Dark (full 28-pair list lives in `CER_Type_Relationship_Matrix.md`).
- **Harmonic (19 mutual pairs):** e.g. Fire–Steel, Fire–Rock, Water–Grass/Ice/Ground, Electric–Steel/Psychic, Grass–Bug/Poison/Ground, Poison–Bug, Ground–Rock/Steel/Bug, Flying–Dragon, Psychic–Fairy/Ghost, Dark–Ghost, Rock–Steel.
- **Neutral:** the remaining ~99 pairs, plus four explicitly-flagged immunity-style Neutrals (Normal/Ghost, Poison/Steel, Ground/Flying, Fighting/Ghost).
- ⚠️ **Four "soft calls" flagged for a second look**, not broken, just lower-confidence: Water/Steel Suppressive (rust logic, real but subtle), Fire/Rock-vs-Fire/Ground arbitration (both had volcanic-imagery claims), Ground/Bug Harmonic (picked over a Suppressive reading), Psychic/Dark Suppressive (least "obvious" of the calls).
- ❓ Does Harmonic carry a real numeric bonus or is it flavor-only (Water/Ice flagged "strong," implying degrees might matter)? Does Opposed's cancellation extend to World Affinity regional boundaries the same way it applies to the wheel? What does a dual-typed Pokémon spanning an Opposed pair even mean for Resonance? Each Suppressive pair still needs its individual wheel-effect and world-effect written up (only Fire/Water and Electric/Ground have real prose so far).

🔒 **KubeJS Affinity Core prototype — actually built and tested in-game.** All 18 types + Resonance + Surge tracked in player NBT; World/Area Affinity via scoreboard; command surface `/cer affinity|resonance|area|world|types|help` via `ServerEvents.basicCommand` (no tab-complete — the raw Brigadier command tree registers/tab-completes but silently fails to *execute* in this KubeJS build, a real discovered limitation). Debugging involved real ES6/Rhino incompatibilities (const/let false-redeclaration errors, arrow functions failing to coerce into Java functional interfaces) — prototype is written in plain ES5 to route around this. Includes a working **per-area diffusion mechanic**: 64-block-square grid cells drift 5% toward the average of their 8 neighbors every 5 seconds — a Nature's Aura-inspired first proof that "affinity flows/spreads" feels right. ⚠️ **This is NOT the same spatial model as the documented design** (Anchor-centered fields with radial falloff, Matrix-governed blending at overlaps) — the two have never been reconciled. Decide: extend grid-with-Anchors-on-top, or replace outright.

🟡 A **parallel, untested NeoForge Java/Kotlin mod scaffold** (`cer_affinity_mod.zip`) exists — data attachments for Player Affinity, `SavedData` for World Affinity, real Brigadier tab-complete, a client keybind — never compiled or run (no Maven/NeoForge repo access in that session). Wesley has a Mac build-setup guide; no build attempt reported yet.

🔒 **Core architecture (design target, not yet built for real):** KubeJS-based "Affinity Core" as single source of truth; 18 numeric values tracked separately for World and each Player; dual interface (a `/cer affinity` command API for writes + a read-only scoreboard mirror for dumb systems to passively gate on); an internal normalized event bus (`PLAYER_CAPTURED_POKEMON` etc.) so integrations emit normalized events rather than hooking Affinity data directly; a cause→resolution→delta pipeline applying Integration Depth Tiers; a capped rolling per-type change-ledger for Field Guide surfacing; a physical in-world **Resonance Anchor** object as the lore/technical seat of World Affinity and likely the wheel-commitment location. Storage layer leans toward a small custom Java/Kotlin layer over pure KubeJS NBT — the untested scaffold above is a first attempt at exactly this.

🔵 **Major open architecture fork, NOT decided: Affinity as a Source-like in-world energy network.** Explored modeling Affinity directly on Ars Nouveau's Source system (Sourcelinks generate → Source Jars store → Source Relays move) rather than a purely abstract stat: Source = neutral raw energy, Affinity = Source attuned to one of the 18 types. Would give Affinity Seeds (generators), Affinity Jars (storage), Affinity Relays (transport) as real placeable blocks. This would resolve Wesley's own worry that "liquid Source" and "liquid Affinity" might be contradictory — under this framing they're the same medium at different attunement states. **Not adopted; a genuinely large scope fork** (physical form for Affinity, reconciling the Resin/Affinity Metal resource economy into it, Core's "source of truth" role needing to account for in-world Jar storage too). Incidental finding while researching this: a real, unrelated mod is literally named "Affinity" (Aethum-based, early v0.1.x, NeoForge 1.21+) — a naming coincidence, not the source of the Source-network idea, not proposed for install.

🔒 **Attunement wheel** (active-Affinity selector UI, design only, not built): radial GUI, player picks 6 of 18 types as "active." **"Muted, not paused"** — all 18 totals keep accruing passively; only the 6 active slots apply gameplay effects. Type-conflict rule derived from the Matrix: Opposed pairs can never both be active. 🟡 Selection is meant to be a deliberate, weighted choice, not a free toggle — proposal: crossing an accrual threshold makes a type *selectable*, but activating/swapping it requires a real commitment action at a Resonance Anchor with cooldown/cost, so "swap for this encounter" isn't casually reversible. Validation is server-authoritative; client-side greying-out is UX only. ⚠️ EasyGui (the GUI library this would need) is confirmed **not installed** and its KubeJS-exposure is unverified — real blocker before building the wheel for real.

🔒 **"Natural six" auto-suggestion + lock system** (addresses a "silent reshuffle" concern): the Core computes a dynamically-ranked eligible top-6 only when the player actually opens the wheel (never live in the background), and even then it's an accept/reject proposal routed through the same commitment gate, not an instant swap. Selection algorithm ranks all 18 by accrued value, skips any type Opposed to an already-picked/locked type. Three lock granularities (per-slot, full-loadout, timed). Fresh-player edge case needs a mandatory manual first pick.

❓ **Persistence — death and distance, unresolved:** Wesley has referenced an existing "Resonance penalty" idea for death but never given its actual mechanical shape. Player Affinity is assumed to persist across death (only Resonance takes a hit), pending that detail. Distance: leaning toward distance-based falloff for raw Trainer Affinity access/generation (weaker far from any Anchor's field), while an already-formed Resonance bond with a specific partner does NOT weaken with distance — the bond travels with the Pokémon. For Biospheres/Aero Islands, "distance from any Anchor" can be treated as effectively infinite until a local Threshold Anchor is reached.

🔒 **Resource economy:** Resin/Resin Clumps (raw→processed pair, giving Pale Garden exploration an economic purpose); Affinity Metal recipe (Affinity Shard + Iron/Gold Ingot → type-specific Affinity Metal); a decoupling decision to build biome-distribution weighting on true vanilla/common biome tags rather than Vanilla Backport's specific tag namespace, so the core system doesn't become hostage to one content mod's continued presence. 🔒 **Liquid Source** (from Sync Update #2): a blank, unaffiliated carrier fluid imprinted with a specific Affinity via recipe (Affinity Shards + Liquid Source → Liquid [Affinity]) — gives the existing "Liquid Affinity" idea an actual named origin material. Known consumers enumerated to stress-test the Core's API (not hardcoded): attunement wheel, Affinity Metal recipes, Glow Goo's Affinity-infusion variant, biome-tag distribution, Field Guide's Research tab ledger, Resonance Anchor, Biosphere corruption/restoration state, SimpleTMs' blank-TM recipe.

---

## 3. World Architecture — layers and lore

🔒 **Design principle:** don't let worldgen mods replace each other — give each one a physical place, ecological purpose, or narrative reason to exist. Four coexisting layers: 🌎 Primary/ground Overworld, ☁️ Aero Islands (above), 🕳️ Underground Overhaul (below), and Lost/Corrupted Biomes (severed-off pocket dimensions, not a normal layer).

❓ **Base Overworld worldgen mod — still not locked**, and this blocks finishing both the sky and underground designs below (they need to know what they're layering onto). Terralith explicitly rejected; Tectonic left at "maybe, only if it fits the final stack."

🔒 **Aero Islands** — reframed from "replaces the Overworld" into a vertical ecological layer above it: ground → cloud transition → Aero sky ecosystem (Flying/Dragon/Electric/Psychic/Ice-leaning). Altitude-band gradient: **Low sky** (scattered small islands, mostly safe, Flying/Normal/Grass, occasional ruins) → **Mid sky** (larger islands, weather, resources, danger) → **High sky** (huge islands, Dragon/Flying ecosystems, rare Pokémon, powerful trainers, ancient structures, Titan content) → **Extreme altitude** (near-mythical, proposed home for legendary-adjacent encounters/major objectives, no separate dimension needed). Explicitly not exclusively type-gated — small ecological surprises encouraged at any altitude (a tiny Bug/Grass forest island, a stormy Electric/Flying island, a frozen Ice/Flying island). ⚠️ **Real technical blocker, not yet attempted:** Aero Islands' own generation is its own ChunkGenerator (Lithostitched-based) and replaces worldgen by default — genuine layering needs real integration work. Two candidate approaches, neither attempted: **Option A** — build a compatibility layer constraining Aero's own generator to an upper Y-band; **Option B** — build a separate "C.E.R. Sky Layer" generator reusing Aero's island-gen *concepts* without depending on the mod's ChunkGenerator, giving full control of altitude bands and how sky geography echoes the ground below it (a warm ground biome gets warm-associated sky islands above it, etc.). Recommendation is to inspect Aero's actual generator source before choosing — not done yet.

🔒 **Underground Overhaul** — the third ecosystem, explicitly *not* "the Overworld with a ceiling" and not a loose bag of vanilla cave-biome variants. Design shift: caves → **habitats** — continuous cavern systems (a stalactite forest opens onto a river, glow fungi along it, Pokémon gather at the water, the river vanishes into a waterfall into a different habitat downstream) rather than disconnected biome stamps. Proposed foundation: **YUNG's Better Caves** (huge caverns/lakes/rivers, can run alongside vanilla generation rather than replacing it — configure conservatively so huge rooms stay a discovery) + **Tectonic** (genuine underground rivers connecting to surface hydrology, deep lava tunnels) + **Alex's Caves: Refabricated** as rare "wonder" punctuation only (Magnetic/Primordial/Toxic Caves, Abyssal Chasms, etc.) — explicit caution against stacking it everywhere. **Ten proposed archetypes** (design sketch, not final): Verdant Caverns (underground-rainforest Lush Cave, "Lush Cave = biome; Verdant Cavern = ecosystem"), Subterranean Riverlands (a proposed signature identity — real river geography, beaches, rapids, deltas), Fungal Forests (vertically layered like a real forest), Crystal Caverns (geological, tied to Affinity concentration — explicit anti-goal of "purple shiny cave"), Deep Magma Systems (geothermal, not "more Nether"), Underground Glacial Caverns, Abyssal Caverns (verticality-first, giant shafts), Rootworld (surface forest roots extending underground, visible surface-underground link), Underground Wetlands, The Deep (Alex's Caves rare-discovery territory). None of the three foundation mods have MMI entries yet.

🔒 **Lost/Corrupted Biomes** (formerly "Yatters Biospheres," reframed at Wesley's request from "dream world" into **quarantine, not creation**): ecosystems corrupted long ago and severed from reality into isolated biospheres. Corruption spectrum: Healthy → Tainted → Corrupted → Lost. Research-gated restoration choice: **Purify** (restore to Overworld) / **Stabilize** (keep isolated, preserved) / **Harness** (deliberately control the corruption — corrupted Pokémon, unusual forms, unique resources, altered evolution, dangerous encounters). Corruption is **bidirectional** — Biosphere→Overworld via restoration, AND Overworld→Biosphere (a healthy biome can destabilize mid-play and become newly quarantined) — a dynamic world-history mechanic, not one-way cleanup. Titans can be ecosystem anchors — some are the reason a Lost ecosystem still exists; defeating/capturing one destabilizes it and unlocks restoration research. ❓ What actually caused the original corruption event is a deliberate, intentionally-open late-game mystery.

🟡 **Biosphere access split (proposal):** **Threshold Anchor** (primary, "real" mechanism — build one via Affinity research at a detected quarantine site) + **Dream Echo** (secondary/flavor — Psychic-affinity Munna/Musharna research opens a temporary unstable partial view, an earlygame teaser, obtainable earlier but less reliable). Resolves the tension between the fun Munna-dream idea and wanting a scientific-feeling primary mechanism.

🔒 **Lost Mob Grinders** — ancient/lost-technology worldbuilding, deliberately NOT Pokémon-exclusive: ruined structures contain damaged mechanisms, the player recovers components (not a working farm handed to them), recovered parts feed into the player's own machinery. Locked lore distinction: *Modern technology* = we manufacture it. *Lost technology* = we recover machines whose principles we don't initially understand. *Research* = studying recovered machines teaches us how to reproduce their functions. 🟡 Proposed merge (awaiting sign-off): Lost Mob Grinders and Lost Biomes are artifacts/casualties of the **same** historical catastrophe — recovering a grinder and researching a quarantined biome become two entry points into one mystery.

### 3a. Carried forward from Sync Update #2, not yet re-confirmed in current docs

⚠️ **The Sundering is dead as a name.** Now three names, one event, describing three different civilizational eras' understanding of it: the ancients' **Ruin of Echoes** (originally misattributed to Echo/Memory phenomena; corrected once the real cause — Affinity dissipation — was understood, but the old name was kept anyway, as a historical artifact of belief), the modern era's **Great Resonance Divergence**, and a future era's **Unison Break**.

⚠️ **Player-origin backstory, fully resolved per Sync #2, connecting several previously-separate systems:** the player fell through an accidental breach in Space — not a functioning system, a crack in an imperfect seal. This single event: (1) stripped 7 of the player's 8 Resonance Hearts, and (2) explains Trainer Affinity's origin — exposure to all 18 Affinities during transit, balanced rather than corrupted, hence the player is receptive rather than Shadow. "Get home" is the narrative spine; restoration is the gameplay spine; they converge because restoration turns out to be a *requirement* for passage home, not merely a parallel activity.

⚠️ **Research Station** (physical crafting/power/archive multiblock) — described as fully designed and locked per Sync #2, pulled from a real submitted 3D model file, with genuine three-position interaction logic: left block = crafting GUI, center block (where a laptop-terminal prop sits) = Replication Terminal GUI, right block = Archive GUI. No trace of this in the current doc store — worth confirming whether this got folded into the Research/Synthesis Altar concept (§4) or is a wholly separate structure.

---

## 4. Research System & Field Guide

🔒 **Research System Charter** (dividing four systems so they don't compete for the same job — proposed, awaiting formal sign-off but functionally the working plan):
- **Cobblemon Snap** owns photographic/observational research: encounter, photograph, pose, activity, habitat documentation, Snapdex progression.
- **Cobblemon Research Tasks** owns active/interactive research: catching, battling, breeding, evolving, item/move use.
- **Field Journal** (custom, built atop both) owns the narrative layer: notes, favorite photos, discovered lore, world/biome context.
- **FTB Quests** owns the campaign/expedition layer: multi-step story content not tied to one species.
- The already-locked Field Guide UI is the single front-end window into all four, not an implementation of any of them.

🔒 **Major discovery: Cobblemon Snap as the research backbone**, which reframed the whole system from "build from scratch" to "mostly configure/extend." Confirmed real: photos scored on distance/framing/behavior/facing/conditions; group photos; **5 built-in research levels per species**; tracks forms/poses/biomes/shiny/best-score/total-photos; 3D presentation + species entry + gallery; **tasks are fully datapack-customizable** (id/title/description/trigger/target/amount, item+CobbleDollar+command rewards, live-reloadable via `/snap reload`). ⚠️ **Not confirmed:** whether task/research *tabs or categories* are customizable beyond the fixed Snapdex page structure — open unknown. Workaround if not: treat each species' own entry as the de facto research file, organizing tasks conceptually rather than via literal tabs.

⚠️ **Open technical question, unresolved, consequential:** can Snap's aspect-tracking recognize *custom* aspects (Shadow/Fractured/Fusion), or is its tracking hardcoded to Cobblemon's one built-in shiny flag? Best-guess opinion leans "hardcoded to shiny only" (since these are custom aspects introduced after Snap was written), but this is unverified — needs Snap's source inspected or its author asked. If it can't natively extend, variant tracking gets built in the Field Journal layer instead, reading Cobblemon's aspect data directly via KubeJS.

🔒 **Two-camera resolution:** Cobblemon Snap's camera = the field-research instrument (owns Field Guide's photographic evidence). **Exposure** = the personal/artistic instrument — scenery, printable physical photos, camera stands, developing, no research scoring, for players who want photography as its own hobby (confirmed current 1.21.1 support across all four loaders). A generic "handheld camera" placeholder is retired as redundant.

🔒 **Field Guide UI/UX — locked visual language**, confirmed against a generated mockup: red-bound digital field notebook, embossed page-cards as navigation, silhouettes for undiscovered Pokémon, sprites/photos for discovered ones, nested Document→Section→Entry→Detail navigation, physical-tab section navigation. Design law: *it shouldn't feel like a menu pretending to be a book — it should feel like a notebook that happens to function as a menu.* Main menu tabs confirmed from the mockup: **Species / Biomes / Resources / Research.** Variants page shows Normal/Shiny/Shadow/Fractured tabs — ❓ **Fusion is conspicuously absent; open decision** whether it's a 5th variant tab or belongs in its own Species Index entry (a Fusion result arguably being a distinct creature, not a variant of one parent).

🔒 **Proposed four-layer structure** (design-reference only — World Remembers: Dear Diary's philosophy, not the mod verbatim): **Pokédex** (objective species data) → **Research** (player-discovered facts) → **Journal** (personal narrative: notes, photos, milestones) → **World Memory** (auto-generated significant-event log: first encounter/capture/evolution/shiny/legendary/Titan-transformation entries). ⚠️ Caveat: Dear Diary has no native Cobblemon awareness out of the box — this needs a parallel custom system bridged via KubeJS hooks into Cobblemon's events, unless Dear Diary exposes a public event API (unconfirmed).

🔒 **Research → Application infrastructure:** **Modest Magic** (an Altar+Pedestal replacement for vanilla enchanting, datapack-customizable Infusing/Enchanting/Summoning recipes) proposed as the physical Research/Synthesis Altar — gives a visually legible ritual-crafting station for Affinity Infusion without inventing a multiblock from scratch, with "Summoning" reinterpreted as Pokémon/material synthesis rather than literal monster summoning. Feeds into Fusion Crafting (theory) → Synthesis Chamber (practice).

### 4a. Carried forward from Sync Update #2 — Discovery, Progression, and Fusion resolutions

🔒 **Discovery Before Ecology:** governing principle resolving how uncatchable/undiscovered categories (Shadow, Fractured, Fusion, Fakemon) can appear in the world at all without contradicting "nothing special spawns before it's earned" — undiscovered phenomena don't participate in ordinary wild spawning until discovered; instead, rare uncatchable **Anomaly Encounters** (gated behind research-tier milestones, so the mechanic can't be missed for 200 hours OR spoiled at hour 2) provide first contact. Different phenomena get different first-contact mechanisms rather than one universal event.

🔒 **Research Tier Progression:** a hidden advancement branch (**Observer → Surveyor → Researcher → Specialist → Master**, names not fully locked), invisible until the player's first legitimate research action. Six research categories including **Chain Research** (uninterrupted same-species streaks, escalating strictness by tier). Master unlocks specialized branches (Ecology/Anomalies/Taxonomy) rather than being the endpoint — Shadow/Fractured/Fusion/Fakemon research lives there. ⚠️ Flagged real redundancy risk: Cobblemon Unchained (a real addon, 2.6M+ downloads) has a near-identical "consecutive same-species streak" mechanic already — recommend not running both alongside Chain Research.

🔒 **Research-to-Quest Bridge:** research milestone → hidden Minecraft advancement (sidesteps needing a custom CriterionTrigger) → FTB Quests' native Advancement task → quest progresses. Avoids hundreds of near-identical quests; research data stays the sole source of truth.

🔒 **Fusion Ownership Resolution** (resolves whether Fusion research could invalidate the Synthesis Chamber): **"Research can discover a Pokémon. Synthesis can manifest a Pokémon. Capture establishes ownership."** Original source Pokémon are NEVER consumed. Three escalating material-input tiers: **Biological Template** (a non-destructively submitted duplicate specimen) → **Resonance Template** (Affinity materials substitute once a species' signature is mapped) → **Synthetic Template** (full construction from discovered materials, no living specimen required, once the organism's Resonance structure is fully understood). Successful synthesis produces a **wild encounter**, not an owned Pokémon — mirrors the Titan two-stage weight (manifestation, then capture, as separate meaningful moments). Failure is genuinely safe: only spent materials/templates are lost, never the source Pokémon; failure outcomes tie into the existing Fractured/Shadow categories, giving Fusion/Fractured/Shadow a shared origin mechanism. 🔵 Not locked: reaching a research state sophisticated enough to synthesize a species never personally caught (framed as an advanced achievement: naturalist → researcher → synthesist).

🔒 **Progression backbone unification:** **ProgressiveStages is the single source of truth** for "what has this player unlocked." RCT's trainer level-cap triggers and any custom Route Mode gate write TO ProgressiveStages flags on completion, rather than keeping independent state. 🟡 **Route Mode:** confirmed via research that a real "Routes" mod exists (road-generation only, not progression-gating) and Cobblemon Nuzlocke Mode is a real toggle-UX precedent, but **no pre-made mod does sequential route-by-route gating** — this is a build-it-or-shelve-it decision, not a which-mod decision. Proposed as a small custom build: Routes supplies free road geography; a custom opt-in toggle (styled after Nuzlocke Mode's command pattern, off by default, per-player, saved) rides on ProgressiveStages + RCT key-trainer defeats. A player who never touches the toggle plays completely free-roam exactly as today. (This same idea was independently re-raised by Wesley outside the original ChatGPT transcript later — same open decision, not yet actioned either time.)

---

## 5. Shadow Pokémon — full identity design (large design brief, not yet built)

**Design goal, explicit brief from Wesley:** don't make Shadow just another "black recolor" reused from Pixelmon/server/fan content. A player should recognize a C.E.R. Shadow Pokémon by its *behavior*, not just its palette, and removing the Shadow state should feel like a real, weighed decision — not an automatic upgrade.

🔒 **Core philosophy:** Shadow Pokémon are powerful, unstable, and useful *precisely because they're dangerous.* Not "Normal→Shadow=stronger" but "Normal→Shadow=altered risk/reward Pokémon."

🔵 **Shadow Resonance** — an internal combat-resource meter, rising from dealing/taking damage, super-effective hits, Shadow-move use, certain incoming attacks/status. Three states: **Stable** (normal benefits) → **Resonant** (small offense/defense bonuses) → **Frenzied** (big power spike — damage, crit, priority/speed, empowered Shadow moves — at a cost: reduced defense, more incoming damage, chance of losing control).

🔵 **Shadow-exclusive move family** (not "Shadow Ball but better" — communicates Shadow as a *state/force*, not another elemental type): Shadow Pulse (scales with Resonance), Shadow Break (bonus vs. stat-boosted targets), Umbral Rush (priority, raises instability), Void Claw (high crit, recoil), Shadow Drain (damage+heal, raises instability), Eclipse (powerful field-affecting move).

🔒 **Shadow is a state, not a 19th type** — a Shadow Lucario stays Fighting/Steel and carries a separate Shadow State layered on top. Keeps typing math and the Type Relationship Matrix untouched.

🔵 **Shadow ability pool** (not one universal ability): Umbral Adaptation (temp boost after taking super-effective hit), Shadow Surge (Shadow moves strengthen below 50% HP), Predatory Instinct (bonus vs. weakened targets), Dark Resonance (certain attacks raise Resonance), Unstable Core (big power, occasional recoil), Abyssal Skin (reduced damage from certain attacks, longer status durations).

🔵 **"Corrupted Affinity":** Shadow Pokémon may not carry normal Affinity — instead a Corrupted Affinity that fluctuates by environment (a Shadow Jolteon in a highly-charged area reacts with Electric Affinity, gaining a temporary "Overcharged Shadow" effect). Ties Shadow directly into the world-affinity/region system. ⚠️ Compatibility with this mechanic is unresolved until Affinity's spatial model itself (grid-diffusion vs. Anchor/radial-falloff) is settled.

🔵 **Shadow Outbreaks:** normal Pokémon spawn because a biome supports them; Shadow Pokémon appear where something is *wrong* — corrupted structures, certain ruins, specific weather, or a temporary world event (spawn rate/rarity/strength spikes, special research objectives unlock, investigable source, possible boss/alpha at the end). Ties Shadow into exploration, research, quests, worldgen, and progression simultaneously.

🔵 **Capture behavior** — not identical to normal capture: a suppression mechanic where the player weakens a Shadow Pokémon's Resonance before capture, aided by purification items/Affinity items/research equipment/specialized balls.

🔒 **Branching resolution — flagged as potentially C.E.R.'s single most distinctive Shadow mechanic. Purification is not one-way:**
- **Keep Shadow** — retain everything as-is.
- **Purify** — gain purified traits/different ability pool/moves/possible stat changes/unique research completion.
- **Stabilize** (third path, distinct from Purify) — don't remove the Shadow energy, learn to *control* it: **Unstable Shadow → Stabilized Shadow → Mastered Shadow**, each stage less volatile, unlocking more advanced Shadow abilities, ending in a unique cosmetic effect/move/ability at Mastered. The final form isn't "purified" — it's "a Shadow Pokémon the player learned to control."

🔵 **Shadow research tree:** Observe → Study (observe Resonance) → Battle (defeat one) → Capture → Control (stabilize) → Purify → Master (successfully use Shadow abilities) → Shadow Species Mastery.

🔵 **Visual language** — explicit anti-goal: avoid the black-recolor-with-red-eyes trap. Proposed grammar: dark particulate/energy effects, floating particles, distorted aura, smoke-like energy, flickering outlines; species-specific glowing/irregular eye distortion (never universal red); distorted silhouettes, energy leaking from specific body areas, cracks/veins of Shadow energy, animation quirks (idle spasms, unusual breathing, distorted attack/entrance animations) — the player should recognize a Shadow by *behavior* before recognizing the species. Species-specific examples given: Shadow Charizard (dark/unstable flames), Shadow Gyarados (electrical-storm aura), Shadow Lucario (Aura-concentrated energy), Shadow Gengar (partially intangible, leaking energy).

🔵 Other sketched ideas, all live proposals not locked: selective Shadow-specific evolution branches (not for every species); team-composition instability scaling (multiple Shadows on one team raising collective Resonance, a real strategic cost); non-combat utility moves (Shadow Sight/Sense/Resonance/Umbral Interaction/Tracking, making a Shadow a genuine exploration tool); a camera/research tie-in (photographing a Shadow under specific conditions reveals Shadow-specific research entries); rare Shadow anomaly variants (Resonant/Ancient/Feral/Stable/Apex/Affinity-Touched Shadow).

❓ **Scope discipline — the proposed "pick 4-6 pillars" list, awaiting Wesley's confirmation, not locked:** (1) Distinct visual identity, (2) Shadow State layered on typing, (3) Shadow Resonance, (4) Shadow-exclusive moves/abilities, (5) Purify vs. Stabilize vs. Remain Shadow, (6) Shadow Research. Signature framing line: *"Shadow Pokémon are not inherently evil or simply stronger. They're unstable. The player gradually learns how to live with them."*

---

## 6. Fractured Pokémon — the Poké Synchro Device pivot (large design brief, not yet built)

This idea grew directly out of the Shadow-identity discussion, giving the three "special variant" categories a clean non-overlapping split: **Shadow = corrupted/dangerous/power-focused. Fractured = incomplete/unstable/resonance-focused. Fusion = complete synthesis/deliberate combination.**

🔒 **Core rule, locked as foundational framing pending the actual build:** **only Fractured Pokémon can be Synchro'd, because only Fractured Pokémon need a second consciousness to achieve temporary stability.** A Fractured Pokémon is missing pieces of its body/energy/dimensional structure and is normally too unstable to interface with. The Poké Synchro Device doesn't "control" it — **the trainer becomes the missing stabilizing component. The trainer doesn't fuse with the Fractured Pokémon; the trainer completes the resonance that lets it exist in a stable state.** This reframes every subsequent design question as "what does this Pokémon become capable of when a human consciousness temporarily completes its fracture?"

🔵 **Synchro grants world-interaction abilities, not just combat buffs.** While synced, a Fractured Pokémon's abilities manifest as things the *player* can do in the world. Worked example (Fractured Lucario): fracture energy visible around the player, dramatically stronger Aura abilities, ability to interact with intangible fracture objects, perceive fracture anomalies, temporarily stabilize nearby fractured entities, perform a "Resonance Burst," interact with dimensional tears normal players can't.

🔵 **Instability risk while synced:** **Stabilized → Strained → Critical**, with visual distortion, growing power *and* growing risk — abilities strengthen but attacks become unpredictable, the Pokémon may forcibly eject the player, the environment can be left with temporary fractures. Deliberate "should I push it further?" tension matching Fractured's risk/utility identity.

🔒 **Niche separation:** Normal = reliable. Shadow = powerful/dangerous. **Fractured = utility/exploration/resonance, not necessarily the strongest Pokémon.** Fusion = unique combined form/specialized power. Keeps the categories from competing for the same "best Pokémon" slot.

🔒 **Type-based Resonance abilities — the adopted structure, refined at Wesley's suggestion from a pure species-lock to avoid mandatory-single-species hunts.** Two layers:
- **Layer 1 — Type = the fundamental Resonance capability.** Any suitably Fractured Pokémon of a given type gets that type's baseline interaction. Five types sketched so far (**13 remain unassigned — a real open item**): **Ghost Resonance** (phase through fracture barriers, enter fracture shadows, interact with intangible fracture objects, perceive spectral/fracture traces), **Psychic Resonance** (move resonance objects remotely, read psychic echoes, reveal hidden dimensional structures), **Electric Resonance** (interface with fractured machinery, redirect electrical anomalies, power dormant systems), **Fighting Resonance** (break/stabilize physical fracture structures, resist unstable environments), **Water Resonance** (interact with resonance currents, stabilize corrupted waterways, traverse unstable aquatic environments).
- **Layer 2 — Species = a smaller unique trait on top of the type baseline.** Example: Fractured Gengar's Shadowstep (longer fracture-shadow dwell, move between connected pockets) vs. Fractured Mismagius's Hex Echo (reads magical/fracture echoes other Ghosts can't) vs. Fractured Rotom's Possession (temporarily inhabits fractured machinery) — all three are Ghost Resonance, but distinct. Dual-typing combines both Resonances (Fractured Lucario = Fighting's physical-stabilization + Steel's metal-conduction Resonance, plus a species trait like Aura Sense). Tiered depth within a type is also proposed (Ghost Phase I: pass through thin barriers → Phase II: enter fracture shadows → Phase III, rare/species-specific: travel between connected fracture spaces).

🔒 **Generative design rule, locked as the guiding principle:** *Type determines what a Fractured Pokémon can do. Species determines how it does it. Types provide the language. Species provide the accent. Research teaches the player how to speak it. Synchro lets the player speak it themselves.*

🔵 **Research-system tie-in mirrors the Shadow tree:** a newly-found Fractured Pokémon starts as "Resonance Behavior: Unknown," reveals observed behavior, then a hypothesis (e.g. "Ghost-type resonance permits temporary interaction with nonphysical structures"), then a confirmed property, then species-variation discoveries. Individual Fractured Pokémon of the same species can have slightly different resonance behavior — flavor lore: "Fracture behavior is influenced by both biological species and the nature of the fracture that produced it."

🔵 **Sync moves as real spell effects** — Wesley's idea: while synced, pressing a move key **directly triggers the real spell effect** an equivalent Iron's Spells 'n Spellbooks scroll/book would cast, bypassing the scroll/book UI entirely (`Move pressed → check assigned spell/effect → invoke spell → consume PP/cooldown → resolve effect`). Iron's Spells exposes a real API for registering custom spells/schools, so this is genuinely buildable, not a reskin. Not limited to Iron's existing spells — new custom spells can be authored specifically for the Pokémon-move system. Example mapping (synced Fractured Charizard): Flamethrower = actual Cobblemon move; Fireball = Iron's Fireball; Air Slash = custom projectile; Heat Wave = custom AoE spell; Dragon Pulse = custom magic projectile.

🔵 **Existing mod precedent confirms the UX is buildable:** Cobblemon: Synchro Machine already lets a player morph into and play as a Pokémon with Z/X/C/V mapped to moves 1-4, with experimental support for starting a normal turn-based battle while morphed. (Also noted: Cobblemon Quick Battle / SV-style auto-battle mods exist, and Cobblemon's normal battle already runs on Pokémon Showdown under the hood.)

🔒 **Proposed three-layer combat architecture, not built:** (1) Normal Pokémon moves — untouched standard Showdown battle screen. (2) Fractured Sync moves — real Minecraft abilities on Z/X/C/V while synced, each backed by a Cobblemon move effect, an Iron's Spells effect, or a fully custom C.E.R. ability. (3) **Titan fights — the proposed payoff use case:** a Fractured Pokémon synced against a physically-moving, dodging, terrain-destroying Titan boss, aimed with Z/X/C/V in real time instead of a static HP bar — recommendation to keep authentic Cobblemon/Showdown damage/type math underneath the action layer, with only the visual/physical manifestation as Minecraft-side action combat. Framing line: *"A normal Pokémon performs a move according to its natural battle mechanics. A Fractured Pokémon has an unstable connection between Pokémon energy and the physical world, allowing certain moves to manifest directly into Minecraft's physical/magical systems."*

🔒 **Recommended build approach:** treat this as C.E.R.'s own integration layer (a "Move → Effect Adapter") rather than forcing one mod to own the whole feature — combining Iron's Spells' custom-spell API, Cobblemon's own move/Showdown data, and Synchro Machine's keybind-UX precedent as the three source ingredients.

❓ **Open items on Shadow/Fractured as a pair:** which ~13 remaining types get a Fracture Resonance ability; confirm/trim/expand the Shadow "6 pillars" list; build-order question — does Fractured/Synchro depend on Iron's Spells making the final mod list, or does it need a from-scratch custom-spell layer regardless; no MMI entries yet exist for Cobblemon: Synchro Machine, Iron's Spells 'n Spellbooks, or a dedicated "Poké Synchro Device" mod (the last of which isn't even confirmed to be a real, currently-maintained mod — needs a lookup pass).

---

## 7. Ball System — full architecture (carried forward from Sync Updates #1–2, not re-confirmed in current Claude docs, real gap)

⚠️ This entire section describes work that exists only in the prior ChatGPT sync docs — it has no presence in the current Claude Project doc store at all. Reproduced in full so it isn't lost.

🔒 **"Resonance Ball" is the true top-level umbrella** for the entire ball-technology family — not a specific tier, the name of the whole system. Two sub-families sit under it: **Affinity Balls** (Attunement Core) and **Anomaly Balls** (Anomaly Core). All produced by one named R&D institution: the **Modular Ball Program**.

🔒 **Full Modular Ball Workshop architecture:** Ball Shell/Base → **Identity/Lid** (the ball's native type + innate effect — the anchor other components modify, never replace) → **Core** (capture strength) → **Attunement Core** (established Affinity) → **Anomaly Core** (non-standard phenomena — a *sibling* to Attunement, not a power tier above it) → **Treatment** (special function) → **Calibration** (optional — activates dormant modifications, never gates base function) → **Master Core** (replaces the Nether Star in the base Modular Ball mod's Master Ball recipe, combinable with any other component set).

🔒 **Universal blank Cores, attuned afterward** — for BOTH the Resonance/Attunement Core and the Anomaly Core. Not pre-typed shopping-list items; craft a blank, then attune it. Reasoning: matches "Attunement" as a process verb, matches the pack's multi-stage-crafting house style, better serves the locked **"No Best Ball"** design rule (decide what to attune in the moment, not predict needs at the bench).

🔒 **Anomaly Core origin:** not a separate raw material — a *distorted/unstable version of a Resonance Core itself*. A Resonance Core exposed to enough instability (low-Affinity conditions, proximity to a real anomaly) becomes an Anomaly Core, reusing the "Distorted Ecosystem" terminology already locked for the low end of the World Affinity scale. Gives Anomaly Balls real narrative logic: built from material that's already been through the same instability as what they're containing.

🔒 **Vanilla/mod ball absorption strategy:** standout mechanics from vanilla and mod balls (Quick Ball, Timer Ball, Dusk Ball, etc.) get folded into the Resonance Ball system as Treatments or unique perks, then the original separate items retire — explicit "No Best Ball" applied at the *pool* level, not just per-ball, killing the "which of 20 overlapping balls do I carry" problem. A first pass exists (Quick Ball→Rapid Deployment, Repeat Ball→Species Recognition) but isn't exhaustive. ⚠️ **A real gap found, not yet resolved:** every existing Treatment governs the *capture moment*. Nothing covers *post-capture* effects (Friend Ball, Luxury Ball, Heal Ball have no home) — a missing *category* of Treatment, not just a missing Treatment.

🔒 **Master Ball** keeps its place, recontextualized: the *Masterwork* tier of the Resonance Ball system specifically (reusing the top tier already named in the Resonant Transformation ladder). Its guaranteed catch is earned as a literal amalgamation of every Core/Attunement/Treatment/Anomaly tech at once, not an arbitrary stat. Poké/Great/Ultra stay a fixed, unmodified control group.

🔒 **Beast Ball becomes a shared baseline for THREE branches, not a straight merge:** **Dimensional Ball** (Ultra Beasts, spatial displacement), **Temporal Ball** (Paradox, temporal displacement), and a new **Titan Ball** (Titanization specifically).

🔒 **Titan Ball's first appearance is a discovery hook:** the player's very first Titan encounter hands them a single Titan Ball *before* anything about Titans or Titan Balls has been explained — they have to work out through play that it's the one thing that can actually catch what they're facing. Motivates the whole Titan research arc organically.

🔵 **ER Ball (Eeveelutional Resonance Ball)** — supersedes an earlier GS Ball reinterpretation idea that was proposed but never locked. Born from Eeveelutional Resonance research needing to *measure*, not merely capture, Resonance. Evolves Prototype → ER Ball → Mk. II/Resonance Ball — gives the Resonance Ball name a genuine in-fiction historical origin and fulfills the Ritual Legendary-eligibility path's need for a physical worked example.

🔵 **Ender Dragon Titan dual pathway:** catchable through an ordinary encounter with no Titan fight required, OR fought as a Titan with victory unlocking an evolution/Mega-Evolution path into a "Chaos Guardian" specifically. The narrative payoff (years of vanilla rivalry becoming an ally) is the explicit point.

🔵 Draconic Evolution's Chaos Shards + Ender Dragon/Chaos Guardian pairing — logged as spur-of-the-moment brainstorm, not locked.

🔵 A large **Ball Fusion/Discovery combination board** (50+ specific Identity+Attunement+Treatment pairings, e.g. Occult/Eclipse from Dusk+Moon+Ghost+Dark) was generated but deliberately NOT transcribed in full — only governing structural principles are locked: most combinations should be Workshop **discoveries**, not pre-listed items; six reaction-outcome categories (Compatible/Synergistic/Unstable/Contradictory/Anomalous/Transformative); trackable ball genealogy; factions reframed as teaching Treatments (schools) rather than gatekeeping named balls. Full board deliberately deferred to its own dedicated session.

🔒 **Ball assembly is ONE Workshop operation regardless of component count** — explicit anti-AllTheMons design constraint. Component preparation can be its own separate gameplay system; assembly itself never becomes a multi-station chore.

🔒 **Ball Reverse Engineering** locked as a world-discovery mechanic: balls must be physically found and analyzed (progressively, non-destructively) before their architecture becomes reproducible. Ties ball acquisition to varied sources and a trackable Field Guide Ball Archive.

---

## 8. Mod research and Master Mod Index state

🔒 **Confirmed environment:** Minecraft 1.21.1, NeoForge, **Cobblemon pinned to 1.7.3**, KubeJS 2101.7.2.

🔒 **Cobblemon version pin — resolved via real testing:** Cobblemon Snap 1.1.3 crashed opening the Snapdex biomes-inline section after upgrading Cobblemon to 1.8.0 (`NoSuchMethodError: SpawnDetail.getBucket()`) — diagnosed as Snap being compiled against a pre-1.8.0 spawning API. **Fixed by reverting Cobblemon 1.8.0→1.7.3**, confirmed by Wesley's own in-game testing. Pinned pack-wide until Snap (or a replacement) supports the newer API. ❓ IV Scanner/Paleontology/CobbleStats were flagged against the same compatibility gap — expected but **not yet confirmed** fixed by the same revert. Separate 1.8.1 hotfix research (Type Gem worldgen-stall fix, TM/ball fixes) is **historical/superseded** — the pack rolled back below both 1.8.0 and 1.8.1.

🔒 **Tier 1 LOCKED core:** Cobblemon + deps, Architectury, FTB Library/Quests/Teams, KubeJS, Kotlin for Forge, Rhino, Patchouli, JEI/EMI, ModernFix, FerriteCore, ImmediatelyFast, EntityCulling, CobbleDex, Better Advanced Tooltips, Cobblemon Quests (the FTB↔Cobblemon event bridge).

⚠️ **Live-instance cross-check (2026-09-18) found real gaps against the locked tiers:** Patchouli not confirmed present (verify it's bundled with the installed Field Guide mod); **ModernFix, FerriteCore, ImmediatelyFast, EntityCulling — all absent from the live instance** despite being Tier 1 locked — recommended adding now, before Affinity Core starts firing frequent KubeJS events, so performance is baselined early. Newly seen but untiered: Controlling, Explorer's Compass, FTB XMod Compat, Immersive Overlays, Item Descriptions, Modular Poke Balls, Nature's Compass, Searchables, Field Guide itself. **World Remembers: Dear Diary is installed live** but has no native Cobblemon awareness as-is — needs an explicit keep/bridge-later/drop decision, not silence.

🔒 **Confirmed/added this cycle:** Poké Belt (Wesley's direct instruction — "add the Poké Belt mod to the MMI as confirmed" — kept regardless of its still-unverified NeoForge port status), Smart Key Prompts/Keybind Hider/Keybind Atlas.

🔒 **Resolved clusters:** Cobblemon Occupied Pokeballs (native NeoForge port exists — REFORGED by Jaypixl7); PC Overhaul (MoreCobblemonTweaks recommended, Cobblemon Home dropped for scarcity-design conflict); trainer architecture (TBCS + Easy NPC confirmed as foundation, old standalone RCT mod dropped, current stack redefined around RCT-API + Run & Bun); Habitat Block (no NeoForge equivalent, resolved as mostly unnecessary since Route Mode/Biospheres/Aero Islands are each their own biomes/dimensions).

⚠️ **Active caution flags:** Cobblemon Thufizer (direct recreation of a licensed manga character — stronger-than-standard caution); Fanmade Form Funfair license corrected to CC-BY-NC-ND.

🔒 **Vanilla Backport three-way classification:** (a) genuinely new to 1.21.1 (Pale Garden/Resin/Creaking, Wild Update backport, Spring-to-Life biome-tag animal variants, Armadillos, Happy Ghast set); (b) reimplemented vanilla features (Bundles UI, leash physics, camel spawning); (c) **bundled non-backport original "Chaos Cubed" content** (Sulfur Caves, Cinnabar/Sulfur blocks) — flagged as NOT real vanilla-future content, proposed split into two independent MMI entries so the bonus content can be dropped later without re-litigating the rest.

🔒 **Type-Affinity mod-fit research pass (2026-09-18)** mapped a candidate real-NeoForge-1.21.1 mod to each of the 18 types as design-model/content inspiration (not necessarily installs): Normal→Farmer's Delight, Fire→Powah! Rearchitected, Water→Aquaculture 2, Electric→Mekanism/Immersive Engineering, Grass→Productive Bees, Ice→Cold Sweat, Fighting→L_Ender's Cataclysm, Poison→Occultism, Ground→Terralith, Flying→Alex's Mobs (Unofficial Port), Psychic→Iron's Spells 'n Spellbooks, Bug→Productive Bees, Rock→Create, Ghost→Twilight Forest, Dragon→Ice and Fire (either NeoForge continuation), Dark→Occultism/Twilight Forest, Steel→Create/Immersive Engineering, Fairy→Twilight Forest/Ars Nouveau. Astral Sorcery and classic Blood Magic explicitly ruled out as installs (no reliable NeoForge 1.21.1 port) but their *mechanics* remain valid design inspiration for the Affinity Core's diffusion model.

🔒 **Core-system infrastructure candidates:** **Replication** (a real "turns similar resources into each other" mod, possibly resolving an old "replication adaptation" term reference); **Modular Poke Balls** (already installed, untiered — near-direct base for the Attuned Ball family above); **Applied Mekanistics** (not proposed as an install — precedent only, that "glue mods between two systems" is a normal pattern).

⚠️ **PBTW ("Pokeballs to the Walls")** — a real 36-ball Gravelmon-derived Cobblemon-compatible ball pack, referenced in material that got compacted away before it could be fully recovered verbatim. Description that did survive: standalone (no Gravelmon dependency) for NeoForge 1.21.1, includes a Nuzlocke Ball with permadeath capture behavior, a Rocket Ball family, a Typing Ball, a Feather Ball, a Coral/Ancient Coral progression pair, identity-themed cosmetic balls, optional Create: Cobblemon Balls Overhaul recipe compatibility. Recommendation was to reverse-engineer each ball's actual Gravelmon behavior before assigning it an MMI confidence tag. **Not actioned; no MMI entry exists.** Recoverable either by Wesley re-pasting the original conversation, or by running a fresh mod-research pass on it directly (it's a real, nameable mod).

⚠️ **Also lost to compaction, never recovered verbatim, flagged so it isn't forgotten:** a **1,621-mod source-pack cross-reference/triage pass** that sorted a huge candidate mod list into Strong/Candidate-investigate/Integration-support/Redundant/Cut buckets across core infra, recipe UI, the full Cobblemon addon ecosystem, worldgen, magic, tech, storage, QoL, maps, farming, mobs/bosses, plus a 1.12.2-legacy-mod mapping table. No bucket contents or verdicts survive — only that the pass happened. Only recoverable if Wesley re-supplies the original conversation.

🔒 **Deep-dive of the top Cobblemon modpack/server ecosystem** (Cobbleverse, Academy 2.0, Delta, Diosesmon, Elysium, Islands, TalonMC, and others) — standout finding: **top server-anchored packs ship deliberately minimal client mods**, with signature content (gyms, raids, Mega Evolution, economy) living server-side, not in the download. Diosesmon's PokePad (a single hub item unifying GTS/hunts/missions/player-scanning) flagged as a genuinely strong single-item design worth studying. StoneBlock 4's "Garden of Stone" pre-selection hub → 1-of-5 themed starting islands → guide NPC → central restoring "World Engine" structure → 6 Foundation Chapters is flagged as an almost disturbingly good precedent for C.E.R.'s own unfinished Six Starting Worlds/Journeys concept and the Observatory-as-central-restoration-structure idea. FTB-Cobblemon-Quests (real, open-source, MIT, 162+ quests) flagged as worth studying directly for its "catch one of each of the 18 types" branch — a near-structural-twin to C.E.R.'s own 18-Affinity system.

🔒 Several already-locked MMI mods turned up independently across this cross-reference, treated as external validation: Waystones, AE2, Xaero's Minimap, Cobblemon Better Pokedex Scanner, Catch Indicator.

⚠️ **Cobblemon Pokedex Network** — a real mod flagged by Wesley directly (not yet evaluated in depth): a *shared, server-wide* Pokédex — when a player catches a Pokémon, detailed info is recorded and shared with everyone; scanning a caught species reveals what other players already discovered; includes catch-location statistics. Genuinely different from a personal Pokédex — worth a real look.

🟡 **Core mod skeleton (per Sync Update #2):** NeoForge 1.21.1 confirmed as loader (a brief Fabric recommendation was floated and reversed within the same conversation). Sinytra Connector + Forgified Fabric API as the deliberate bridge for valuable Fabric-only mods, native NeoForge always preferred first. Layered install order proposed: NeoForge → Cobblemon + Kotlin for Forge → KubeJS + Rhino → FTB stack + Architectury → JEI (chosen over EMI for its XMod Compat integration, though current docs show both JEI/EMI still Tier 1 together — worth reconciling) + Jade + Patchouli + Curios → performance stack → worldgen foundation (Lithostitched/TerraBlender/Regions Unexplored) → QoL → Create as the one large "core" content mod, with Mekanism and Ars Nouveau deliberately deferred (Mekanism's 1.21.1 NeoForge build was labeled alpha by its own author at the time). Enhanced Celestials verified real/current (44M+ downloads) as the intended data source for a ball's Environmental Resonance Component.

---

## 9. Everything discussed but explicitly NOT decided (live proposals & open forks, consolidated)

These are genuinely undecided — included per your instruction to capture what was "brushed past" or floated without confirmation, not just what's locked:

- **Affinity as a Source-like energy network** (§2) — the single biggest undecided architecture fork in the whole project right now.
- **Grid-diffusion prototype vs. Anchor/radial-falloff World Affinity region design** — the actual working code and the actual design doc disagree and have never been reconciled.
- Resonance scope (per-partner vs. per-type ceiling vs. both).
- Death/Resonance penalty — referenced as existing, mechanics never given.
- Wheel commitment mechanic — final shape of the Resonance-Anchor commitment gate.
- World Affinity region shape — radial falloff vs. hard biome-boundary segments.
- Does Opposed's cancellation extend to World Affinity regional boundaries, or is it wheel-only?
- Does Harmonic carry a real numeric bonus or is it flavor-only?
- Storage layer for the Affinity Core — KubeJS-only vs. custom Java/Kotlin (leaning custom; untested scaffold exists).
- Base Overworld worldgen mod — blocks finishing both Aero Islands and the Underground layer.
- ProgressiveStages vs. AStages (never resolved — was supposed to get a test branch).
- Whether Route Mode gets built at all.
- Aero Islands Option A vs. Option B sky-layer implementation — neither attempted.
- Underground Overhaul mod stack — proposed, not approved to move into MMI research.
- Shadow's "6 pillars" scope list — proposed, not confirmed.
- Fractured's type-based Resonance architecture — the remaining 13 types unassigned; dependency on Iron's Spells 'n Spellbooks unresolved.
- What actually caused the original world-corruption event — intentionally, permanently open as a late-game mystery hook.
- Fusion's place on the Field Guide Variants page (5th tab vs. own Species Index entry).
- Whether Snap's aspect-tracking can recognize custom aspects (Shadow/Fractured/Fusion) at all.
- Akashic Tome vs. Eccentric Tome — pick a role or cut one.
- The post-capture Ball Treatment category gap (Friend/Luxury/Heal Ball have no home in the new system).
- The Capture Phase "show valid balls" UX question, the escaped-Titan-on-failure exact behavior, and the "Space Time" joint Palkia+Dialga recognition event's exact rules.
- Whether Elysium's survival-coequal design philosophy (Pokémon as one activity among several, not the whole loop) should be adopted or deliberately rejected for C.E.R.

---

## 10. Verification/technical items still genuinely open

- Does Poké Belt have a native NeoForge port, a Connector/Forgified-Fabric path, or should it be dropped for a reskinned Bundle? (Wesley confirmed KEEP regardless, but the technical path is still unresolved.)
- Does Vanilla Storage Interface have a NeoForge build?
- Can Cobblemon Snap's aspect-tracking recognize custom aspects, or is it hardcoded to the vanilla shiny flag?
- Does Snap's task system support custom tabs/categories?
- Is Exposure's photo/entity data readable by KubeJS/FTB Quests/Cobblemon triggers?
- Has anyone mapped Snap's full trigger-type coverage against C.E.R.'s wishlist?
- Vanilla Backport's exact per-pot storage capacity/interaction behavior in this specific setup.
- Are VB's Temperate/Cold/Warm tags exposed as ordinary Minecraft tags, or VB's own compatibility-layer tags?
- IV Scanner/Paleontology/CobbleStats — confirm actually fixed by the 1.7.3 revert (expected, not yet tested).
- Whether the Cobblemon 1.8.1-era party-UI/Pokédex bug still matters post-revert (likely moot).
- MezzConfig and Kotlin for Forge's exact required versions — never actually audited against the finalized mod list.
- EasyGui's real KubeJS-exposed client-screen API surface — blocks the Attunement Wheel build.

---

## 11. What's actually been built and tested (as opposed to designed)

To be clear about what's real vs. what's still paper design: the **only thing actually running in-game** right now is the KubeJS Affinity Core prototype (§2) — 18-type Player Affinity + Resonance + Surge + World/Area get/set, full `/cer` command surface, and the grid-diffusion mechanic, all confirmed working against the pack's real environment. Everything else in this document — Ball System, Shadow/Fractured mechanics, world layers, Research System, Field Guide — is design/architecture work, some locked as firm direction, none of it built.

---

*If anything above conflicts with more recent work on your end (ChatGPT-side), that supersedes this document — this is a snapshot of the Claude-side state as of 2026-09-22, not a claim of final authority. Paste back whatever's changed and it'll get folded into the next sync.*
