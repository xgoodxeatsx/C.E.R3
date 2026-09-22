// =============================================================================
// C.E.R. — Affinity Core (KubeJS baseline prototype)
// =============================================================================
// Install: drop into  kubejs/server_scripts/cer_affinity_core.js
// Requires: KubeJS (server scripts), a NeoForge instance with player
//           persistent-data capability (vanilla behavior, no extra mod needed).
// Status:   PROOF OF CONCEPT — proves the Affinity/Resonance loop works, not
//           a finished implementation. Deliberately minimal so it's easy to
//           read, test, and then replace piece by piece with the real
//           Affinity Core described in claude/affinity-architecture.md.
//
// Compatibility note: written in plain ES5 (var, function expressions, string
// concatenation) instead of const/let/arrow-functions/template-literals.
// This KubeJS build's Rhino engine has inconsistent support for those ES6
// features — const/let caused false "redeclaration" errors on repeated calls,
// and arrow functions failed to coerce into the Java functional interfaces
// Minecraft's command API expects (surfacing as a literal
// "ArrowFunction (0) => {...}" value instead of running). ES5 syntax avoids
// both problems entirely.
//
// Design lineage: this reimplements (not ports) the concept demonstrated by
// three CreativeMode.net-generated Fabric prototypes ("Worldbound/Worldheart
// Resonance") that were analyzed for this pack. Those jars are Fabric-only
// (MC 1.20.1 / 1.21.5), ARR-licensed, and bundle third-party telemetry — none
// of that code or the compiled jars are used here. Only the underlying
// mechanic (18-type affinity vectors for player + world + local "area",
// resonance as an alignment-driven derived stat, area-chunked overrides,
// a /affinity-style command tree) was carried over and rebuilt from scratch
// in KubeJS against this pack's own `cer:` namespace.
//
// World/Area model (reworked): areas now hold an independent affinity value
// per type and drift toward their neighbors' average over time (a scoreboard-
// friendly stand-in for Nature's Aura's per-chunk aura / Astral Sorcery's
// flowing starlight), instead of being a static number layered on top of a
// single world value. World affinity is now just the ambient baseline a
// newly-discovered area starts from. NOT YET IMPLEMENTED (future work, once
// this baseline is proven): ecological generation/drain sources feeding
// areas automatically (Botania-style — a wild Pokémon's presence, a biome
// match, player-built tech draining the local field) and machines that read/
// consume area affinity directly (Astral Sorcery's starlight collectors are
// the model — likely Java-mod territory once the real NeoForge mod exists).
// =============================================================================

// ---- Config (mirrors the shape of the reference config, tune freely) ------
var CER_AFFINITY = {
  types: [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ],
  affinityMax: 100,
  resonanceMax: 100,
  alignmentThreshold: 55,       // % alignment needed for resonance to rise instead of decay
  resonanceGainPerMinute: 1.5,
  resonanceDecayPerMinute: 0.25,
  affinityDecayPerMinute: 0,    // 0 = disabled by default, matches the reference default
  areaSize: 64,                 // area grid size in blocks = 4x4 chunks (not a single 16x16 chunk)
  diffusionRate: 0.05,          // fraction an area drifts toward its neighbors' average, per diffusion tick
  diffusionIntervalTicks: 100   // how often diffusion runs (100 ticks = 5 seconds)
}

// ---- Storage ----------------------------------------------------------------
// Player affinity + resonance + surge: NBT on player persistent data (survives
// death/respawn — this is the standard Forge/NeoForge "PersistentData" capability,
// exposed to KubeJS as player.persistentData).
// World + area affinity/resonance: scoreboard objectives (a simple, inspectable,
// restart-safe mirror — matches the "scoreboard mirror" idea already in
// claude/affinity-architecture.md). One fake-player entry per world, one per area id.

var NBT_ROOT = 'cer_affinity'
var WORLD_FAKE_PLAYER = '#cer_world'

