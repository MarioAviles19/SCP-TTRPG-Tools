<script lang="ts">
	import { setContext } from "svelte";
	import { ctx } from ".";

    let { selected, children, ...restProps } = $props();

    setContext(ctx,{
        get selected(){return selected},
        set selected(sel){selected = sel}
    })
</script>

<div {...restProps}>{@render children()}</div>