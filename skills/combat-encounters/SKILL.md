---
name: Combat & Encounter Management
description: Framework for designing, running, and resolving combat encounters with proper mechanics and pacing.
---

# Combat & Encounter Management

## Combat Structure

### Round by Round
Each combat round = 6 seconds of in-game time

1. **Announce Combatants** - List all creatures in initiative order
2. **Resolve Actions** - Each creature takes their turn in order
3. **Track Changes** - Update HP, conditions, positions
4. **Check for End** - Combat ends when one side surrenders/flees/dies

### Initiative & Starting Combat

When combat begins:
1. Roll 1d20 + DEX modifier for all creatures
2. Arrange from highest to lowest
3. Announce the order
4. Ask the player what they do

### Ending Combat

Combat ends when:
* All enemies are defeated
* Player and allies are defeated
* Enemies flee or are convinced to stop
* A truce is negotiated
* Environmental factors force an end

---

## Designing Encounters

### Difficulty Rating (CR)

* **Easy**: Players feel challenged but confident
* **Medium**: Real danger, but fair odds
* **Hard**: Significant threat, careful tactics required
* **Deadly**: Potential character death

### Balanced Encounters

* **Solo Monsters**: Use Higher CR creatures
* **Multiple Enemies**: Use multiple weaker creatures
* **Action Economy**: Balance player actions vs enemy actions
* **Escape Routes**: Always give player options

### Encounter Types

* **Ambush**: Enemies surprise party (advantage for enemies)
* **Prepared**: Both sides aware and ready
* **Disadvantage**: Party unprepared or outnumbered
* **Boss Fight**: Single powerful enemy with mechanics

---

## Enemy Design

### Quick Enemy Stats
When improvising, use:
* **AC**: 10-18 depending on armor
* **HP**: 5-30 for minions, 30-100+ for bosses
* **Attack**: 1d20 + (2-8) modifier
* **Damage**: Varies by weapon/ability
* **Special Abilities**: 1-3 unique traits

### Enemy Tactics

* **Weak enemies**: Swarm tactics, retreat when hurt
* **Smart enemies**: Use cover, focus fire, exploit weaknesses
* **Boss monsters**: Multi-phase fights, special mechanics
* **Magical enemies**: Spell casting, area effects, resistances

---

## Damage & Healing

### Damage Tracking

* Roll damage die + modifiers
* Subtract from creature's HP
* Announce remaining HP (or descriptively)
* Track conditions (bleeding, on fire, etc)

### When HP Reaches 0

* Creature drops unconscious
* Begin death saves (player creatures)
* Monsters typically die immediately
* Allies can be revived with healing magic or potions

### Healing

* Healing spells: Restore HP as stated
* Potions: Consume action to drink
* Rest: Long rest restores all HP
* Short rest: Recover some hit dice worth of HP

---

## Describing Combat

### Make it Vivid

Instead of: "You hit. Roll damage."

Say: "Your sword arcs toward the goblin. Steel meets flesh with a sickening crunch. It staggers back, blood streaming from the wound. Roll damage."

### Combat Flow Example

```
PLAYER: "I want to cast fireball at the goblin group."

YOU: "Excellent. The goblins scatter as you weave your spell. 
Roll a Dexterity saving throw at DC 15, or take 8d6 damage.

[Assuming they fail]: The flames engulf them in a roaring explosion. 
Roll 8d6 damage."

PLAYER: "I got 32 damage."

YOU: "The three goblins are reduced to ash. Their screams echo off 
the dungeon walls. In the silence after, you hear crossbows loading 
from deeper in the cave."
```

---

## Conditions in Combat

### Applying Conditions
* Poison: "You feel dizzy, disadvantage on attacks"
* Grapple: "You're held fast, can't move"
* Fear: "The aura of power overwhelms you, fear creeping in"
* Paralysis: "Your body goes rigid, you can't move"

### Removing Conditions
* Duration expires: "The spell fades"
* Action removes it: Shaking off fear, breaking grapple
* Healing/magic: Cure poison, dispel effect

---

## Multi-Round Combat

### Tracking Resources
* **Spell Slots**: Spellcasters use these per day
* **Hit Points**: Everyone tracks this
* **Ammunition**: If tracking (optional)
* **Action Surge**: Class features that recharge
* **Conditions**: Maintain list of active effects

### Mid-Combat Updates

Every few rounds, check:
* Are reinforcements arriving?
* Does environment change (cave collapse, fire spreads)?
* Are any creatures fleeing?
* Is one side clearly winning?

### Ending Combat Gracefully

When victory is certain:
* Offer surrender option
* Ask if enemies flee
* Don't force a full grind to 0 HP
* Describe final defeat vividly

---

## Environmental Combat

### Using Terrain

* **High Ground**: Attacker advantage on ranged, disadvantage vs melee
* **Cover**: Half cover (+2 AC), 3/4 cover (+5 AC)
* **Difficult Terrain**: Movement costs double
* **Water**: Depending on depth, affects movement/attacks
* **Darkness**: Disadvantage on ranged attacks

### Environmental Hazards

* **Fire**: Takes damage each turn
* **Ice**: Might fall, harder to move
* **Collapse**: Falling debris
* **Poison Gas**: Damage + conditions
* **Magical Auras**: Various effects

---

## Critical Hits & Fumbles

### Natural 20 (Critical Hit)
* Roll damage die twice
* Add modifiers once
* Huge damage spike
* Describe dramatically

### Natural 1 (Critical Failure)
* Attack automatically misses
* Fumble (weapon drop, trip, etc) - optional for drama
* Treat as dramatic failure, not punishment

---

## Handling Difficult Moments

### Player Goes Unconscious
* Begin death saves
* Combat continues
* Allies can heal or protect
* Death happens after 3 failed saves

### Party Overwhelmed
* Offer escape/surrender
* Environmental escape (tunnel collapse)
* Powerful NPC arrives
* Don't force a TPK unless meaningfully earned

### Combat Stalls

* Speed things up
* Combine minor enemy turns
* Offer new tactical options
* Describe changing positions/tactics
* Move toward resolution
