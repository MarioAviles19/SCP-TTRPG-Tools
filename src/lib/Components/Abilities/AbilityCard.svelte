<script lang=ts>
	import { speedType, type AbilityData } from "$lib/types";
    import {Pencil, Trash2} from "lucide-svelte"
	import { getClassIcon } from ".";

    type props = {
        data : AbilityData & {index : number},
        onedit? : (data : AbilityData & {index : number})=>void,
        ondelete? : (data : AbilityData & {index : number})=>void
    }
    const { data, ondelete, onedit } : props = $props()
    
</script>

{#snippet displayStatIfPresent(name : string, value? : string)}

    {#if value}
        <p class="text-sm">{name}: <strong>{value}</strong></p>
    {/if}
{/snippet}

<div class="border-border max-w-2xl min-w-lg w-fit p-2 pt-1 group rounded-md bg-card border">
    <div class="flex justify-start items-stretch gap-2">
        <div class="flex aspect-square items-center justify-center shrink-0">
            <img class="aspect-square h-[64px]" src={getClassIcon(data.classType)} alt="Class Icon">
        </div>
        <div class="grow w-full">
            <div class="flex items-center justify-between w-full">
                <h2 class="font-bold text-lg">{data.title}</h2>
                <div class="flex items-center justify-end gap-1 transition-all opacity-0 group-hover:opacity-100">
                    <button onclick={()=>{onedit?.(data)}} class="p-0.5 rounded hover:bg-primary/10 cursor-pointer" type="button"><Pencil/></button>
                    <button onclick={()=>{ondelete?.(data)}} class="p-0.5 rounded hover:bg-primary/10 cursor-pointer hover:text-destructive" type="button"><Trash2/></button>
                </div>
            </div>
            <p class="text-md font-semibold my-0">{data.type}</p>
        </div>
    </div>
    <div class="w-full border-b border-border"></div>
    <div class="text-sm">
        {@render displayStatIfPresent("Class", data.classType)}
        {@render displayStatIfPresent("Speed", data.speed)}
        {@render displayStatIfPresent("Range", data.range)}
        {@render displayStatIfPresent("Duration", data.duration)}
        {@render displayStatIfPresent("Cost", data.cost)}
    </div>
    <div class="w-full border-b border-border"></div>
    <p class="text-md font-semibold">{data.description}</p>
    <div class="border-border border-b"></div>
    {@render displayStatIfPresent("Cost", data.cost)}
</div>