function ensurePlayerRoot(player) {
  var data = player.persistentData
  if (!data.contains(NBT_ROOT)) {
    var root = {}
    for (var i = 0; i < CER_AFFINITY.types.length; i++) {
      root[CER_AFFINITY.types[i]] = 0.0
    }
    root.resonance = 0.0
    root.surge = 0.0
    var wrapper = {}
    wrapper[NBT_ROOT] = root
    data.merge(wrapper)
  }
  return data.getCompound(NBT_ROOT)
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function getPlayerAffinity(player, type) {
  var root = ensurePlayerRoot(player)
  return root.contains(type) ? root.getDouble(type) : 0.0
}

function setPlayerAffinity(player, type, value, source) {
  var root = ensurePlayerRoot(player)
  var old = root.contains(type) ? root.getDouble(type) : 0.0
  var next = clamp(value, 0, CER_AFFINITY.affinityMax)
  root.putDouble(type, next)
  if (old !== next) {
    CerAffinityEvents.firePlayerAffinityChanged(player, type, old, next, source || 'unknown')
  }
  return next
}

function addPlayerAffinity(player, type, amount, source) {
  return setPlayerAffinity(player, type, getPlayerAffinity(player, type) + amount, source)
}

function getPlayerResonance(player) {
  var root = ensurePlayerRoot(player)
  return root.contains('resonance') ? root.getDouble('resonance') : 0.0
}

function setPlayerResonance(player, value, source) {
  var root = ensurePlayerRoot(player)
  var old = root.contains('resonance') ? root.getDouble('resonance') : 0.0
  var next = clamp(value, 0, CER_AFFINITY.resonanceMax)
  root.putDouble('resonance', next)
  if (old !== next) {
    CerAffinityEvents.firePlayerResonanceChanged(player, old, next, source || 'unknown')
  }
  return next
}

function addPlayerSurge(player, amount) {
  var root = ensurePlayerRoot(player)
  var old = root.contains('surge') ? root.getDouble('surge') : 0.0
  root.putDouble('surge', Math.max(0, old + amount))
}

function getPlayerSurge(player) {
  var root = ensurePlayerRoot(player)
  return root.contains('surge') ? root.getDouble('surge') : 0.0
}

function setPlayerSurge(player, value) {
  var root = ensurePlayerRoot(player)
  root.putDouble('surge', Math.max(0, value))
}

// -- Scoreboard-backed world/area storage --------------------------------

function objectiveName(type) {
  return 'cer_wa_' + type // e.g. cer_wa_fire  (world/area affinity, per type)
}

function ensureObjective(server, name) {
  var scoreboard = server.scoreboard
  var objective = scoreboard.getObjective(name)
  if (objective === null) {
    var ObjectiveCriteria = Java.loadClass('net.minecraft.world.scores.criteria.ObjectiveCriteria')
    var RenderType = Java.loadClass('net.minecraft.world.scores.criteria.ObjectiveCriteria$RenderType')
    objective = scoreboard.addObjective(name, ObjectiveCriteria.DUMMY, Text.of(name), RenderType.INTEGER, false, null)
  }
  return objective
}

function scoreHolderFor(name) {
  var ScoreHolder = Java.loadClass('net.minecraft.world.scores.ScoreHolder')
  return ScoreHolder.forNameOnly(name)
}

function hasScore(server, holderName, type) {
  var objective = ensureObjective(server, objectiveName(type))
  var holder = scoreHolderFor(holderName)
  return server.scoreboard.getPlayerScoreInfo(holder, objective) !== null
}

function getScore(server, holderName, type) {
  var objective = ensureObjective(server, objectiveName(type))
  var holder = scoreHolderFor(holderName)
  var info = server.scoreboard.getPlayerScoreInfo(holder, objective)
  return info !== null ? info.value() : 0
}

function setScore(server, holderName, type, value) {
  var objective = ensureObjective(server, objectiveName(type))
  var holder = scoreHolderFor(holderName)
  var access = server.scoreboard.getOrCreatePlayerScore(holder, objective)
  access.set(Math.round(value))
}

function getWorldAffinity(server, type) {
  return getScore(server, WORLD_FAKE_PLAYER, type)
}

function setWorldAffinity(server, type, value, source) {
  var old = getWorldAffinity(server, type)
  var next = clamp(value, 0, CER_AFFINITY.affinityMax)
  setScore(server, WORLD_FAKE_PLAYER, type, next)
  if (old !== next) {
    CerAffinityEvents.fireWorldAffinityChanged('world', type, old, next, source || 'unknown')
  }
  return next
}

function areaCoords(level, pos) {
  return {
    dim: level.dimension.toString(),
    ax: Math.floor(pos.x / CER_AFFINITY.areaSize),
    az: Math.floor(pos.z / CER_AFFINITY.areaSize)
  }
}

function areaIdFromCoords(dim, ax, az) {
  return dim + '@' + ax + ',' + az
}

function areaId(level, pos) {
  var c = areaCoords(level, pos)
  return areaIdFromCoords(c.dim, c.ax, c.az)
}

function areaHolder(id) {
  // scoreboard fake-player names are capped at 40 chars and can't contain spaces;
  // this is a prototype-safe encoding, not final naming.
  return '#cer_area_' + Java.type('java.lang.Math').abs(id.hashCode())
}

// Areas now hold their own independent affinity value (like Nature's Aura's
// per-chunk aura), instead of "world value + a manual offset". A newly
// discovered area (one that has never had this type read/written before)
// inherits the current world value as its starting point, then drifts on
// its own from there via diffusion + local triggers.
function getAreaAffinityById(server, id, type) {
  var holder = areaHolder(id)
  if (!hasScore(server, holder, type)) {
    var initial = getWorldAffinity(server, type)
    setScore(server, holder, type, initial)
    return initial
  }
  return getScore(server, holder, type)
}

function setAreaAffinityById(server, id, type, value, source) {
  var holder = areaHolder(id)
  var old = hasScore(server, holder, type) ? getScore(server, holder, type) : getWorldAffinity(server, type)
  var next = clamp(value, 0, CER_AFFINITY.affinityMax)
  setScore(server, holder, type, next)
  if (old !== next) {
    CerAffinityEvents.fireWorldAffinityChanged(id, type, old, next, source || 'unknown')
  }
  return next
}

function getAreaAffinity(server, level, pos, type) {
  return getAreaAffinityById(server, areaId(level, pos), type)
}

function setAreaAffinity(server, level, pos, type, value, source) {
  return setAreaAffinityById(server, areaId(level, pos), type, value, source)
}

// -- Diffusion: areas drift toward the average of their 8 neighbors ------
// This is the "flows like a fluid" behavior from Nature's Aura / Astral
// Sorcery's starlight: instead of every area being an island you set by
// hand, values spread outward over time. Only areas a player is currently
// standing in (plus their neighbors) are processed each diffusion tick —
// KubeJS has no easy "every loaded chunk" hook here, so this is the
// prototype-safe stand-in for "actively simulated area."

var NEIGHBOR_OFFSETS = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1]
]

