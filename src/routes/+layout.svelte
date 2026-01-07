<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import GlobalData from '$lib/Components/Globals/GlobalData.svelte';
	import Prompt from '$lib/Components/Prompt/Prompt.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Prompt/>
<GlobalData>
	{@render children()}
</GlobalData>
