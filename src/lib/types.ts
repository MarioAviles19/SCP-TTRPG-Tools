import z from "zod"
export const speedType = ["Action", "Bonus Action", "Free Action", "Reaction"]
export const abilityTypes = ["Feat", "Cast", "Ability"]

export const AbilityData = z.object({
    title : z.string(),
    type : z.enum(abilityTypes),
    classType : z.string(),
    level : z.coerce.number().optional(),
    description : z.string(),
    speed : z.enum(speedType).optional(),
    range : z.string().optional(),
    duration: z.string().optional(),
    cost : z.string().default("None")
})

const keys = AbilityData.keyof()
export type AbilityParams = z.infer<typeof keys>
export type AbilityData = z.infer<typeof AbilityData>
export type AbilityDataShape = typeof AbilityData


export const characterInfo = z.object({
    name : z.string().nonempty(),

})
const AbilityScore = z.number().int().min(1).max(30);

const AbilityScoresSchema = z.object({
  str: AbilityScore,
  dex: AbilityScore,
  con: AbilityScore,
  int: AbilityScore,
  wis: AbilityScore,
  cha: AbilityScore,
});

const ActionSchema = z.object({
  name: z.string(),
  description: z.string(),
  attackBonus: z.coerce.number().optional(),
  damage: z.string().optional(), // e.g. "1d8 + 3"
});

const TraitSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const NPCSchema = z.object({
  // Identity
  name: z.string(),
  type: z.string(),

  // Combat stats
  armorClass: z.coerce.number().int().min(1),
  hitPoints: z.coerce.number().int().min(1),
  hitDice: z.string(),     // "5d8 + 10"
  speed: z.record(z.string(), z.coerce.number()).default({walk : 30}), 
  // e.g. { walk: 30, fly: 60 }

  // Ability scores
  abilities: AbilityScoresSchema,

  // Skills & saves
  savingThrows: z.record(z.string(), z.coerce.number()).optional(),
  skills: z.record(z.string(), z.coerce.number()).optional(),

  // Senses & languages
  senses: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),

  // Challenge
  challengeRating: z.coerce.number(), // CR
  proficiencyBonus: z.coerce.number().int().default(2),

  // Features
  traits: z.array(TraitSchema).optional(),
  actions: z.array(ActionSchema).optional(),
  reactions: z.array(ActionSchema).optional(),
  legendaryActions: z.array(ActionSchema).optional(),

  // Metadata
  source: z.string().optional(),
  notes: z.string().optional(),
});

export type NPCSchema = z.infer<typeof NPCSchema>
export type AbilityScoresSchema = z.infer<typeof AbilityScoresSchema>