function diffuseArea(server, dim, ax, az) {
  var selfId = areaIdFromCoords(dim, ax, az)
  for (var t = 0; t < CER_AFFINITY.types.length; t++) {
    var type = CER_AFFINITY.types[t]
    var selfValue = getAreaAffinityById(server, selfId, type)

    var neighborSum = 0
    for (var n = 0; n < NEIGHBOR_OFFSETS.length; n++) {
      var neighborId = areaIdFromCoords(dim, ax + NEIGHBOR_OFFSETS[n][0], az + NEIGHBOR_OFFSETS[n][1])
      neighborSum += getAreaAffinityById(server, neighborId, type)
    }
    var neighborAvg = neighborSum / NEIGHBOR_OFFSETS.length
    var next = selfValue + (neighborAvg - selfValue) * CER_AFFINITY.diffusionRate

    // scoreboard scores are integers; skip writes too small to register so we
    // don't spam the scoreboard with no-op updates every diffusion tick.
    if (Math.abs(next - selfValue) >= 0.5) {
      setAreaAffinityById(server, selfId, type, next, 'diffusion')
    }
  }
}

function getWorldResonance(server) {
  return getScore(server, WORLD_FAKE_PLAYER, 'resonance')
}

function setWorldResonance(server, value) {
  setScore(server, WORLD_FAKE_PLAYER, 'resonance', clamp(value, 0, CER_AFFINITY.resonanceMax))
}

// ---- Minimal event bus (stub for the real normalized event bus) ------------
// Other scripts can push a listener function into these arrays. This is
// intentionally the simplest possible version of the "normalized event bus"
// described in claude/affinity-architecture.md — enough to prove the pattern,
// not the final pub/sub design.

var CerAffinityEvents = {
  _playerAffinityListeners: [],
  _playerResonanceListeners: [],
  _worldAffinityListeners: [],

  onPlayerAffinityChanged: function(fn) { this._playerAffinityListeners.push(fn) },
  onPlayerResonanceChanged: function(fn) { this._playerResonanceListeners.push(fn) },
  onWorldAffinityChanged: function(fn) { this._worldAffinityListeners.push(fn) },

  firePlayerAffinityChanged: function(player, type, oldValue, newValue, source) {
    for (var i = 0; i < this._playerAffinityListeners.length; i++) {
      this._playerAffinityListeners[i](player, type, oldValue, newValue, source)
    }
  },
  firePlayerResonanceChanged: function(player, oldValue, newValue, source) {
    for (var i = 0; i < this._playerResonanceListeners.length; i++) {
      this._playerResonanceListeners[i](player, oldValue, newValue, source)
    }
  },
  fireWorldAffinityChanged: function(areaOrWorldId, type, oldValue, newValue, source) {
    for (var i = 0; i < this._worldAffinityListeners.length; i++) {
      this._worldAffinityListeners[i](areaOrWorldId, type, oldValue, newValue, source)
    }
  }
}

