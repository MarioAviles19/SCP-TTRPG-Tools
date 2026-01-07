import type { JSONLoader } from "$lib/JSONLoader"
import type { AbilityData, AbilityDataShape, NPCSchema } from "$lib/types"

export const globalKey = Symbol()

export type GlobalContext = {
    abilitiesLoader : JSONLoader<AbilityDataShape>,
    getAbilitiesList : ()=>{
    abilitiesList: (AbilityData & {index : number})[];
    },
    characterLoader : JSONLoader<typeof NPCSchema>,
    getCharacterList : ()=>{characterList : (NPCSchema & {index : number})[]}
}