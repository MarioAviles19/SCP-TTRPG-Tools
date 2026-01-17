<script lang=ts>
    import { ChevronLeft, ChevronRight, X } from "lucide-svelte"
	import { NPCSchema } from "$lib/types";
	import CharacterCard from "../Characters/CharacterCard.svelte";
	import Combobox from "../Combobox/Combobox.svelte";
    import { getContext, onMount } from "svelte";
    import { globalKey } from "../Globals";
    import type { GlobalContext } from "../Globals";
    import { ctx } from ".";
    import type { encounterCtx } from ".";
    const {characterLoader} : GlobalContext = getContext(globalKey) 
    const { getEncounterManager } : encounterCtx = getContext(ctx)
    type props = {
        allies? : NPCSchema[],
        opponents? : NPCSchema[],
        onfinish? : (allies : NPCSchema[], opponents : NPCSchema[])=>void,
    }
    const encounterManager = getEncounterManager()
    let { allies = $bindable<(NPCSchema)[]>([]), opponents = $bindable<(NPCSchema)[]>([]), onfinish } : props = $props()

    let options = $state<NPCSchema[]>([])

    let comboValue = $state("")
    let comboOptions = $state<({text : string} & (NPCSchema & {index : number}))[]>([])



    function getComboOptions(){
        const {searchResult} = characterLoader.query({search : {term : comboValue, keys: ["name", "type"]}})

        comboOptions = searchResult.map((val)=>{return {text : val.name, ...val}})
    }
    function comboOptionSelected(selection : ({text : string} & (NPCSchema & {index : number}))){
        options.push(selection)
        comboValue = ""
    }
    function moveSelection(index : number, listFrom : (NPCSchema)[], listTo : (NPCSchema)[]){
        listTo.push(listFrom[index])
        listFrom.splice(index, 1)
    }
    function removeSelection(index: number, list : NPCSchema[]){
        list.splice(index, 1)
    }
    onMount(()=>{
        allies = encounterManager.allies.map((val)=>val.characterInfo)
        opponents = encounterManager.opponents.map((val)=>val.characterInfo)
    })

</script>

<h3 class="text-center text-xl font-bold">Add Combatants</h3>

<div class="grid grid-cols-3 gap-4">
    <div class="p-2 flex flex-col border-border border rounded-md min-h-[66svh] bg-input">
        <h4 class="font-bold text-center text-lg">Allies</h4>
        {#each allies as ally, i}
            <div class="flex items-center justify-center group">
                <div class="relative grow">
                    <CharacterCard npc={ally}/>
                    <button onclick={()=>{removeSelection(i, allies)}} class="group-hover:opacity-100 transition-all opacity-0 text-destructive absolute top-1 right-1" type="button"><X/></button>
                </div>
                <button class="opacity-0 group-hover:opacity-100 transition-all" onclick={()=>{moveSelection(i, allies, opponents)}}><ChevronRight size={32}/></button>
            </div>
        {/each}
        {#if allies.length === 0}
            <div class="h-full w-full flex items-center justify-center">
                <p class="text-center text-md font-semibold">Add at least one ally</p>
            </div>
        {/if}
    </div>
    <div class="p-2 ">
        <Combobox onselect={comboOptionSelected} oninput={getComboOptions} placeholder="Search" bind:options={comboOptions} bind:value={comboValue}/>
        {#each options as option, i}
            <div class="flex items-center justify-center w-full mt-4">
                <button class="block" onclick={()=>{moveSelection(i, options, allies)}}><ChevronLeft size={32}/></button>
                <div class="relative group grow">
                    <CharacterCard npc={option}/>
                    <button onclick={()=>{removeSelection(i, options)}} class="group-hover:opacity-100 transition-all opacity-0 text-destructive absolute top-1 right-1" type="button"><X/></button>
                </div>
                <button class="block" onclick={()=>{moveSelection(i, options, opponents)}}><ChevronRight size={32}/></button>
            </div>
        {/each}
    </div>
    <div class="p-2 flex flex-col border-border border rounded-md min-h-[66svh] bg-input">
        <h4 class="font-bold text-center text-lg">Opponents</h4>
        {#each opponents as opponent, i}
            <div class="flex items-center justify-center group">
                <button class="opacity-0 group-hover:opacity-100 transition-all" onclick={()=>{moveSelection(i, opponents, allies)}}><ChevronLeft size={32}/></button>
                <div class="relative grow">
                    <CharacterCard npc={opponent}/>
                    <button onclick={()=>{removeSelection(i, opponents)}} class="group-hover:opacity-100 transition-all opacity-0 text-destructive absolute top-1 right-1" type="button"><X/></button>
                </div>
            </div>
        {/each}
        {#if opponents.length === 0}
            <div class="h-full w-full flex items-center justify-center">
                <p class="text-center text-md font-semibold">Add at least one opponent</p>
            </div>
        {/if}
    </div>
</div>
{#if opponents.length > 0 && allies.length > 0}
<div class="flex items-center justify-center">
    <button onclick={()=>{onfinish?.(allies, opponents)}} class='btn-primary' type="button">Finish</button>
</div>
{/if}