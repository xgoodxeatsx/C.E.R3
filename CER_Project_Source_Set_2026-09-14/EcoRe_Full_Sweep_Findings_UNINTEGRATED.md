# Full Sweep — Findings for Review (NOT yet integrated)

Per your request, this is a fresh full-sweep pass looking specifically for material not yet in any of the 10 Master Archive parts, Authorities, Interaction, or Supplemental. **Nothing here has been added to the archives** — this is purely for you to review first. Coverage note: this pass went through the largest previously-unswept blocks of pt1–pt3 (several thousand lines each) rather than every remaining byte of the ~105,000-line transcripts; it's substantial, not literally exhaustive. If you want a second pass after this one, that's easy to do.

Organized by finding, roughly in order of significance.

---

## 1. The Skill Tree System (major find)

A full specialization system tied to the Cobblemon Skill Tree mod, deliberately separated from Affinity: *"Affinity determines what you resonate with. Skill determines how you have learned to work with it."* This significantly extends Part 10's "Player Paths of Resonance" with real mechanical depth.

**Eight branches, each redesigned around professions rather than generic stat bonuses:**
- **Researcher** — Field Observation, Ecological Survey, Anomaly Detection, Resonance Analysis, eventually "Unknown Lifeform" (Fakemon recognition)
- **Ranger** — Trailcraft → Habitat Knowledge → Field Survey → Conservation → Sanctuary Keeper
- **Battler** — deliberately *not* flat combat bonuses; sub-branches Trainer (obedience), Tactician, Breeder, Specialist (Personal Affinity synergy), Champion
- **Scientist/Geneticist** — Species Study → Inheritance → Genetic Analysis → Mutation Research → Synthesis Theory → Advanced Fusion (ties directly into the Fusion/IV-Fusion split from Part 9)
- **Engineer** — Mechanical Knowledge → Automation → Infrastructure → **Resonance Engineering** (machines interacting with World Affinity) → Restoration Engineer
- **Arcanist** — ties to Ars Nouveau/Nature's Aura; Arcane Apprentice → Spellcraft → Natural Conduit → Aura Manipulation → Resonance Magic → World Shaper
- **Occultist** — deliberately framed as a *dangerous* specialization with real tradeoffs (better spirit interactions and unique access, but increased Anomaly risk) — "you are deliberately studying things the world was trying to forget"

**Governing rules, all explicit:**
- Skill points should be **scarce**, earned through demonstrated mastery (e.g. Researcher mastery from documenting species/photographing behavior/discovering anomalies, not kill count)
- Skills should unlock **verbs** ("You can identify migration patterns") not percentages ("+3% XP")
- **Skill Capacity** mirrors Personal Affinity Capacity: 3 active specialties early → 5 mid → 7 late → 9 endgame; unused skills aren't erased, just inactive
- **Skill × Affinity cross-specialization**: e.g. Fire Specialist + Engineer → "Thermal Resonance" (heat-based Create machinery interacts with Fire Affinity); Water Specialist + Ranger → "Hydrological Restoration"
- Player identity becomes **earned titles** rather than levels — "Field Researcher: You have documented 127 species and uncovered 14 ecological anomalies" instead of "Level 37"

This would give the full character-progression stack as: World Affinity (what the world supports) → Personal Affinity (what resonates with you) → **Skills** (what you've mastered) → Hearts (how much of yourself you've restored) → Virtues (who you've become) → Domain Authority (what's been entrusted to you).

---

## 2. Hostile Mobs & Boss Philosophy

Explicit recommendation: keep vanilla hostile mobs, add a **small number of highly curated bosses**, skip a large boss-mod catalog. Ender's Cataclysm specifically discussed and leaned against — not because the bosses are bad, but because a boss with no answer to "what does this mean in our world?" dilutes the pack's identity.

**Region-based danger tiers** (new, not previously captured): Restored Hearthhome (mostly safe) → Abandoned settlement (normal hostiles) → Corrupted region (harder mobs + Shadow phenomena) → Ancient ruin (unusual enemies + Anomaly mechanics) → Legendary domain (completely different rules).

Bosses, when included, should belong to an existing system rather than being generic — e.g. an Occultism boss tied to an escaped ritual (defeating it could restore an area, unlock research, and reveal ancient-civilization lore), or a Shadow boss framed as "an ecosystem has become fundamentally wrong" requiring investigation rather than just a fight.

---

