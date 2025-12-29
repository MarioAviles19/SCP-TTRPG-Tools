import z from "zod"
const speedType = z.union([z.literal("Action"), z.literal("Bonus Action"), z.literal("Free Action"), z.literal("Free Action")])

export const AbilityData = z.object({
    title : z.string(),
    classType : z.string(),
    level : z.number(),
    description : z.string(),
    speed : speedType,
    range : z.union([z.number(), z.literal("Melee")]),
    duration: z.number(),
    heatRequirement : z.optional(z.number()),
    heat : z.optional(z.number())
})

export type AbilityData = z.infer<typeof AbilityData>

