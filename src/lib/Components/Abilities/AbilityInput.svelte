<script lang=ts>
    import { AbilityData, abilityTypes, speedType } from "$lib/types";
    
    type props = {
        data? : Partial<AbilityData>,
        onsubmit?: (ev : SubmitEvent, data: Partial<AbilityData>)=>void,
        oncancel? : ()=>void
    }
    let { data = $bindable<Partial<AbilityData>>({type : "Cast"}), onsubmit} : props = $props();
        
    function onSubmit(ev : SubmitEvent){
        ev.preventDefault()
        onsubmit?.(ev, data)
    }
</script>
    
{#snippet CastFields()}
    <label class="w-full" for="class">
        <p class="w-fit">Class</p>
        <input required class="w-full" bind:value={data.classType} type="text" placeholder="Class">
    </label>
    <label class="w-full">
        <p class="w-fit">Level</p>
        <input required class="w-full" bind:value={data.level} type="text" placeholder="Level">
    </label>
    <label class="w-full" for="speed">
        <p class="w-fit">Speed</p>
            <select bind:value={data.speed}>
                {#each speedType as type}
                    <option value={type}>{type}</option>
                {/each}
            </select>
    </label>
    <label class="w-full" for="range">
        <p class="w-fit">Range</p>
        <div class="relative w-full">
            <input class="w-full" bind:value={data.range} type="text" placeholder="Range">
            <p class="text-md text-right py-2 pr-1.5 pointer-events-none absolute left-0 top-0 w-full h-full ">ft</p>
        </div>
    </label>
    <label class="w-full">
        <p class="w-fit">Duration</p>
        <input class="w-full" bind:value={data.duration} type="text" placeholder="Speed">
    </label>
    <label class="w-full">
        <p class="w-fit">Cost</p>
        <input class="w-full" bind:value={data.cost} type="text" placeholder="Cost">
    </label>
{/snippet}
    
{#snippet FeatFields()}
    <label class="w-full">
        <p class="w-fit">Level</p>
        <input class="w-full" bind:value={data.level} type="text" placeholder="Level">
    </label>
    <label class="w-full" for="class">
        <p class="w-fit">Class</p>
        <input class="w-full" bind:value={data.classType} type="text" placeholder="Class">
    </label>
{/snippet}
    
    <form onsubmit={onSubmit} class="w-2xl p-2 border-primary">
        
        <label>
            <p>Type</p>
            <select required bind:value={data.type}>
                {#each abilityTypes as type}
                    <option value={type}>{type}</option>
                {/each}
            </select>
        </label>
        <div class="grid grid-cols-2 gap-2">
            <label class="w-full col-span-2">
                <p class="w-fit">Title</p>
                <input required class="w-full" bind:value={data.title} type="text" placeholder="Title">
            </label>
            
            {#if data.type === "Cast"}
            {@render CastFields()}
            
            {:else if data.type === "Feat"}
            {@render FeatFields()}
            {/if}
            
        </div>
        <label>
            <p>Description</p>
            <textarea required bind:value={data.description} class="resize-none w-full" placeholder="Description"></textarea>
        </label>
        <div class="flex items-center justify-center gap-2">
            <button class="btn border-primary" type="button">Cancel</button>
            <button class="btn btn-primary border-primary" type="submit">Save</button>
        </div>
    </form>