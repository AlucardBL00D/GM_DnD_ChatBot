import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const skillsDir = path.join(process.cwd(), "skills");

type Skill = {
  name: string;
  description: string;
  body: string;
  folder: string;
};

// Each skill is a subfolder containing a SKILL.md file (Agent Skills spec)
export const skills: Skill[] = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) => {
    const skillFile = path.join(skillsDir, entry.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) return [];
    const { data, content } = matter.read(skillFile);
    return [{
      name: (data.name as string | undefined) ?? "Untitled",
      description: (data.description as string | undefined) ?? "",
      body: content.trim(),
      folder: entry.name,
    }];
  });

const skillManifest = skills
  .map((s) => `- **${s.name}**: ${s.description}`)
  .join("\n");

export interface CharacterContext {
  campaignName?: string;
  characterName?: string;
  characterClass?: string;
  race?: string;
  level?: number;
  hp?: number;
  maxHp?: number;
  ac?: number;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  traits?: string;
  languages?: string;
  inventory?: string;
  equipment?: string;
}

export function buildSystemPrompt(characterContext?: CharacterContext): string {
  let characterInfo = "";
  
  if (characterContext) {
    const abilityScores = `STR: ${characterContext.strength || 10}, DEX: ${characterContext.dexterity || 10}, CON: ${characterContext.constitution || 10}, INT: ${characterContext.intelligence || 10}, WIS: ${characterContext.wisdom || 10}, CHA: ${characterContext.charisma || 10}`;
    
    const traits = characterContext.traits 
      ? characterContext.traits.split("\n").filter(t => t.trim()).map(t => `  • ${t.trim()}`).join("\n")
      : "  (none)";
    
    const languages = characterContext.languages
      ? characterContext.languages.split("\n").filter(l => l.trim()).map(l => `  • ${l.trim()}`).join("\n")
      : "  (none)";
    
    characterInfo = `
## ⚔️ CURRENT CHARACTER STATE

**CAMPAIGN & CHARACTER INFO**:
- Campaign: ${characterContext.campaignName || "Unknown"}
- Character Name: ${characterContext.characterName || "Unknown"}
- Race: ${characterContext.race || "Unknown"}
- Class: ${characterContext.characterClass || "Unknown"}
- Level: ${characterContext.level || 1}

**COMBAT STATS**:
- Hit Points: ${characterContext.hp || 0}/${characterContext.maxHp || 0}
- Armor Class: ${characterContext.ac || 10}

**ABILITY SCORES**:
- Strength (STR): ${characterContext.strength || 10}
- Dexterity (DEX): ${characterContext.dexterity || 10}
- Constitution (CON): ${characterContext.constitution || 10}
- Intelligence (INT): ${characterContext.intelligence || 10}
- Wisdom (WIS): ${characterContext.wisdom || 10}
- Charisma (CHA): ${characterContext.charisma || 10}

**PERSONALITY & TRAITS**:
${traits}

**LANGUAGES KNOWN**:
${languages}

**EQUIPMENT**:
${characterContext.equipment ? characterContext.equipment.split("\n").filter(item => item.trim()).map(item => `  • ${item.trim()}`).join("\n") : "  (none equipped)"}

**INVENTORY**:
${characterContext.inventory ? characterContext.inventory.split("\n").filter(item => item.trim()).map(item => `  • ${item.trim()}`).join("\n") : "  (empty)"}

**CRITICAL**: When the character takes damage, gains/loses items, levels up, gains traits, learns languages, or changes state in any way, use the updateCharacterState tool to track these changes. This is critical for maintaining consistent game state.
`;
  }

  return `You are a D&D 5e Game Master running an immersive and engaging campaign. You control all NPCs, describe the world vividly, adjudicate rules fairly, roll dice for important actions, and maintain character state throughout the adventure.

**YOUR PRIMARY RESPONSIBILITIES:**
1. Describe scenes with vivid, evocative language that immerses the player in the world
2. Roll dice when actions have uncertain outcomes (use notation like 1d20+5 for attack rolls, saving throws, ability checks)
3. Track character state changes - when player characters take damage, are healed, gain/lose items, or change conditions, ALWAYS use the updateCharacterState tool
4. Interpret D&D 5e rules correctly - search the rulebook if uncertain about mechanics
5. Create memorable NPCs with distinct personalities, accents, and motivations
6. Balance combat difficulty to be challenging but fair - adjust on the fly if needed
7. Reward creative problem-solving and good roleplay
8. If the party uploaded campaign documents (rulebooks, monster manuals, setting guides), search them for accurate lore and mechanics

**CHARACTER STATUS AT GAME START:**
${characterInfo}

**AVAILABLE TOOLS:**
Use these tools as needed during gameplay:
- rollDice: Roll d20s and other dice for skill checks, attacks, saves
- searchRulebook: Look up D&D mechanics, spells, monsters if you're unsure
- searchDocuments: Search uploaded campaign files for custom rules or lore
- updateCharacterState: CRITICAL - track all changes to character HP, inventory, conditions, level ups
- updateWorldState: Track major world events, NPC deaths, location changes, faction shifts
- getSkillDetails: Retrieve detailed instructions for specific skills as needed

## Available Skills
${skillManifest}`;
}

export function getSkillByName(name: string): Skill | undefined {
  return skills.find((s) => s.name.toLowerCase() === name.toLowerCase());
}