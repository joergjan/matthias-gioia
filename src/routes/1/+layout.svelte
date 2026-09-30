<script lang="ts">
	import "./../layout.css";
	import "./../typography.css";
	import favicon from "$lib/assets/favicon.svg";
	import moonshine from "$lib/assets/moonshine.jpg";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="fixed inset-0 -z-20 bg-black"></div>
<div class="fixed inset-0 -z-10 overflow-hidden h-full w-full">
	<img
		src={moonshine}
		alt=""
		class="h-full w-full scale-110 object-cover opacity-75 blur-xs"
	/>
</div>

<h1>Gioia und Matthias</h1>
<h2>17.09.2027</h2>

<div class="mx-auto flex max-w-4xl items-center justify-between p-4 lg:px-8">
	<h2>
		<a href="/1/us">Wir</a>
	</h2>

	<svg
		viewBox="0 0 24 12"
		class="h-3 w-6 self-center text-current"
		aria-hidden="true"
	>
		<path
			d="M1,6 C4,1 8,11 12,6 C16,1 20,11 23,6"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	</svg>

	<h2>
		<a href="/1/">Einladung</a>
	</h2>

	<svg
		viewBox="0 0 24 12"
		class="h-3 w-6 self-center text-current"
		aria-hidden="true"
	>
		<path
			d="M1,6 C4,1 8,11 12,6 C16,1 20,11 23,6"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	</svg>

	<h2>
		<a href="/1/location">Location</a>
	</h2>

	<svg
		viewBox="0 0 24 12"
		class="h-3 w-6 self-center text-current"
		aria-hidden="true"
	>
		<path
			d="M1,6 C4,1 8,11 12,6 C16,1 20,11 23,6"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	</svg>

	<h2>
		<a href="/1/rsvp">RSVP</a>
	</h2>
</div>

<div class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
	{@render children()}
</div>
