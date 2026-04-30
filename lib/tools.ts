import { tool } from "ai";
import { z } from "zod";
import { skills, getSkillByName } from "./system-prompt";
import { findRelevantChunks } from "./rag";

// Dice rolling utility
function rollDice(notation: string): { rolls: number[]; total: number; notation: string } {
  const match = notation.match(/^(\d+)d(\d+)(?:\+(\d+))?(?:\-(\d+))?$/i);
  if (!match) {
    return { rolls: [], total: 0, notation: "Invalid dice notation" };
  }

  const numDice = parseInt(match[1]);
  const diceSize = parseInt(match[2]);
  const bonus = parseInt(match[3] || "0");
  const penalty = parseInt(match[4] || "0");

  const rolls: number[] = [];
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * diceSize) + 1);
  }

  const total = rolls.reduce((a, b) => a + b, 0) + bonus - penalty;
  return { rolls, total, notation };
}

// TODO: implement real API calls using createApiClient

export function createTools(_token: string) {
  return {
    getSkillDetails: tool({
      description:
        "Load the full instructions for a skill by its name. Call this before responding whenever a skill is relevant to the user's request.",
      inputSchema: z.object({
        name: z
          .string()
          .describe(
            `The name of the skill to load. Available names: ${skills.map((s) => s.name).join(", ")}`
          ),
      }),
      execute: async ({ name }) => {
        const skill = getSkillByName(name);
        if (!skill) return { error: `Skill "${name}" not found.` };
        return { name: skill.name, instructions: skill.body };
      },
    }),

    rollDice: tool({
      description:
        "Roll dice for D&D actions. Examples: 1d20, 2d6+3, 1d20+5, 4d6-1. Use this for attack rolls, ability checks, saving throws, and damage.",
      inputSchema: z.object({
        dice: z
          .string()
          .describe("Dice notation like '1d20+5' or '2d6' or '4d6+2'"),
        reason: z
          .string()
          .describe("Why are we rolling? (e.g., 'attack roll', 'damage', 'perception check')"),
      }),
      execute: async ({ dice, reason }) => {
        const result = rollDice(dice);
        if (result.rolls.length === 0) {
          return { error: `Invalid dice notation: ${dice}` };
        }
        return {
          rolls: result.rolls,
          total: result.total,
          reason,
          notation: dice,
        };
      },
    }),

    searchRulebook: tool({
      description:
        "Search through D&D rulebooks and campaign documents to find relevant rules, monster stats, spells, or lore. Use this whenever you need to reference D&D 5e rules or campaign information.",
      inputSchema: z.object({
        query: z
          .string()
          .describe("What rule, monster, spell, or lore information are you searching for?"),
      }),
      execute: async ({ query }) => {
        const results = await findRelevantChunks(query);
        if (results.length === 0) {
          return {
            found: false,
            message: `No relevant information found for: "${query}"`,
          };
        }
        return {
          found: true,
          results: results.map((r) => ({
            source: r.fileName,
            content: r.content,
            relevance: r.similarity,
          })),
        };
      },
    }),

    updateCharacterState: tool({
      description:
        "Update the player character's state: HP, inventory, conditions, quest progress, relationships, or notes. Use this to track changes to the character's status.",
      inputSchema: z.object({
        field: z
          .enum(["hp", "inventory", "conditions", "quests", "relationships", "notes"])
          .describe("What field to update"),
        change: z
          .string()
          .describe("Description of the change (e.g., 'take 5 damage', 'add iron sword', 'gained favor with merchant')"),
      }),
      execute: async ({ field, change }) => {
        // In a real system, this would update a database
        return {
          success: true,
          field,
          change,
          message: `Character state updated: ${change}`,
        };
      },
    }),

    updateWorldState: tool({
      description:
        "Record significant changes to the game world. Use this when NPCs die, locations are destroyed, factions change, or major events occur.",
      inputSchema: z.object({
        event: z
          .string()
          .describe("Description of the world event (e.g., 'goblin lair destroyed', 'merchant betrayed the party', 'forest is burning')"),
      }),
      execute: async ({ event }) => {
        // In a real system, this would update a database
        return {
          success: true,
          event,
          message: `World updated: ${event}`,
        };
      },
    }),

    getItems: tool({
      description: "Fetches a list of items from the API.",
      inputSchema: z.object({}),
      execute: async () => ({ items: [] }),
    }),

    getItemById: tool({
      description: "Fetches a single item by its ID from the API.",
      inputSchema: z.object({
        id: z.string().describe("The unique identifier of the item to fetch."),
      }),
      execute: async ({ id: _id }) => ({ item: null }),
    }),

    submitAction: tool({
      description: "Submits an action or data payload to the API.",
      inputSchema: z.object({
        action: z.string().describe("The action to submit."),
        data: z.record(z.unknown()).optional().describe("Optional payload data."),
      }),
      execute: async () => ({ success: true }),
    }),

    searchDocuments: tool({
      description:
        "Search through uploaded documents to find relevant information. " +
        "Use this whenever the user asks about something that might be in their files.",
      inputSchema: z.object({
        query: z
          .string()
          .describe("The question or topic to search for in the documents."),
      }),
      execute: async ({ query }) => {
        const results = await findRelevantChunks(query);

        if (results.length === 0) {
          return {
            found: false,
            message: "No relevant documents found for that query.",
          };
        }

        return {
          found: true,
          results: results.map((r) => ({
            fileName: r.fileName,
            content: r.content,
            similarity: r.similarity,
          })),
        };
      },
    }),
  };
}