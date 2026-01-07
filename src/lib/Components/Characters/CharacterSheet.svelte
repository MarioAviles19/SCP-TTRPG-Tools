<script lang="ts">
  import { NPCSchema as NPC } from "$lib/types";
  import { Pencil, Trash2 } from "lucide-svelte"

  type props = {
    npc : NPC | any,
    onedit : (data : NPC & {index : number})=>void,
    ondelete : (index : number)=>void
  }
  let { npc, onedit, ondelete } : props = $props();

  const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"];
  const SKILLS = [
    "athletics","acrobatics","sleightOfHand","stealth","science","history","investigation",
    "nature","religion","animalHandling","insight","medicine","perception","survival",
    "deception","intimidation","performance","persuasion"
  ].sort();

  function formatSkill(skill: string) {
    return skill.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());
  }
  $inspect(npc.skills)

</script>

<div class="max-w-4xl w-full mx-auto p-6 space-y-6 bg-card text-card-foreground rounded-xl border border-color-border">

  <!-- Header -->
  <div class="flex justify-between items-center">
    <div>
        <h1 class="text-2xl font-bold">{npc.name}</h1>
        <p class="text-sm">{npc.type}</p>
    </div>
    <div>
        <button onclick={()=>{onedit(npc)}} class="btn-secondary"><Pencil/></button>
        <button onclick={()=>{ondelete(npc.index)}} class="btn-secondary text-destructive"><Trash2/></button>
    </div>
  </div>

  <!-- Combat Stats -->
  <div class="grid grid-cols-4 gap-4 mt-4">
    <div><strong>AC:</strong> {npc.armorClass}</div>
    <div><strong>HP:</strong> {npc.hitPoints}</div>
    <div><strong>Hit Dice:</strong> {npc.hitDice}</div>
    <div><strong>CR:</strong> {npc.challengeRating}</div>
  </div>

  <!-- Abilities -->
  <div>
    <h2 class="font-semibold mb-2">Abilities</h2>
    <div class="grid grid-cols-6 gap-2 text-center">
      {#each ABILITIES as stat}
        <div>
          <div class="font-bold">{stat.toUpperCase()}</div>
          <div>{npc.abilities[stat]}</div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Saving Throws -->
  <div>
    <h2 class="font-semibold mb-2">Saving Throws</h2>
    <div class="grid grid-cols-6 gap-2 text-center">
      {#each ABILITIES as stat}
        <div>
          <div class="font-bold">{stat.toUpperCase()}</div>
          <div>{npc.savingThrows?.[stat] ?? '-'}</div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Skills -->
  <div>
    <h2 class="font-semibold mb-2">Skills</h2>
    <div class="grid grid-cols-3 gap-2">
      {#each SKILLS as skill}
        <div class="flex justify-between border-b border-border px-2 py-1">
          <span>{formatSkill(skill)}</span>
          <span>{npc.skills?.[skill] ?? '-'}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Actions -->
  <div>
    <h2 class="font-semibold mb-2">Actions</h2>
    <ul class="list-disc pl-5 space-y-1">
      {#each npc.actions ?? [] as action}
        <li>
          <strong>{action.name}</strong>
          {#if action.attackBonus != null}
            (Attack: +{action.attackBonus})
          {/if}
          {#if action.damage != null}
            , Damage: {action.damage}
          {/if}
          {#if action.description}
            <div class="ml-2 text-sm">{action.description}</div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>

    <div>
        <h2 class="font-semibold mb-2">Notes</h2>
        <p class="whitespace-pre-line">{npc.notes}</p>
    </div>

</div>

<style>
  h2 {
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.25rem;
  }
</style>