// Example listener — log every player affinity change to console so you can
// watch the system work in real time while testing. Remove once satisfied.
CerAffinityEvents.onPlayerAffinityChanged(function(player, type, oldValue, newValue, source) {
  console.log('[CER] ' + player.username + ' ' + type + ' affinity ' + oldValue.toFixed(1) + ' -> ' + newValue.toFixed(1) + ' (' + source + ')')
})

// ---- Resonance tick ----------------------------------------------------
// Runs once per second (every 20 ticks). Computes an alignment % between the
// player's affinity profile and their local area's affinity profile, then
// nudges player resonance, area resonance, and world resonance accordingly.
// This is a direct rebuild of the reference implementation's ResonanceTicker.

ServerEvents.tick(function(event) {
  var server = event.server

  // Diffusion runs on its own, slower interval (areas drifting toward their
  // neighbors doesn't need to happen every second). Only areas players are
  // currently standing in get processed — see diffuseArea's comment above.
  if (server.tickCount % CER_AFFINITY.diffusionIntervalTicks === 0) {
    var seenAreas = {}
    var allPlayers = server.players
    for (var dp = 0; dp < allPlayers.length; dp++) {
      var dc = areaCoords(allPlayers[dp].level, allPlayers[dp].blockPosition())
      var key = areaIdFromCoords(dc.dim, dc.ax, dc.az)
      if (!seenAreas[key]) {
        seenAreas[key] = true
        diffuseArea(server, dc.dim, dc.ax, dc.az)
      }
    }
  }

  if (server.tickCount % 20 !== 0) return

  var players = server.players
  for (var p = 0; p < players.length; p++) {
    var player = players[p]
    var level = player.level
    var pos = player.blockPosition()

    var compatibility = 0
    var activeWeight = 0
    for (var i = 0; i < CER_AFFINITY.types.length; i++) {
      var type = CER_AFFINITY.types[i]
      var trainer = getPlayerAffinity(player, type)
      var area = getAreaAffinity(server, level, pos, type)
      var weight = Math.max(trainer, area) / 100
      if (weight <= 0) continue
      compatibility += (1 - Math.abs(trainer - area) / 100) * weight
      activeWeight += weight
    }
    var alignment = activeWeight === 0 ? 0 : (compatibility / activeWeight) * 100

    var delta = alignment >= CER_AFFINITY.alignmentThreshold
      ? CER_AFFINITY.resonanceGainPerMinute / 60
      : -CER_AFFINITY.resonanceDecayPerMinute / 60

    var surge = getPlayerSurge(player)
    if (surge > 0) {
      var surgeUsed = Math.min(surge, 0.5)
      delta += surgeUsed / 60
      setPlayerSurge(player, surge - surgeUsed)
    }

    if (delta !== 0) {
      setPlayerResonance(player, getPlayerResonance(player) + delta, 'alignment')
    }

    // Affinity decay (disabled by default via config, matches reference)
    if (CER_AFFINITY.affinityDecayPerMinute > 0 && server.tickCount % 1200 === 0) {
      var amount = CER_AFFINITY.affinityDecayPerMinute / 1200
      for (var j = 0; j < CER_AFFINITY.types.length; j++) {
        var decayType = CER_AFFINITY.types[j]
        var value = getPlayerAffinity(player, decayType)
        if (value > 0) setPlayerAffinity(player, decayType, Math.max(0, value - amount), 'decay')
      }
    }

    // World resonance nudges with the same alignment signal
    if (alignment >= CER_AFFINITY.alignmentThreshold) {
      setWorldResonance(server, getWorldResonance(server) + 0.005)
    } else if (CER_AFFINITY.resonanceDecayPerMinute > 0) {
      setWorldResonance(server, getWorldResonance(server) - CER_AFFINITY.resonanceDecayPerMinute / 60)
    }
  }
})

