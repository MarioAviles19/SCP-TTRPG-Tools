<script lang=ts>

    type props = {
        value? : string,
        options? : any[],
        placeholder? : string,
        oninput? : (ev : Event)=>void,
        onselect? : (selection : any)=>void
    }
    let {value = $bindable(""), options = $bindable<({text : string} & any)[]>([]), placeholder, oninput, onselect, ...restProps} : props = $props()
    let optionsOpen = $derived(options.length > 0 && value.length > 0)

</script>

<div {...restProps}>
    <div class="relative w-full">
        <input oninput={(ev)=>{oninput?.(ev)}} bind:value={value} placeholder={placeholder} type="text" class="w-full input rounded-b-none">
        {#if optionsOpen}
            <div class="absolute top-full left-0 w-full bg-input z-50 border-border border">
                {#each options as option}
                    <button onclick={()=>{onselect?.(option)}} class="w-full block text-left p-1 focus:bg-card-foreground/20 hover:bg-card-foreground/20" type="button">{option.text}</button>
                {/each}
            </div>
        {/if}
    </div>
</div>
