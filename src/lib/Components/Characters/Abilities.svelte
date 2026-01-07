<script lang=ts>
	import type { AbilityScoresSchema } from "$lib/types";

    type props = {
        abilities : AbilityScoresSchema
    }
    const { abilities } : props = $props()
    function calculateModifier(score : number){
        return Math.floor(score / 2) + - 5
    }
</script>

<p>Str: {abilities.str} +({calculateModifier(abilities.str)})</p>
<p>Dex: {abilities.dex} +({calculateModifier(abilities.dex)})</p>
<p>Con: {abilities.con} +({calculateModifier(abilities.con)})</p>
<p>Int: {abilities.int} +({calculateModifier(abilities.int)})</p>
<p>Wis: {abilities.wis} +({calculateModifier(abilities.wis)})</p>
<p>Cha: {abilities.cha} +({calculateModifier(abilities.cha)})</p>