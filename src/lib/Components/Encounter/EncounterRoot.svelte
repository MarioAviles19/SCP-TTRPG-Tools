<script lang=ts>
	import { setContext, type Snippet } from "svelte";
    import { ctx } from ".";
	import { Combatant, Encounter } from "$lib/Encounter/Encounter";

    const encounterManager = $state<Encounter>(new Encounter())
    let selectedCombatant = $state<Combatant>()

    function getSelectedCombatant(){
            return {

            get combatant(){return selectedCombatant},
            set combatant(val : Combatant | undefined){selectedCombatant = val}
        }
    }
    setContext(ctx, {
        getEncounterManager : ()=>encounterManager,
        getSelectedCombatant
    })
    type props = {
        children? : Snippet
    }
    const { children } : props = $props()
</script>

{@render children?.()}