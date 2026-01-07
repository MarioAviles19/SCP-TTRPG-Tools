<script lang=ts>
	import type { AbilityData, AbilityParams } from "$lib/types";
	import { onMount } from "svelte";
    import { Funnel } from "lucide-svelte"
	import { globalKey, type GlobalContext } from "../Globals";
    import { getContext } from "svelte";

    type props = {
        abilityList : AbilityData[]
    }
    let { abilityList } : props = $props()

    let classOptions : string[] = $state([])
    let typeOptions : string[] = $state([])

    const { abilitiesLoader } = getContext(globalKey) as GlobalContext
    function getOptions(param : AbilityParams, list : AbilityData[]){
        const foundOptions : any = {}
        if(!list){
            return
        }

        list.forEach((val)=>{

            if(!val[param]){
                return
            }
            if(!foundOptions[val[param]]){
                foundOptions[val[param]] = true
            }
        })
        
        return Object.keys(foundOptions)
    }
    function capitalizeFirstLetter(str : string) {
        if (!str){
            return ""
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    onMount(()=>{
        classOptions = getOptions("classType", abilityList) as string[]
        typeOptions = getOptions("type", abilityList) as string[]
        
    })
    

    function queryList(){
        //TODO: Fix all this bullshit
        let classType : Partial<AbilityData> = {}
        let type : Partial<AbilityData> = {}
        

        if(classFilter){
            classType = {classType : classFilter}
        }
        if(typeFilter){
            type = {type : typeFilter}
        }
        abilitiesLoader.query(
            {
                filter: {...classType, ...type}, 
                sort: ["classType", "type", "level"],
                search: {term : searchTerm, keys: ["title", "description"]}
            })
    }
    let open = $state(false)
    let classFilter = $state("")
    let typeFilter = $state("")
    let searchTerm = $state("")
</script>

<input oninput={queryList} bind:value={searchTerm} type="text">
<button class="btn block w-min m-auto mr-2 mb-2" onclick={()=>{open = !open}}><span><Funnel/></span></button>
{#if open}
    <div class="border-primary w-full p-2">
        <h2 class="font-bold">Filter</h2>
        <div class="flex items-start justify-start gap-2 p-2">
            <label>
                <p>Type</p>
                <select onchange={queryList} bind:value={typeFilter}>
                    <option value=""></option>
                    {#each typeOptions as type}
                        <option value={type}>{capitalizeFirstLetter(type)}</option>
                    {/each}
                </select>
            </label>
            <label>
                <p>Class</p>
                <select onchange={queryList} bind:value={classFilter}>
                    <option value=""></option>
                    {#each classOptions as classType}
                    <option value={classType}>{capitalizeFirstLetter(classType)}</option>
                    {/each}
                </select>
            </label>
        </div>
    
    </div>
{/if}