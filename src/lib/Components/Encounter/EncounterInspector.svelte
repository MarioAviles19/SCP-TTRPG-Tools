<script lang=ts>
    import { getContext } from "svelte";
    import { ctx } from ".";
    import type { encounterCtx } from ".";
    
    const { getSelectedCombatant, getEncounterManager } : encounterCtx = getContext(ctx)
    
    const encounterManager = getEncounterManager()
    let selectedCombatant = getSelectedCombatant()
    let hp = $state("")
    let saves = $state("")
    let notes = $state("")
    let turnText = $state("")
    let turnNumber = $derived(parseInt(turnText) - 1)
    $inspect(turnNumber)
    function onUpdateHitPoints(){
        if(!hp){
            return
        }
        selectedCombatant.combatant?.setCurrentHealth(hp)
        encounterManager.subscriber.notify()
    }
    function onUpdateDeathSaves(){
        if(!saves){
            return
        }
        selectedCombatant.combatant?.setDeathSaves(saves)
        encounterManager.subscriber.notify()
    }
    function onUpdateTurn(){
        selectedCombatant.combatant?.setTurnNumber(turnNumber)
        encounterManager.subscriber.notify()
    }
    function onUpdateNotes(){
        if(!notes || !selectedCombatant.combatant){
            return
        }
        encounterManager.subscriber.notify()

        selectedCombatant.combatant.notes = notes
        selectedCombatant.combatant = selectedCombatant.combatant
    }
    $effect.pre(()=>{
        hp = selectedCombatant.combatant?.currentHealth || ""
        saves = selectedCombatant.combatant?.deathSaves || ""
        notes = selectedCombatant.combatant?.notes || ""
        turnText = (selectedCombatant.combatant?.turnNumber || 0 + 1).toString() || ""
    })
</script>


<div class="border-border border-2 rounded-md p-2 bg-card">
    <h2 class="font-semibold text-lg text-center">Combat</h2>
    <div class="text-center flex items-center justify-center gap-4">
        <div class="text-center">
            <p class="text-sm">Hit Points:</p>
            <input class="input w-[9ch] text-center font-bold" placeholder="HP" type="text" bind:value={hp} onchange={onUpdateHitPoints}>
        </div>
        <div class="text-center">
            <p class="text-sm">Turn Number:</p>
            <input class="input w-[9ch] text-center font-bold" placeholder="Turn" type="text" bind:value={turnText} onchange={onUpdateTurn}>
        </div>
        <div class="text-center">
            <p class="text-sm">Death Saves:</p>
            <input class="input w-[9ch] text-center font-bold" placeholder="Saves" type="text" bind:value={saves} onchange={onUpdateDeathSaves}>
        </div>
    </div>
    <p>Notes:</p>
    <textarea onchange={onUpdateNotes} bind:value={notes} class="w-full input resize-none" rows={6}></textarea>
</div>