import type { Combatant, Encounter } from "$lib/Encounter/Encounter"

export const ctx = Symbol()

export type encounterCtx = {
    getEncounterManager : ()=>Encounter,
    getSelectedCombatant: ()=>{combatant: Combatant | undefined},
    setSelectedCombatant: (combatant : Combatant)=>void
}