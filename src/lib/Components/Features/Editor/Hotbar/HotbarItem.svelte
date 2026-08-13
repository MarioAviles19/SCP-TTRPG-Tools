<script lang="ts">
	import { getContext, onMount } from "svelte";
	import { ctx, type HotbarContext } from ".";

    let { onclick, value, children, ...restProps } = $props();

    const context : HotbarContext = getContext(ctx)

    function buttonClicked(){
        context.selected = value
        onclick?.()
    }
    onMount(()=>{
        console.log({ctx : context.selected, val : value})
    })
</script>

<button aria-current={context.selected === value? "true" : undefined} onclick={buttonClicked} class="flex items-center justify-center aspect-square p-8 bg-neutral-700 text-white aria-[current]:bg-amber-400">{@render children()}</button>