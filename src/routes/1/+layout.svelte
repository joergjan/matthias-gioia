<script lang="ts">
	import "./../layout.css";
	import "./../typography.css";
	import favicon from "$lib/assets/favicon.svg";
	import moonshine from "$lib/assets/moonshine.jpg";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="fixed inset-0 -z-10 bg-white opacity-32 scale-110"></div>
<div class="fixed inset-0 -z-20 overflow-hidden h-fill w-fill">
	<img
		src={moonshine}
		alt=""
		class="h-full w-full scale-110 object-cover overflow-hidden blur-xs"
	/>
</div>

<div class="grid grid-cols-1 gap-12 px-3 py-12">
	{@render children()}
</div>
