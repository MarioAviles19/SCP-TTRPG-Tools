<script lang=ts>
	import { DungeonMap } from "$lib/MapTools/dungeonMap";
	import { onMount } from "svelte";

    let canvas = $state<HTMLCanvasElement>()
    let map : DungeonMap
    onMount(()=>{
        if(canvas){
            map = new DungeonMap(canvas)
            map.animate()
        }
    })

</script>

<div class="w-full h-full flex items-center justify-center">
    <canvas class="w-full h-[95svh]" bind:this={canvas}></canvas>
</div>