## 3. Paradox Pokémon — Full Philosophy

A dedicated encounter philosophy, explicitly its own category distinct from Fusion/Shadow/Ultra Beasts/Legendaries: **temporal intrusion**, not another generation unlock.

- **Past Paradox** = "Primal/Ancient/Temporal Regression" — biological, wild, prehistoric, tied to the Life pillar
- **Future Paradox** = "Synthetic/Futuristic/Temporal Progression" — artificial, technological, energy-based, tied to the Industry/Tech pillar
- Explicitly **not gated behind generation unlocks** (would spoil the mystery) — instead: Generation → Temporal Eligibility → Anomaly → Investigation → Encounter
- Environmental clue sets differ by direction: Past = strange weather, fossils appearing, ancient footprints, plants growing too fast; Future = machinery malfunctioning, power drains, electromagnetic disturbances, metallic footprints

---

## 4. Ditto Synthesis

A special-cased Fusion outcome: Ditto + Ditto → "Anomalous Synthesis" rather than a normal compatibility-checked Fusion, since Ditto's whole biology is transformation. Result is a **controlled random Pokémon**, weighted by current World Affinity (high Grass → more Grass results; high Corruption → possible Shadow result; active temporal/dimensional anomaly → possible Paradox/Ultra Beast result). Explicitly **excludes Legendaries/Mythicals** — those stay gated behind the Recognition system regardless of Ditto Synthesis odds.

---

## 5. Crafting Removal — Concrete Production Philosophy (significant)

This looks like it may be the actual origin point of C.O.C., not just a restatement of it. Explicit goal, in your own words: remove **hand assembly via the 3×3 grid** as the default production method — not remove crafting/creation itself.

- Hard rule proposed: the 3×3 grid becomes an early-game emergency tool at most, largely replaced for real progression recipes
- Player still gathers/processes/smelts/mills/presses/infuses/enchants/brews/transmutes/ritualizes/engineers/synthesizes/automates — just not "combine 6 things in a grid, get a machine"
- **Create becomes the backbone of physical manufacturing** (raw material → processing → components → assembly via Mechanical Crafters/Deployers/Presses/Sequenced Assembly → finished product)
- **New mod candidates surfaced here, not in any mod list yet: AE2 (Applied Energistics 2) or Refined Storage**, specifically for bulk auto-crafting once a recipe is known — explicitly requested by you as an alternative to hand-crafting at scale
- Ars Nouveau's enchanting apparatus and Occultism's rituals are also named as legitimate "creation" methods alongside Create

---

## 6. Confirms the Origin Story + Possible Alternate Ecological-Stage Names

Directly found the moment you referenced earlier in this conversation — a message where a large chunk of prior discussion appeared to have vanished, and ChatGPT confirmed it couldn't recover a perfect transcript, only retained/summarized context. This is good independent confirmation of the story behind why this whole reconstruction project exists.

In the recap that followed, one possibly-new detail: an ecological-stage naming set — **Dormant → Recovering → Stable → Flourishing → Resonant** — mentioned as an established concept. This may be an alternate/earlier name for the World Affinity tier table already in Part 1 (Forgotten/Stirring/Returning/Established/Thriving/Dominant/Restored), or a genuinely separate framing. Not resolved by this pass — flagging rather than merging.

---

## 7. Concrete Mod-Specific Technical Findings

- **Cobblemon Whiteout** requires **Kotlin for Forge** as a dependency (this was likely the missing piece in a past failed install) — confirmed compatible versions exist for Minecraft 1.21.1/NeoForge/Cobblemon 1.8.0. Whiteout triggers player death on full-team faint/battle loss/fleeing, with each condition configurable — explicitly categorized as **Nuzlocke infrastructure** (toggleable), not a mandatory pack rule.
- Occupied Poké Balls mod discussion confirms a Fabric-only original version with a NeoForge port question — matches what's already in Part 8, no new contradiction, but worth confirming which exact port ended up targeted.

---

## Still not covered in this pass

Given the scope, several large blocks remain genuinely unswept: the back half of pt1 (roughly lines 30,000–48,000, covering starting-world details, the "5 worlds" numeric discussion, modular ball/magic-machine integration discussion, and more), and most of pt2 past the materials/F.R.M./retirement content already captured, and pt3 beyond the sections already mined for Authorities/Part 6/Part 8. If you want, I can keep going through those next — just say so once you've reviewed what's here.
