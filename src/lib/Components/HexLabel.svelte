<script lang=ts>
    import Hexagon from "./Hexagon.svelte";

    let { value, ...restProps } = $props()
</script>

<div class="relative flex justify-center items-center aspect-square">
        <Hexagon {...restProps}/>
    <p class="absolute min-w-[6em] bottom-0 font-bold bg-white shadow-lg p-0.5 border-2 border-black text-center">{value}</p>
    
</div>