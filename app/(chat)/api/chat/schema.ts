import { z } from "zod";

const textPartSchema = z.object({
  type: z.enum(["text"]),
  text: z.string().min(1).max(2000),
});

const filePartSchema = z.object({
  type: z.enum(["file"]),
  mediaType: z.enum(["image/jpeg", "image/png"]),
  name: z.string().min(1).max(100),
  url: z.string().url(),
});

const partSchema = z.union([textPartSchema, filePartSchema]);

const userMessageSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["user"]),
  parts: z.array(partSchema),
});

const toolApprovalMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  parts: z.array(z.record(z.unknown())),
});

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: userMessageSchema.optional(),
  messages: z.array(toolApprovalMessageSchema).optional(),
  selectedChatModel: z.string(),
  selectedVisibilityType: z.enum(["public", "private"]),
  characterContext: z
    .object({
      campaignName: z.string().optional(),
      characterName: z.string().optional(),
      characterClass: z.string().optional(),
      race: z.string().optional(),
      level: z.number().optional(),
      hp: z.number().optional(),
      maxHp: z.number().optional(),
      ac: z.number().optional(),
      strength: z.number().optional(),
      dexterity: z.number().optional(),
      constitution: z.number().optional(),
      intelligence: z.number().optional(),
      wisdom: z.number().optional(),
      charisma: z.number().optional(),
      traits: z.string().optional(),
      languages: z.string().optional(),
      inventory: z.string().optional(),
      equipment: z.string().optional(),
    })
    .optional(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
