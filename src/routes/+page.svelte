<script lang=ts>
	import AbilityCard from "$lib/Components/Abilities/AbilityCard.svelte";
	import { AbilityData } from "$lib/types";
    import { JSONLoader } from "$lib/JSONLoader";
	import { onMount } from "svelte";
	import AbilityInput from "$lib/Components/Abilities/AbilityInput.svelte";
    import { getContext } from "svelte";
    import { globalKey, type GlobalContext } from "$lib/Components/Globals";
	import GlobalData from "$lib/Components/Globals/GlobalData.svelte";
	import AbilityListControls from "$lib/Components/Abilities/AbilityListControls.svelte";

    let { getAbilitiesList, abilitiesLoader} = getContext(globalKey) as GlobalContext
    
    const dummyAbility : AbilityData = {
        classType : "Interloper",
        type : "Cast",
        title : "Meow",
        description : "Transform",
        level : 1,
        range : "Melee",
        speed : "Action",
        duration : "concentration or 1 minute",
        cost: "none"
    }
    onMount(()=>{
        
    })
    let list = getAbilitiesList()

    function addAbility(ev : SubmitEvent, data : Partial<AbilityData>){ 
        if(!data.title || !data.type || !data.description){
            return
        }
        const ability = data as AbilityData
        abilitiesLoader.add(ability)
    }

</script>

<h1>Num Loaded : {list.abilitiesList.length}</h1>
<button onclick={()=>{abilitiesLoader.saveFile("abilities.json")}}>Save</button>
<AbilityListControls abilityList={list.abilitiesList}/>
<div class="mt-4 grid grid-cols-2 gap-2">
    {#each list.abilitiesList as ability}
        <AbilityCard data={ability} ondelete={(data)=>{ abilitiesLoader.remove(data.index)}}/>
    {/each}
</div>

<AbilityInput onsubmit={addAbility}/>