<script lang=ts>
	import type { NPCSchema } from "$lib/types";


    type props = {
        npc : NPCSchema
    }
    const { npc } : props = $props()
</script>

<div class="bg-card text-card-foreground w-full text-left border-border border rounded-md p-2">
    <h3 class="text-lg font-bold">{npc.name}</h3>
    <p class="font-semibold">{npc.type}</p>
</div>