// ---- Commands: /cer <subcommand> ... -----------------------------------
// Mirrors the command shape from claude/affinity-architecture.md's `/cer affinity`
// API proposal, and the reference mod's /affinity command tree.
//
// Rewritten to use ServerEvents.basicCommand instead of the raw Brigadier
// commandRegistry API. The Brigadier route (Commands.literal/.argument/
// Arguments.STRING/.executes/.sendSuccess) is real but its exact working
// shape is version-fragile and largely undocumented for this KubeJS build —
// commands built that way registered and tab-completed fine but silently
// failed to execute ("Unknown"). basicCommand is the documented, known-good
// 1.21+ pattern: it hands you the raw text after the command name and you
// parse it yourself in plain JS, which is what this does.
//
// Usage:
//   /cer affinity get <type>
//   /cer affinity set <type> <value>
//   /cer affinity add <type> <value>
//   /cer affinity remove <type> <value>
//   /cer affinity debug
//   /cer resonance get
//   /cer resonance set <value>
//   /cer resonance surge <value>
//   /cer world get <type>
//   /cer world set <type> <value>

function cerReply(player, msg) {
  player.tell(Text.of(msg))
}

function cerParseDouble(player, raw) {
  var value = parseFloat(raw)
  if (isNaN(value)) {
    cerReply(player, 'Expected a number, got: ' + raw)
    return null
  }
  return value
}

function cerHandleAffinity(player, args) {
  var sub = args[0]

  if (sub === 'get' && args[1]) {
    var type = args[1]
    cerReply(player, type + ' affinity: ' + getPlayerAffinity(player, type).toFixed(2))
    return
  }

  if (sub === 'set' && args[1] && args[2]) {
    var type = args[1]
    var value = cerParseDouble(player, args[2])
    if (value === null) return
    setPlayerAffinity(player, type, value, 'command')
    cerReply(player, type + ' affinity is now ' + getPlayerAffinity(player, type).toFixed(2))
    return
  }

  if (sub === 'add' && args[1] && args[2]) {
    var type = args[1]
    var value = cerParseDouble(player, args[2])
    if (value === null) return
    addPlayerAffinity(player, type, value, 'command')
    cerReply(player, type + ' affinity is now ' + getPlayerAffinity(player, type).toFixed(2))
    return
  }

  if (sub === 'remove' && args[1] && args[2]) {
    var type = args[1]
    var value = cerParseDouble(player, args[2])
    if (value === null) return
    addPlayerAffinity(player, type, -Math.abs(value), 'command')
    cerReply(player, type + ' affinity is now ' + getPlayerAffinity(player, type).toFixed(2))
    return
  }

  if (sub === 'debug') {
    var parts = []
    for (var i = 0; i < CER_AFFINITY.types.length; i++) {
      var t = CER_AFFINITY.types[i]
      parts.push(t + '=' + getPlayerAffinity(player, t).toFixed(1))
    }
    var msg = 'Affinity: ' + parts.join(', ') + ' | resonance=' + getPlayerResonance(player).toFixed(1) +
      ' | area=' + areaId(player.level, player.blockPosition())
    cerReply(player, msg)
    return
  }

  cerReply(player, 'Usage: /cer affinity <get|set|add|remove|debug> [type] [value]')
}

function cerHandleResonance(player, args) {
  var sub = args[0]

  if (sub === 'get') {
    cerReply(player, 'Trainer Resonance: ' + getPlayerResonance(player).toFixed(2))
    return
  }

  if (sub === 'set' && args[1]) {
    var value = cerParseDouble(player, args[1])
    if (value === null) return
    setPlayerResonance(player, value, 'command')
    cerReply(player, 'Trainer Resonance: ' + getPlayerResonance(player).toFixed(2))
    return
  }

  if (sub === 'surge' && args[1]) {
    var value = cerParseDouble(player, args[1])
    if (value === null) return
    addPlayerSurge(player, value)
    cerReply(player, 'Temporary trainer Resonance surge added.')
    return
  }

  cerReply(player, 'Usage: /cer resonance <get|set|surge> [value]')
}

function cerHandleWorld(player, args, server) {
  var sub = args[0]

  if (sub === 'get' && args[1]) {
    var type = args[1]
    cerReply(player, 'World ' + type + ' affinity: ' + getWorldAffinity(server, type))
    return
  }

  if (sub === 'set' && args[1] && args[2]) {
    var type = args[1]
    var value = cerParseDouble(player, args[2])
    if (value === null) return
    setWorldAffinity(server, type, value, 'command')
    cerReply(player, 'World ' + type + ' affinity: ' + getWorldAffinity(server, type))
    return
  }

  cerReply(player, 'Usage: /cer world <get|set> <type> [value]')
}

