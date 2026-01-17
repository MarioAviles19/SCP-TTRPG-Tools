<script lang=ts>
    import { Combatant, type Encounter } from "$lib/Encounter/Encounter";
    import { onMount } from "svelte";
    import CharacterCard from "../Characters/CharacterCard.svelte";
    import { getContext } from "svelte";
    import { ctx } from "$lib/Components/Encounter";
    import type { encounterCtx } from "$lib/Components/Encounter";
    
    const { getEncounterManager, getSelectedCombatant, setSelectedCombatant } = getContext(ctx) as encounterCtx  
    
    const encounterManager = getEncounterManager()
    
    let selectedCombatant = getSelectedCombatant()
    
    let combatantSelected = $state<Combatant>();
        
    let turnSlots = $state<Combatant[][]>([[]].fill([], 0, 13))
    
    onMount(()=>{
        encounterManager.subscriber.subscribe(()=>{
            initTurnSlots()
        })

    })
    function initTurnSlots(){
        turnSlots = new Array(13).fill([], 0, 13)
        encounterManager.allies.forEach((val)=>{
            let i = getAllyIndex(val.turnNumber)
            turnSlots[i].push(val)
        })
        console.log("rearranging")
        encounterManager.opponents.forEach((val)=>{
            let i = getOpponentIndex(val.turnNumber)
            turnSlots[i].push(val)
        })
        turnSlots = turnSlots
    }
    
    function getAllyIndex(rawTurnOrder : number){
        rawTurnOrder++
        rawTurnOrder = rawTurnOrder + (rawTurnOrder - 1)
        rawTurnOrder--
        return rawTurnOrder
    }
    function getOpponentIndex(rawTurnOrder : number){
        rawTurnOrder++
        rawTurnOrder *= 2
        rawTurnOrder--
        return rawTurnOrder
    }
    
        
    </script>
    
    
    <div class="flex flex-col">
        {#each turnSlots as slot, i}
        <div class="flex items-center justify-start gap-4 my-2">
            {#if slot.length > 0}
                {#if (i % 2) === 0}
                <div class="w-16">
                    <div class="w-16 border-2 border-primary h-0.5"></div>
                </div>
                {:else}
                <div class="w-16">
                    <div class="w-8 border-2 border-red-900 h-0.5"></div>
                </div>  
                {/if}
            {/if}
            {#each slot as character}
            <button class="aria-[current]:ring-2 aira-[current]:ring-primary" onclick={()=>{console.log(selectedCombatant); selectedCombatant.combatant = character}} aria-current={selectedCombatant.combatant === character ? "true" : undefined} type="button" >
                <CharacterCard npc={character.characterInfo}/>
            </button>
            {/each}
        </div>
        {/each}
    </div>
    