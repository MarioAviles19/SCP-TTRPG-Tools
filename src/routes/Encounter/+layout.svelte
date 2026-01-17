<script lang=ts>
    import {type Snippet } from "svelte";

	import EncounterRoot from "$lib/Components/Encounter/EncounterRoot.svelte";

    type props = {
        children : Snippet
    }

    const { children } : props = $props()
</script>


<EncounterRoot>
    {@render children()}
</EncounterRoot>