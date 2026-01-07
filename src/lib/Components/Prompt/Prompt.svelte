<script lang=ts>
    import { getPromptOptions, getPromptState } from "./index.svelte"
    import { fade } from "svelte/transition"

    const options = getPromptOptions()
    const state = getPromptState()
    
</script>

{#if state.promptOpen}
    <div transition:fade={{duration: 150}} class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-neutral-950/20 backdrop-blur-xs">
        <div class="bg-card text-card-foreground py-2 px-4 border-2 border-border rounded-md max-w-md">
            <p class="my-2 font-semibold text-lg">{options.promptOptions?.text}</p>
            <div class="flex items-center justify-center gap-4">
                <button class="btn-secondary font-bold text-lg" onclick={()=>{options.promptOptions?.onresponse(true); state.promptOpen = false}} type="button">Sure</button>
                <button class="btn-secondary font-bold text-lg" onclick={()=>{options.promptOptions?.onresponse(false); state.promptOpen = false}} type="button">Cancel</button>
            </div>
        </div>
    </div>
{/if}