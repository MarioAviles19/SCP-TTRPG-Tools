<script lang="ts">
    import type { NPCSchema } from "$lib/types";
    import { X } from "lucide-svelte"
    import { type GlobalContext, globalKey } from "../Globals";
    import { getContext, onMount } from "svelte";
    import z, { number } from "zod";
    
    const { getCharacterList, characterLoader } : GlobalContext = getContext(globalKey)

    type actions = z.infer<typeof NPCSchema.shape.actions>;
    characterLoader.subscribe(()=>{
        actionList = getOptions<actions>("actions", characterLoader.loadedFile)
    })
    onMount(()=>{
        actionList = getOptions<actions>("actions", characterLoader.loadedFile)
        $inspect(actionList)

    })
    // Form state is partial by design
    type props = {
        npc?: Partial<NPCSchema> & any,
            onSubmit: (npc: NPCSchema & {index?: number}) => void
        };
        

    let { npc = $bindable({}), onSubmit } : props = $props()
    if(!npc.abilities){
        npc.abilities = {}
    }
    if(!npc.actions){
        npc.actions = []
    }
    if(!npc.skills){
        npc.skills = {}
    }
    if(!npc.savingThrows){
        npc.savingThrows = {}
    }
    function submit() {
        onSubmit(npc as NPCSchema); // validate with Zod outside
    }
    let actionList = $state<actions>([])
    const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"];
    const SKILLS = [
  "athletics (str)",

  "acrobatics (dex)",
  "sleightOfHand (dex)",
  "stealth (dex)",

  "science (int)",
  "history (int)",
  "investigation (int)",
  "nature (int)",
  "religion (int)",

  "animalHandling (wis)",
  "insight (wis)",
  "medicine (wis)",
  "perception (wis)",
  "survival (wis)",

  "deception (cha)",
  "intimidation (cha)",
  "performance (cha)",
  "persuasion (cha)"
].sort();

    function getOptions<T>(param : keyof NPCSchema, list : NPCSchema[]){
    const foundOptions : any = {}
    if(!list){
        return [] as T
    }

    list.forEach((val)=>{

        if(!val[param]){
            return
        }
        if(val[param] instanceof Array){
            val[param].forEach((item)=>{
                if(!foundOptions[JSON.stringify(item)]){
                foundOptions[JSON.stringify(item)] = true
            }
            })
        }
        else if(!foundOptions[JSON.stringify(val[param])]){
            foundOptions[JSON.stringify(val[param])] = true
        }
    })
    return Object.keys(foundOptions).map((val)=>{return JSON.parse(val)}) as T
}

    function actionSelected(actionInputIndex : number, actionListIndex : number){

        console.log({actions: npc.actions, actionInputIndex, actionListIndex})


        if(actionListIndex < 0){
            npc.actions[actionInputIndex] = {}
        } else if(actionList){
            npc.actions[actionInputIndex] = actionList[actionListIndex]
        }
    }
    const selectAction = (ev : Event, i : number)=>{
        const target = ev?.target as HTMLInputElement
        actionSelected(i, parseInt(target.value) ?? -1)
        }
</script>

