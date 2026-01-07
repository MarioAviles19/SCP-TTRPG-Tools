<script lang=ts>
    import { setContext } from "svelte";
    import { globalKey } from ".";
	import { AbilityData, NPCSchema } from "$lib/types";
	import { JSONLoader } from "$lib/JSONLoader";


    //Abilities data
    const abilitiesLoader = new JSONLoader(AbilityData)
    let abilitiesList : AbilityData[] = $state([])
    abilitiesLoader.subscribe(()=>{
        abilitiesList = abilitiesLoader.list
        console.log({list : abilitiesLoader.list})
    })
    abilitiesList = abilitiesLoader.list

    function getAbilitiesList(){
        return {
            get abilitiesList() {return abilitiesList},
            set abilitiesList(val : AbilityData[]){abilitiesList = val}
        }
    }

    //Characterdata

    const characterLoader = new JSONLoader(NPCSchema)
    let characterList : (NPCSchema & {index : number})[] = $state([])

    characterLoader.subscribe(()=>{
        characterList = characterLoader.list
        console.log(characterList)
    })
    characterList = characterLoader.list
    function getCharacterList(){
        return {
            get characterList() {return characterList},
            set abilitiesList(val : (NPCSchema & {index : number})[]){characterList = val}
        }
    }

    setContext(globalKey, {
        getAbilitiesList,
        abilitiesLoader,
        getCharacterList,
        characterLoader
        
    })

    const { children } = $props()
</script>

{@render children()}
