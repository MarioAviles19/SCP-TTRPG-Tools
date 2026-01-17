<script lang=ts>
    import { Plus } from "lucide-svelte";
    import EncounterMenu from "$lib/Components/Encounter/EncounterMenu.svelte";
    import EncounterRoot from "$lib/Components/Encounter/EncounterRoot.svelte";
    import TurnOrder from "$lib/Components/Encounter/TurnOrder.svelte";
    import { getContext } from "svelte";
    import { ctx } from "$lib/Components/Encounter";
    import type { encounterCtx } from "$lib/Components/Encounter";
    import type { NPCSchema } from "$lib/types";
    import { Combatant } from "$lib/Encounter/Encounter";
    import CharacterSheet from "$lib/Components/Characters/CharacterSheet.svelte";
    import EncounterInspector from "$lib/Components/Encounter/EncounterInspector.svelte";
    
    const { getEncounterManager, getSelectedCombatant } = getContext(ctx) as encounterCtx  
    
    
    const encounterManager = getEncounterManager()
    let selectedCombatant = getSelectedCombatant()
    let menuOpen = $state(true)
    
    
    function onFinishEncounterMenu(allies : NPCSchema[], opponents : NPCSchema[]){
        allies.forEach((ally)=>{
            if(encounterManager.allies.some((val)=>{return val.characterInfo === ally})){
                return
            }
            let newAlly = new Combatant(ally, true)
            newAlly.setTurnNumber(0)
            encounterManager.addAlly(newAlly)
        })
        opponents.forEach((opp)=>{
            if(encounterManager.opponents.some((val)=>{return val.characterInfo === opp})){
                return
            }
            let newOpp = new Combatant(opp, true)
            newOpp.setTurnNumber(0)
            encounterManager.addOpponent(newOpp)
        })
        menuOpen = false
    }
    
    $effect(()=>{console.log(selectedCombatant)})
    
</script>

<div class="grid grid-cols-3 gap-2 p-2">
    <div class="p-2">
        <TurnOrder/>
    </div>
    <div>
        {#if selectedCombatant.combatant}
        <EncounterInspector/>
        {/if}
    </div>
    <div>
        {#if selectedCombatant.combatant?.characterInfo}
        <CharacterSheet npc={{...selectedCombatant.combatant.characterInfo, index: 1}}/>
        {/if}
    </div>
</div>

{#if menuOpen}
<div class="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-xs">
    <div class="bg-card max-w-5xl p-4 w-full rounded-md border border-border">
        <EncounterMenu  onfinish={onFinishEncounterMenu}/>
    </div>
</div>
{/if}

<button onclick={()=>{menuOpen = true}} class="fixed bottom-4 left-4 btn-primary rounded-full p-4"><Plus/></button>