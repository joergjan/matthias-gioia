<script lang="ts">
    let { children } = $props();
</script>

<div class="grid grid-cols-1 gap-12 px-3 py-12">
    {@render children()}
</div>
