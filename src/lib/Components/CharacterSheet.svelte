<script lang=ts>
  import Hexagon from "$lib/Components/Hexagon.svelte";
	import HexLabel from "$lib/Components/HexLabel.svelte";
	import Shield from "$lib/Components/Shield.svelte";
</script>

{#snippet stat(name : string)}
<div class="relative flex justify-center items-center p-4 aspect-square">
    <div class="pointer-events-none absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <Hexagon fill="none" class="h-full"/>
    </div>
    <p class="absolute bottom-0 text-xs font-bold bg-white shadow-lg p-0.5 border-2 border-black">{name}</p>
    <input type="text" name="" value="" id="" class="w-[2.5em] text-3xl font-semibold text-center p-0 outline-none border-none">
    
</div>
{/snippet}


{#snippet skill(name : string, stat : string)}

    <p class="text-xs my-1 mx-1"><Hexagon  class="inline-block w-4 h-4"/> <span class="inline-block border-b border-black w-[4ch] mx-2"></span> {name} <span class="text-black/70">({stat})</span></p>
{/snippet}

{#snippet savingThrow(name : string)}
    <p class="text-xs my-1 mx-1"><Hexagon class="inline-block w-4 h-4"/> <span class="inline-block border-b border-black w-[4ch] mx-2"></span> {name} </p>
{/snippet}

<div class="flex items-center justify-center">
    

    <div class="flex flex-col">
        <div class="w-[50.25rem] flex items-center justify-between">
            <img class="size-40" alt="SCP Logo" src="/SCP_Foundation_(emblem).svg"/>
            <div class="border-doubl max-w-[25rem]e border-4 border-black grow p-2">
                <div class="border-b-2 border-black"><p class="mb-0">NAME:</p></div>
                <div class="grid grid-cols-[.33fr_.66fr]">
                    <div class="w-full border-b-2 border-black"><p class="mb-0">LEVEL:</p></div>
                    <div class="w-full border-b-2 border-black"><p class="mb-0">PLAYER NAME:</p></div>
                </div>
            </div>
        </div>
        <div class="flex justify-start items-start gap-1">
            <div class="flex flex-col items-center justify-start  px-2">
                {@render stat("STRENGTH")}
                {@render stat("DEXTERITY")}
                {@render stat("CONSTITUTION")}
                {@render stat("INTELLIGENCE")}
                {@render stat("WISDOM")}
                {@render stat("CHARISMA")}
            </div>
            <div class="">
                <div class="flex justify-between items-center gap-1">
                    <Hexagon strokeWidth={6} class="w-18 h-18 rotate-90"/>
                    <p class="border-double border-4 border-black grow p-1 text-xs text-center min-w-12 font-bold">PROFICIENCY BONUS</p>
                </div>
                <div class=" border-double border-4 border-black mb-1 font-semibold">
                    <p class="text-center text-xs font-bold">SAVING THROWS</p>
                    {@render savingThrow("Strength")}
                    {@render savingThrow("Dexterity")}
                    {@render savingThrow("Constitution")}
                    {@render savingThrow("Intelligence")}
                    {@render savingThrow("Wisdom")}
                    {@render savingThrow("Charisma")}
                </div>
    
                <div class=" border-double border-4 border-black font-semibold">
                    <p class="text-center text-xs font-bold">SKILLS</p>
                    {@render skill("Acrobatics", "Dex")}
                    {@render skill("Animal Handling", "Wis")}
                    {@render skill("Athletics", "Str")}
                    {@render skill("Deception", "Cha")}
                    {@render skill("History", "Int")}
                    {@render skill("Insight", "Wis")}
                    {@render skill("Intimidation", "Cha")}
                    {@render skill("Medicine", "Wis")}
                    {@render skill("Nature", "Int")}
                    {@render skill("Perception", "Wis")}
                    {@render skill("Performance", "Cha")}
                    {@render skill("Persuasion", "Cha")}
                    {@render skill("Religion", "Int")}
                    {@render skill("Science", "Int")}
                    {@render skill("Sleight of Hand", "Dex")}
                    {@render skill("Stealth", "Dex")}
                    {@render skill("Survival", "Wis")}
                </div>
            </div>
            <div class="">
                <div class="flex justify-start items-center gap-1">
                    <div class="text-[.5rem]">
                        <HexLabel class="w-20 h-20" value="ARMOR CLASS"/>
                    </div>
                    <div class="text-[.5rem]">
                        <HexLabel class="w-20 h-20" value="INITIATIVE"/>
                    </div>
                    <div class="text-[.5rem]">
                        <HexLabel class="w-20 h-20" value="SPEED"/>
                    </div>
                </div>
                <div class="border-double border-4 border-black h-32 my-1">
                    <p class="text-center text-xs font-bold">HIT POINTS</p>
                </div>
                <div class="border-double border-4 border-black h-32 my-1">
                    <p class="text-center text-xs font-bold">TEMP HIT POINTS</p>
                </div>
                <div class="h-20 grid grid-cols-2 gap-1">
                    <div class="border-double border-4 border-black my-1">
                        <p class="text-center text-xs font-bold">HIT DICE</p>
                    </div>
                    <div class="border-double border-4 border-black my-1">
                        <p class="text-center text-xs font-bold">DEATH SAVES</p>
                    </div>
                </div>
                <div class="border-double border-4 border-black h-51.5 my-1">
                    <p class="text-center text-xs font-bold">EQUIPMENT</p>
                </div>
            </div>
            <div class="">
                <div class="border-double border-4 border-black my-1 pb-2">
                        <p class="text-center text-xs font-bold">INVENTORY</p>
                    {#each {length: 13}}
                    <div class="border-b border-black w-48 mx-1 my-5"></div>
                    {/each}
                </div>
                <div class="border-double border-4 border-black my-1 pb-2">
                        <p class="text-center text-xs font-bold">FEATS & ABILITIES</p>
                    {#each {length: 12}}
                    <div class="border-b border-black w-48 mx-1 my-5"></div>
                    {/each}
                </div>
            </div>
        </div>
        <div class="border-double border-4 border-black my-2 min-h-60 w-[50.25rem]">
            <p class="text-center text-xs font-bold">NOTES</p>
        </div>
    </div>
</div>