<div class="max-w-4xl mx-auto p-6 space-y-6 bg-slate-900 text-slate-100 rounded-xl">

  <!-- Header -->
  <div class="grid grid-cols-2 gap-4">
    <label>
        <p class="font-semibold text-sm">Name</p>
        <input
          class="input"
          placeholder="Name"
          bind:value={npc.name}
        />
    </label>
  </div>

  <!-- Type & Alignment -->
  <div class="grid grid-cols-2 gap-4">
    <label>
        <p class="font-semibold text-sm">Type</p>
        <input
          class="input"
          placeholder="Type (e.g. humanoid)"
          bind:value={npc.type}
        />
    </label>
  </div>

  <!-- Combat Stats -->
  <div class="grid grid-cols-4 gap-4">
    <label>
        <p class="font-semibold text-sm">AC</p>
        <input class="input" type="number" placeholder="AC" bind:value={npc.armorClass} />
    </label>

    <label>
        <p class="font-semibold text-sm">HP</p>
        <input class="input" type="number" placeholder="HP" bind:value={npc.hitPoints} />
    </label>

    <label>
        <p class="font-semibold text-sm">Hit Dice</p>
        <input class="input" placeholder="Hit Dice" bind:value={npc.hitDice} />
    </label>

    <label>
        <p class="font-semibold text-sm">Challenge Rating</p>
        <input class="input" type="number" placeholder="CR" bind:value={npc.challengeRating} />
    </label>
  </div>

  <!-- Ability Scores -->
  <div>
    <h2 class="font-semibold mb-2">Ability Scores</h2>
    <div class="grid grid-cols-6 gap-2">
      {#each ["str","dex","con","int","wis","cha"] as stat}
        <label>
            <p class="w-full text-sm font-semibold">{stat.toUpperCase()}</p>
            <input
              class="input text-center"
              type="number"
              placeholder={stat.toUpperCase()}
              bind:value={npc.abilities[stat]}
              oninput={(e) => {
                if(!npc.abilities){
                    npc.abilities = {}
                }
                npc.abilities[stat] = Number(e.currentTarget.value);
              }}
            />
        </label>
      {/each}
    </div>
  </div>
   <!-- Saving Throws -->
  <div>
    <h2 class="font-semibold mb-2">Saving Throws</h2>
    <div class="grid grid-cols-6 gap-2">
      {#each ABILITIES as stat}
        <label>
            <p class="w-full text-sm font-semibold">{stat.toUpperCase()}</p>
            <input
              class="input text-center"
              type="number"
              placeholder={stat.toUpperCase()}
              bind:value={npc.savingThrows[stat]}
            />
        </label>
      {/each}
    </div>
  </div>

  <!-- Skills -->
  <div>
    <h2 class="font-semibold mb-2">Skills</h2>
    <div class="grid grid-cols-3 gap-2">
      {#each SKILLS as skill}
        <div class="flex items-center gap-2">
          <label class="text-sm w-28 capitalize">{skill.replace(/([A-Z])/g, " $1")}
          <input
            class="input w-full"
            type="number"
            placeholder="+0"
            bind:value={npc.skills[skill.split(" ")[0]]}
          />
          </label>
        </div>
      {/each}
    </div>
  </div>

  <!-- Actions -->
  <div>
    <h2 class="font-semibold mb-2">Actions</h2>

    {#each npc.actions ?? [] as action, i}
    <div class="group">
        <div class="">
            <button class="group-hover:opacity-100 opacity-0 hover:text-destructive transition-all" onclick={()=>{npc.actions.splice(i, 1); npc.actions = npc.actions}}><X/></button>
            <select class="input w-full" onchange={(ev)=>{selectAction(ev, i)}}>
                <option value="-1"></option>
                {#each actionList as action, n}
                    <option value={n}>{action.name}</option>
{               /each}
            </select>
        </div>
          <div class="grid grid-cols-3 gap-2 mb-2">
            <input class="input" placeholder="Name" bind:value={action.name} />
            <input class="input" placeholder="Attack Bonus" bind:value={action.attackBonus} />
            <input class="input" placeholder="Damage" bind:value={action.damage} />
            <input class="input col-span-3" placeholder="Description" bind:value={action.description} />
          </div>
    </div>
    {/each}

    <button
      class="btn-secondary"
      onclick={() => {
        npc.actions ??= [];
        npc.actions.push({ name: "", description: "" });
        npc.actions = npc.actions
      }}
    >
      + Add Action
    </button>
  </div>

    <textarea class="textarea resize-none w-full h-[4lh]" bind:value={npc.notes} placeholder="Notes (e.g., background, motivation, etc.)"></textarea>

  <!-- Submit -->
  <div class="text-right">
    <button class="btn-primary" onclick={submit}>
      Save NPC
    </button>
  </div>
</div>

