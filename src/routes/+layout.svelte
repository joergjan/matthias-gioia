<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import "./layout.css";
	import "./typography.css";

	let { children } = $props();
</script>

<Button href="/" variant="secondary">Hehehe</Button>
<Button href="/1" variant="secondary">Variante 1</Button>
<Button href="/2" variant="secondary">Variante 2</Button>

{@render children()}
