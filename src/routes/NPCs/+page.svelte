<script lang=ts>
	import CharacterInput from "$lib/Components/Characters/CharacterInput.svelte";
	import CharacterSheet from "$lib/Components/Characters/CharacterSheet.svelte";
    import { NPC } from "$lib/Components/Characters";
    import { globalKey } from "$lib/Components/Globals";
    import { getContext } from "svelte";
    import type { GlobalContext } from "$lib/Components/Globals";
	import { AbilityData, NPCSchema } from "$lib/types";
	import CharacterList from "$lib/Components/Characters/CharacterList.svelte";
	import { askPrompt } from "$lib/Components/Prompt/index.svelte";
    import { X } from "lucide-svelte"
    import z from "zod";

    const { getCharacterList, characterLoader } : GlobalContext = getContext(globalKey)

    const list = getCharacterList()
    let inputOpen = $state(false)

    let activeIndex : number | undefined = $state(0)

    let npc = $derived(list.characterList[activeIndex] || null)
    let currentEdit : (NPCSchema & {index : number} | undefined) = $state()
    let editOpen = $state(false)
    let searchTerm = $state("")

    characterLoader.query({sort : ["type", "challengeRating", "name"]})

    function deleteItem(index : number){
        characterLoader.remove(index)
        activeIndex = undefined
    }
    function editItem(npcToEdit : NPCSchema & {index : number}){
        currentEdit = npcToEdit
        editOpen = true
    }
    function search(){
        characterLoader.query({search : {term : searchTerm, keys : ["name", "type", "notes"]}, sort : ["type", "name", "challengeRating"]})
    }
    function getOptions<T>(param : keyof NPCSchema, list : NPCSchema[]){
    const foundOptions : any = {}
    if(!list){
        return [] as T[]
    }

    list.forEach((val)=>{

        if(!val[param]){
            return
        }
        if(!foundOptions[JSON.stringify(val[param])]){
            foundOptions[JSON.stringify(val[param])] = true
        }
    })
    return Object.keys(foundOptions).map((val)=>{return JSON.parse(val)}) as T[]
}
    
</script>

{#if inputOpen}
    <div class="absolute z-40 top-0 left-0 w-full backdrop-blur-xs flex flex-col items-center justify-center">
        <button onclick={()=>{inputOpen = false}} class="block my-2"><X/></button>
        <CharacterInput onSubmit={(data : NPCSchema)=>{
            const res = characterLoader.add(data); 
            if(!res?.error)
            inputOpen = false
            }} />
    </div>
{/if}
{#if editOpen}
    <div class="absolute z-40 top-0 left-0 w-full backdrop-blur-xs flex-col flex items-center justify-center">
        <button onclick={()=>{editOpen = false}} class="block my-2"><X/></button>
        <CharacterInput onSubmit={
        (data : NPCSchema & {index? : number})=>{
            if(data.index || data.index === 0){
                characterLoader.edit(data, data.index); 
                editOpen = false} else{console.warn("No index")}}} npc={currentEdit}/>
    </div>
{/if}
<div class="py-2 text-right">
    <button onclick={()=>{characterLoader.saveFile("NPCs.json")}} class="btn-secondary" type="button">Save</button>
</div>
<div class="grid grid-cols-[.33fr_.66fr] gap-4 p-2">
    <div class=" px-1 w-full">
        <div class="text-right"><button class="btn-primary" onclick={()=>{inputOpen = true;}} type="button">Add</button></div>
        <input bind:value={searchTerm} oninput={search} type="text" placeholder="Search" class="input w-full my-2">
        <CharacterList activeIndex={activeIndex} list={list.characterList} onselect={(index)=>{activeIndex = index}}/>
    </div>
    {#if npc}
        <CharacterSheet onedit={editItem} ondelete={deleteItem} npc={npc}/>
        {:else}
        <p class="font-bold text-lg text-center">Select Character</p>
    {/if}
</div>