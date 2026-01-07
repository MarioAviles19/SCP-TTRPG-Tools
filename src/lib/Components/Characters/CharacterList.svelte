<script lang=ts>
	import { NPCSchema } from "$lib/types";
	import CharacterCard from "./CharacterCard.svelte";

    type props = {
        list : (NPCSchema & {index : number})[],
        onselect? : (index : number)=>void,
        activeIndex? : number
    }
    const { list, onselect, activeIndex } : props = $props()
</script>

{#each list as npc, i}
    <button aria-current={activeIndex === i ? "true" : undefined} onclick={()=>{onselect(i)}} class="block w-full my-1 aria-[current]:ring-1 aria-[current]:ring-primary aria-[current]:translate-x-2 rounded-md hover:translate-x-2 transition-all">
        <CharacterCard npc={npc}/>
    </button>
{/each}