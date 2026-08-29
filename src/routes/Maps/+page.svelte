<script lang=ts>
    import { Eraser, Paintbrush, Pointer } from "lucide-svelte";
	import Hotbar from "$lib/Components/Features/Editor/Hotbar";
	import HotbarContent from "$lib/Components/Features/Editor/Hotbar/HotbarContent.svelte";
	import { DungeonMap } from "$lib/MapTools/dungeonMap";
	import { onMount } from "svelte";

    let canvas = $state<HTMLCanvasElement>()
    let map : DungeonMap
    onMount(()=>{
        if(canvas){
            map = new DungeonMap(canvas)
            map.animate()
            map.setMode("brush")
        }
    })

</script>

<div class="w-full h-full flex items-center justify-center border border-neutral-100">
    <canvas class="w-full h-[95svh]" bind:this={canvas}></canvas>
</div>

<Hotbar.Root selected="paint">
    <Hotbar.Content class="flex">
        <Hotbar.Item onclick={()=>{map.setMode("select")}} value="select"><Pointer/></Hotbar.Item>
        <Hotbar.Item onclick={()=>{map.setMode("brush")}} value="paint"><Paintbrush/></Hotbar.Item>
        <Hotbar.Item onclick={()=>{map.setMode("erase")}} value="erase"><Eraser/></Hotbar.Item>
    </Hotbar.Content>
</Hotbar.Root>
