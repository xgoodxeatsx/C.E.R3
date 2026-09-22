# C.E.R. — Sweep Suite (Source Text, Verbatim)

**Provenance:** Authored by ChatGPT, pasted into the Claude session by Wesley on 2026-09-18, with an explicit instruction to confirm and integrate every sweep proposed here into C.E.R.'s official sweep methodology. Preserved verbatim per standing archival philosophy (nothing silently discarded or rewritten out of the historical record). The organized, cross-referenced synthesis built from this text lives in `CER_Sweep_Suite_FullTaxonomy.md` — read that one for day-to-day use; this doc is the source of record.

---

Absolutely. We have **more than just a "mod optimization sweep."** Over the course of building C.E.R., we've effectively developed a multi-pass pack-development methodology.

I'd organize the full process like this.

# C.E.R. Pack Optimization / Development Sweep Suite

## 1. **MMI Sweep — Master Mod Index Sweep**

The foundational pass. We take every mod source we have (current MMI, previous mod lists, candidate mods, mods from packs we've played, individual recommendations, confirmed additions, "maybe" mods, dependency mods, compatibility mods) and reconcile them into **one canonical Master Mod Index**.

Checks: duplicate mods, duplicate versions, renamed mods, Fabric/Forge/NeoForge variants, client/server-only status, dependencies, libraries, compatibility addons, Cobblemon addons, obsolete entries, questionable entries, mods that exist only because another mod was present in an old pack.

This is the sweep Claude should **never treat as just a mod list cleanup.** It is essentially our master inventory.

## 2. **Mod List Deduplication Sweep**

Separate from the MMI itself. Asks: "Are we actually counting the same thing more than once?" Resolves duplicate names, aliases, forks, renamed projects, version variants, bundled functionality, compatibility addons mistaken for independent features.

## 3. **Dependency / Library Sweep**

For every candidate mod: what does it require, and do we actually need those requirements? Identifies required/optional dependencies, libraries, APIs, compatibility layers, bundled libraries, duplicate libraries, unnecessary dependency chains — the **true footprint**, not merely the advertised mod.

## 4. **Redundancy Sweep**

For every mod/system: "Is something else already doing this?" — comparing functionality, not names. Applies to storage, worldgen, structures, maps, quests, UI, inventory, mobs, Pokémon mechanics, magic, automation, performance, exploration, building, transportation, progression.

## 5. **Functionality Overlap Sweep**

Related to redundancy but more granular — maps partial overlap between mods that aren't strict duplicates but collectively create excessive overlap. Especially useful for magic systems, worldgen, Pokémon utility, combat, storage, progression, structures.

## 6. **Feature Saturation Sweep**

Asks: even if every mod is individually good, are we putting too much of this particular thing into the pack? Evaluates density of functionality (e.g. biome/cave/structure/terrain/dimension mods collectively), not just duplication.

## 7. **Implementation Layer Sweep**

For every desired feature: what is the lowest-complexity layer capable of implementing it correctly? (Vanilla → Datapack → KubeJS → existing mod config → existing mod integration → custom addon → custom mod.) Don't automatically choose the most powerful solution. This is the principle already touched on for Affinity, applied across the entire pack.

## 8. **KubeJS vs Mod vs Datapack Sweep**

A specialized version of #7. For every custom mechanic: can vanilla do it? If no, can a datapack? If no, can KubeJS? If no, can an existing mod/addon? If no, do we actually need it badly enough for custom development? Prevents C.E.R. from becoming "a giant pile of scripts recreating half of Minecraft."

## 9. **Configuration-First Sweep**

Before scripting something, check whether the existing mod can already be configured to do it. Configuration is almost always preferable to behavioral patching.

## 10. **Compatibility Sweep**

For every retained mod: Minecraft/NeoForge/Cobblemon version, required APIs, known incompatibilities, client/server compatibility, worldgen/rendering/entity/recipe/datapack conflicts, scripting compatibility, dependency conflicts. Does it actually work with our exact environment, not just "does it exist."

## 11. **Cobblemon Compatibility Sweep**

Its own pass because Cobblemon is the primary game layer. Checks every relevant mod against Cobblemon 1.7.3's entities, battles, capture, spawning, drops, moves, abilities, evolution, breeding, riding, storage, interaction, rendering, animations, worldgen. Generic Minecraft-compatible mods can still be a bad fit for Cobblemon.

## 12. **Cobblemon Ecosystem Sweep**

Separate from compatibility — maps what functionality already exists across the entire Cobblemon ecosystem (progression, exploration, catching, breeding, storage, battling, interaction, cosmetics, marks, loot, quests, research, worldgen, structures, utility, UI, immersion) so addons aren't treated as isolated discoveries.

## 13. **Worldgen Conflict Sweep**

Checks whether overworld terrain, biomes, caves, cliffs, structures, villages, dungeons, ores, dimensions, sky generation, Aero Islands, Pokémon structures, and modded structures coexist, compete, overwrite, or multiply into nonsense — especially important given Aero Islands' high-altitude generation layered above the Overworld.

## 14. **Worldgen Density / Chaos Sweep**

Different from compatibility: even if everything works, is the resulting world too busy? Checks structure/dungeon/village frequency, biome diversity, terrain extremes, cave density, sky structures, points of interest, exploration pacing. Goal: the world feels intentionally authored, not just non-crashing.

## 15. **Progression Redundancy Sweep**

Maps every progression mechanism (Pokémon, quest, technology, magic, exploration, research, boss, Affinity, Fracture, Legendary) and asks whether they reinforce or compete for the player's attention — important given C.E.R.'s several meta-progression systems.

## 16. **Progression Gate Sweep**

For every major gate: what unlocks it, is that requirement reasonable, and is another system accidentally bypassing it?

## 17. **Progression Bypass Sweep**

Looks for alternative crafting recipes, loot, trades, structures, drops, duplication mechanics, machine/magic shortcuts, quest rewards, alternate dimensions that let a player obtain something substantially earlier than intended.

## 18. **Recipe / Acquisition Sweep**

For every important item, builds a full acquisition map (crafting, loot, quest, drops, structure, trade, machine, magic, exploration, reward) and flags accidental duplicates, infinite sources, unintended early access, impossible acquisition, recipe conflicts, useless recipes.

## 19. **Economy Sweep**

Checks the pack's resource economy — ores, ingots, gems, rare materials, drops, currency, loot, automation, machine outputs, quest rewards — for what's scarce, abundant, becomes infinite, or becomes trivial through automation.

## 20. **Automation / Infinite Resource Sweep**

The more aggressive economy check: for important resources, can it be farmed/duplicated/generated/automated/converted/transmuted/obtained elsewhere — and is the resulting infinite loop intended, acceptable, progression-breaking, or completely broken?

## 21. **Loot Table Sweep**

Checks vanilla, mod, Cobblemon, structure, drop, and reward loot for duplicates, overpowered/useless rewards, progression skips, unintended resources, conflicting tables.

## 22. **Quest Sweep**

Inspects quest structure (intro → early game → exploration → Cobblemon → technology → magic → Affinity → Fracture → endgame) for redundant quests, missing quests, unclear objectives, rewards, gates, XP, item/command rewards, hidden mechanics, discovery pacing.

## 23. **Quest Reward Economy Sweep**

Separate from quest structure: are FTB rewards accidentally becoming the optimal way to acquire everything, undermining the rest of the pack's economy?

## 24. **Mod Purpose Sweep**

Every mod should answer "why is this here?" (core infrastructure, Cobblemon enhancement, progression, exploration, immersion, building, QoL, performance, C.E.R. mechanic, technical dependency). If we can't articulate the purpose, it goes into review.

## 25. **"Cool But Doesn't Belong" Sweep**

A mod can be excellent, popular, polished, and fun and still not belong in this pack. The question: does this reinforce C.E.R.'s identity? Prevents feature creep.

## 26. **"Can We Actually Use This?" Sweep**

For a mod whose concept is perfect but implementation questionable: can we configure/script/integrate it, does its API expose what we need, does its version support us, can it coexist with our other systems?

## 27. **M.M.I. Confidence Sweep**

Every MMI entry gets a confidence state — CONFIRMED / LIKELY / POTENTIAL / UNVERIFIED / REJECTED — so "Claude mentioned this once" is never mistaken for "confirmed for the pack."

## 28. **Candidate → Confirmed Promotion Sweep**

The path a candidate takes to become CONFIRMED: Research → Compatibility verified → Functionality verified → Integration verified → Pack fit verified → CONFIRMED.

## 29. **Feature-to-Mod Coverage Sweep**

Starts from the design rather than the mod list: for every desired C.E.R. feature, which mod provides it? If none, can KubeJS? If no, datapacks? If no, is custom development required? The reverse of the MMI sweep.

## 30. **Integration Opportunity Sweep**

Instead of "should we add another mod," asks "can two existing mods be connected to produce something neither provides alone?" Extremely C.E.R., since the project is trying to build systems *between* mods.

## 31. **Replacement-vs-Integration Sweep**

For a new mod: does it replace an existing system, or complement it? If replacing, compare total footprint. If complementing, confirm both are justified.

## 32. **Client QoL Saturation Sweep**

Looks across UI, tooltip, inventory, keybind, map, HUD, navigation, accessibility, and cosmetic mods for duplicate functionality, UI clutter, unnecessary overlays, keybind conflicts, excessive information density.

## 33. **Keybind / Input Sweep**

Especially important given Smart Key Prompts / Keybind Hider / Keybind Atlas exploration — checks duplicate keys, unbound functionality, conflicting keys, category clutter, controller conflicts, QTE inputs, hidden/contextual keybinds, so controls don't become a 300-entry disaster.

## 34. **Performance Sweep**

Multi-level: mod-level (heavy worldgen, entity/particle/rendering/AI-heavy mods, tick-heavy automation, polling scripts), system-level (interactions between them), script-level (event frequency, tick handlers, entity/world scans, scoreboard/NBT ops).

## 35. **Tick / Polling Sweep**

Specialized performance audit: does a recurring script really need to run every tick? Prefer event / scheduled interval / state change over polling. Particularly relevant to Affinity — don't poll thresholds every tick; update state, compare old/new, trigger on crossing.

## 36. **Server Tick Cost Sweep**

Separate from general performance: entity counts, AI, chunk ticking, block entities, machines, automation, scripts, Pokémon, worldgen, structures — a pack can have fine FPS while murdering server TPS.

## 37. **Chunk Loading Sweep**

Checks chunk loaders, machines, farms, Pokémon systems, dimensions, Aero Islands, structures, persistent entities for unintended permanently-loaded areas.

## 38. **Entity Population Sweep**

Especially important for Cobblemon — Pokémon spawn rates, hostile/passive mobs, modded creatures, structure entities, NPCs, decorative entities — whether the combined ecosystem creates pathological entity counts.

## 39. **Memory / RAM Sweep**

Redundant libraries, giant worldgen systems, huge resource packs, entity-heavy mods, excessive caches, client rendering overhead, excessive dimensions, large structures — separate concern from TPS.

## 40. **Startup / Load-Time Sweep**

What makes the pack take forever to start: datapack loading, KubeJS startup scripts, recipe/worldgen registration, resource loading, model/texture count, large registries.

## 41. **Crash / Error Sweep**

Every crash categorized (mod bug, dependency issue, config issue, script error, worldgen conflict, entity issue, rendering issue, memory issue, version mismatch) and checked for whether it indicates a deeper architectural problem, not just "remove the crashing mod."

## 42. **Log Spam Sweep**

Periodic cleanup of WARN/ERROR/repeated-exception/failed-lookup/missing-registry spam from mods that don't crash but destroy the server log.

## 43. **Version Drift Sweep**

Periodically checks Minecraft/NeoForge/Cobblemon/KubeJS/Cobblemon KubeJS Bridge/FTB/major gameplay mod versions against all addon versions — catches "worked three months ago, one dependency changed since."

## 44. **Update Regression Sweep**

After major updates: before → update → compatibility audit → gameplay audit → quest audit → script audit → worldgen audit. A successful launch doesn't mean the pack still works correctly.

## 45. **Config Conflict Sweep**

Two mods independently configuring something that interacts badly — spawn settings, loot, worldgen, mob caps, rendering, difficulty, recipes, inventories, keybinds, dimensions.

## 46. **Datapack Priority / Load Order Sweep**

Once C.E.R. has substantial custom datapack content: namespace collisions, tags, function ordering, recipe/loot/advancement overrides, load order, pack priority.

## 47. **Script Namespace / Architecture Sweep**

For KubeJS specifically — organize systems into a real folder structure (e.g. `CER/affinity/`, `CER/fracture/`, `CER/resonance/`, `CER/titan/`, `CER/quests/`, `CER/world/`, `CER/cobblemon/`, `CER/integration/`) rather than ad hoc script files, and periodically audit for duplicated functions, dead code, abandoned experiments, conflicting listeners, global variables, unnecessary polling, hardcoded values.

## 48. **Hardcoded Value Sweep**

Finds values (thresholds, percentages, durations) hardcoded across multiple scripts and moves shared design constants into centralized configuration, so changing one number doesn't require hunting down every copy.

## 49. **State Ownership Sweep**

The Affinity lesson generalized: for every piece of information, who owns this state (Affinity → C.E.R., quest completion → FTB, species data → Cobblemon, world state → C.E.R./Minecraft)? Avoid two systems independently believing they own the same value.

## 50. **Single Source of Truth Sweep**

Stricter version: is the same information stored in multiple places (e.g. Affinity in KubeJS NBT + scoreboard + FTB quest progress + item NBT)? One is authoritative; everything else is derived/display/integration state.

## 51. **State Synchronization Sweep**

For any intentionally-mirrored data (Persistent Data → Scoreboard → HUD): when does sync occur, what happens after restart/death/dimension change/external data change/late join?

## 52. **Save / Restart Persistence Sweep**

For every custom C.E.R. system: does it survive logout, server restart, world reload, dimension travel, death, chunk unload, backup restoration? Critical for Affinity.

## 53. **Multiplayer / Server Scope Sweep**

Is a mechanic player-specific, team-specific, region-specific, dimension-specific, world-wide, or server-wide? Prevents Player A's action changing Player B's progression, or a "should be global" restoration effect accidentally scoping to one player.

## 54. **FTB Teams Interaction Sweep**

Because C.E.R. uses Teams: individual vs. team progression, shared quest completion, shared rewards, team-owned vs. player-owned systems — especially before tying Affinity into quests.

## 55. **Exploit Sweep**

Intentionally try to break every major system: for Affinity — can I repeatedly release/catch, automate it, reset it, multiply rewards, have multiple players trigger it? For progression — can I get a reward twice, move/duplicate items between players? One of the most important late-stage sweeps.

## 56. **AFK / Automation Abuse Sweep**

What happens if the player leaves the game running for 12 hours — Affinity farming, mob/Pokémon farming, chunk loaders, machines, passive rewards, decay exploits, event generation.

## 57. **Player Behavior Sweep**

Not a technical exploit test — if I were a normal player, what behavior would the mechanics naturally encourage? If the optimal behavior is absurd (stand at one machine for three hours), the design may need revision.

## 58. **Discovery / Prescription Sweep**

Uniquely important to C.E.R.'s Discovery Over Prescription philosophy: does the pack let players discover mechanics, or does the quest book just tell them everything? Audits quest spoilers, hidden mechanics, unexplained systems, environmental/NPC clues, structures, item descriptions, visual feedback, progression revelations.

## 59. **Lore / Mechanics Consistency Sweep**

Every major mechanic should make sense in the C.E.R. fiction — why does Affinity exist, why Fracture, why a Resonance Anchor, why can Fractured Pokémon do unusual things? Gameplay shouldn't feel like unrelated mods stapled together.

## 60. **Thematic Cohesion Sweep**

The ultimate question: does this still feel like C.E.R.? Not "is this mod fun" or "is this popular," but does it contribute to the world being built.

## 61. **"Remove One Mod" Sweep**

For every questionable mod: if we remove this, what actually breaks? "Nothing meaningful" is valuable information — sometimes the best optimization is deletion, not replacement.

## 62. **"What Are We Missing?" Sweep**

The opposite exercise: starting from the intended experience, what important capability currently has no provider? Catches gaps a conventional mod audit misses.

## 63. **Integration Gap Sweep**

After mapping all existing systems: which two systems *should* interact but currently don't (Magic↔Pokémon, Affinity↔Worldgen, Affinity↔Quests, Fracture↔Synchro, Titan↔QTE, Aero Islands↔Affinity)?

## 64. **Custom Mechanics Feasibility Sweep**

Before committing to an ambitious feature: can existing mod/config/datapack/KubeJS/integration/addon do it, or would custom development be justified? Classify: Easy / Moderate / Complex / Stretch / Future / Reject.

## 65. **Proof-of-Concept Sweep**

Before fully implementing a complex system, build the smallest possible prototype (for Affinity: 1 type → 1 player value → 1 world value → 1 event → 1 threshold → 1 scoreboard mirror). If it works, expand. Same philosophy for Fracture, Titan encounters, QTEs, spell integration, Aero Islands interactions.

## 66. **Vertical Slice Sweep**

Once a system passes the prototype stage: build one complete end-to-end example (catch → Affinity calc → World+Player update → threshold → visual feedback → quest recognition → reward) rather than implementing all 18 Affinities before knowing whether one actually works.

## 67. **End-to-End Integration Sweep**

After individual systems work: does the entire chain work (Cobblemon → KubeJS → C.E.R. → Affinity → FTB → Quest → Reward → next progression stage)? Catches integration bugs individual mod testing won't.

## 68. **Player Experience Sweep**

Play the pack as a player, not the developer: what do I know/not know, what feels rewarding/tedious/confusing/pointless/too fast/too slow/magical/like modpack bureaucracy?

## 69. **Fresh-World Sweep**

Start from a completely clean world, no dev commands, no prior knowledge, follow the intended experience — catches missing onboarding, accidental dependencies, broken early progression, hidden requirements, bad quest ordering, worldgen problems, confusing systems.

## 70. **New Player / Blind Playtest Sweep**

Even better than Fresh-World: have someone who doesn't know the architecture try it, without explaining the systems, to see whether they discover them — the strongest test of Discovery Over Prescription.

## 71. **Endgame / Long-Term Loop Sweep**

The opposite-of-fresh perspective: after 20/50/100+ hours, what remains meaningful, what becomes trivial/obsolete/repetitive, does Affinity/Pokémon/exploration/automation still matter, is there a reason to continue?

## 72. **Modpack Identity Sweep**

At milestones: if we removed the mod names and showed someone only the gameplay systems, what would C.E.R. actually be? Prevents drifting into "generic kitchen-sink pack + Cobblemon."

## 73. **Final Pre-Release Sweep**

The final monster — runs MMI → Dependencies → Compatibility → Redundancy → Worldgen → Progression → Recipes → Loot → Economy → Performance → Scripts → Quests → Exploits → Multiplayer → Persistence → Fresh world → Player experience, in order, then freezes the build.

---

# The important distinction: these are NOT all the same kind of sweep

Organized into **seven major families**:

**A. Inventory / Mod Audits** — 1 MMI Sweep, 2 Deduplication Sweep, 3 Dependency Sweep, 43 Version Drift Sweep, 24 Mod Purpose Sweep, 27 MMI Confidence Sweep

**B. Functionality Audits** — 4 Redundancy Sweep, 5 Functionality Overlap Sweep, 6 Feature Saturation Sweep, 24 Mod Purpose Sweep, 29 Feature-to-Mod Coverage Sweep, 31 Replacement-vs-Integration Sweep

**C. Architecture Audits** — 7 Implementation Layer Sweep, 8 KubeJS/Datapack/Mod Sweep, 9 Configuration-First Sweep, 49 State Ownership Sweep, 50 Single Source of Truth Sweep, 51 State Synchronization Sweep, 47 Script Architecture Sweep, 48 Hardcoded Value Sweep

**D. Gameplay / Progression Audits** — 15 Progression Sweep, 16 Progression Gate Sweep, 17 Progression Bypass Sweep, 18 Recipe/Acquisition Sweep, 21 Loot Sweep, 22 Quest Sweep, 23 Quest Economy Sweep, 19 Economy Sweep, 20 Automation/Infinite Resource Sweep, 57 Player Behavior Sweep

**E. Technical / Performance Audits** — 10 Compatibility Sweep, 11 Cobblemon Compatibility Sweep, 13 Worldgen Conflict Sweep, 14 Worldgen Density Sweep, 34 Performance Sweep, 35 Tick/Polling Sweep, 36 Server TPS Sweep, 37 Chunk Loading Sweep, 38 Entity Population Sweep, 39 Memory Sweep, 40 Startup Sweep, 41 Crash/Error Sweep, 42 Log Spam Sweep, 44 Config Conflict Sweep... wait 45, 46 Datapack Priority Sweep

**F. Exploitation / Reliability Audits** — 55 Exploit Sweep, 56 AFK/Automation Abuse Sweep, 53 Multiplayer Scope Sweep, 54 FTB Teams Interaction Sweep, 52 Save/Restart Persistence Sweep, 44 Update Regression Sweep

**G. C.E.R. Design / Experience Audits** — 30 Integration Opportunity Sweep, 63 Integration Gap Sweep, 64 Custom Mechanics Feasibility Sweep, 65 Proof-of-Concept Sweep, 66 Vertical Slice Sweep, 67 End-to-End Integration Sweep, 58 Discovery vs Prescription Sweep, 59 Lore/Mechanics Consistency Sweep, 60 Thematic Cohesion Sweep, 61 "Cool But Doesn't Belong" Sweep, 26 "Can We Actually Use This?" Sweep, 61 "Remove One Mod" Sweep, 62 "What Are We Missing?" Sweep, 68 Player Experience Sweep, 69 Fresh World Sweep, 70 Blind Playtest Sweep, 71 Endgame Sweep, 72 Modpack Identity Sweep, 73 Final Pre-Release Sweep

---

# A few **meta-processes** to explicitly add to the methodology

**The Reverse Audit** — instead of "what does this mod give us," ask "what does our design require, and where does each requirement come from?"

**The Interaction Audit** — not "does Mod A work" but "does Mod A + Mod B + C.E.R. work?" Conventional compatibility testing isn't sufficient once systems are this cross-dependent.

**The Ownership Audit** — for every important variable, who owns this? (The lesson Affinity's design surfaced, generalized to everything.)

**The Integration Value Audit** — a mod shouldn't only be judged by standalone feature count; ask how many useful C.E.R. interactions it unlocks. A small mod plugging into five systems can beat a giant standalone content mod.

**The Complexity Budget Audit** — every new system costs development complexity, configuration complexity, player learning, UI complexity, performance, troubleshooting, compatibility surface, and maintenance. Adding something spends from a finite complexity budget — a different question from "is this feature cool?"

**The Maintenance Debt Sweep** — at milestones: what have we created that future-us is going to hate maintaining (scattered constants, manually-duplicated data, overlapping mods, fragile scripts, undocumented commands, unnecessary patches, exact-version-dependent systems)? Keeps C.E.R. from becoming unmaintainable.

---

# The actual C.E.R. development loop

```
DESIGN
↓
WHAT DO WE WANT?
↓
REVERSE AUDIT
↓
WHAT PROVIDES IT?
↓
MMI / MOD AUDIT
↓
REDUNDANCY / OVERLAP
↓
COMPATIBILITY AUDIT
↓
IMPLEMENTATION AUDIT
↓
CONFIG / DATAPACK / KUBEJS / MOD
↓
POC / PROTOTYPE
↓
VERTICAL SLICE
↓
INTEGRATION TEST
↓
PROGRESSION / ECONOMY
↓
EXPLOIT / ABUSE
↓
PERFORMANCE / TPS
↓
MULTIPLAYER / SAVE
↓
PLAYER EXPERIENCE
↓
FRESH WORLD TEST
↓
IDENTITY / COHESION
↓
SHIP
```

And after major additions, don't rerun every possible audit from scratch — run a **targeted regression sweep** against everything the new feature could have touched. Example: adding Affinity triggers Architecture, State Ownership, Cobblemon integration, FTB integration, Quest progression, Economy, Exploit, Performance, Persistence, Multiplayer, Discovery, and UI checks — not a blind retest of every building mod in the pack.

This gives a repeatable C.E.R. engineering process for deciding what enters the pack, how it's implemented, how it integrates, and whether it stays healthy as the pack grows.