function cerHandleArea(player, args, server) {
  var sub = args[0]
  var level = player.level
  var pos = player.blockPosition()

  if (sub === 'get' && args[1]) {
    var type = args[1]
    cerReply(player, 'Area (' + areaId(level, pos) + ') ' + type + ' affinity: ' + getAreaAffinity(server, level, pos, type))
    return
  }

  if (sub === 'set' && args[1] && args[2]) {
    var type = args[1]
    var value = cerParseDouble(player, args[2])
    if (value === null) return
    setAreaAffinity(server, level, pos, type, value, 'command')
    cerReply(player, 'Area (' + areaId(level, pos) + ') ' + type + ' affinity: ' + getAreaAffinity(server, level, pos, type))
    return
  }

  if (sub === 'debug') {
    var parts = []
    for (var i = 0; i < CER_AFFINITY.types.length; i++) {
      var t = CER_AFFINITY.types[i]
      parts.push(t + '=' + getAreaAffinity(server, level, pos, t))
    }
    cerReply(player, 'Area (' + areaId(level, pos) + '): ' + parts.join(', '))
    return
  }

  cerReply(player, 'Usage: /cer area <get|set|debug> [type] [value]')
}

function cerPrintHelp(player) {
  cerReply(player, '--- CER Affinity Commands ---')
  cerReply(player, '/cer affinity get <type>')
  cerReply(player, '/cer affinity set <type> <value>   (0-100)')
  cerReply(player, '/cer affinity add <type> <value>')
  cerReply(player, '/cer affinity remove <type> <value>')
  cerReply(player, '/cer affinity debug                 (shows everything at once)')
  cerReply(player, '/cer resonance get')
  cerReply(player, '/cer resonance set <value>          (0-100)')
  cerReply(player, '/cer resonance surge <value>')
  cerReply(player, '/cer area get <type>                 (the local 64x64 area you are standing in)')
  cerReply(player, '/cer area set <type> <value>        (0-100)')
  cerReply(player, '/cer area debug                      (shows all 18 types for your current area)')
  cerReply(player, '/cer world get <type>               (the ambient baseline new areas inherit)')
  cerReply(player, '/cer world set <type> <value>       (0-100)')
  cerReply(player, '/cer types                           (list valid type names)')
  cerReply(player, '/cer help                            (this list)')
}

function cerPrintTypes(player) {
  cerReply(player, 'Valid types: ' + CER_AFFINITY.types.join(', '))
}

ServerEvents.basicCommand('cer', function(event) {
  var player = event.player
  if (!player) return

  var raw = event.input ? String(event.input).trim() : ''
  var args = raw.length ? raw.split(/\s+/) : []
  var root = args.shift()

  try {
    if (root === 'affinity') {
      cerHandleAffinity(player, args)
    } else if (root === 'resonance') {
      cerHandleResonance(player, args)
    } else if (root === 'world') {
      cerHandleWorld(player, args, event.server)
    } else if (root === 'area') {
      cerHandleArea(player, args, event.server)
    } else if (root === 'types') {
      cerPrintTypes(player)
    } else if (root === 'help' || !root) {
      cerPrintHelp(player)
    } else {
      cerReply(player, 'Unknown subcommand: ' + root + '. Try /cer help')
    }
  } catch (e) {
    // Any future bug in a handler shows up in chat instead of silently doing
    // nothing (this is exactly how the player.server bug above went unnoticed).
    cerReply(player, '[CER] Command error: ' + e)
    console.log('[CER] Error handling /cer ' + raw + ': ' + e)
  }
})

// ---- OPTIONAL: example Cobblemon hook (commented out, unverified) --------
// The exact event name/shape exposed by the installed Cobblemon KubeJS Bridge
// version is an open verification item (see claude/research-system.md and
// claude/CER_Unanswered_Questions.md item 8-11 territory) — don't assume this
// compiles as-is. Once you confirm the real capture event name in-game
// (check the Bridge's own docs/examples, or log all Cobblemon-namespaced
// events once to find it), wire it up like this:
//
// CobblemonEvents.POKEMON_CAPTURED.listen(function(event) {
//   var player = event.player
//   var primaryType = event.pokemon.species.primaryType.name.toLowerCase()
//   addPlayerAffinity(player, primaryType, 2, 'pokemon_captured')
// })
