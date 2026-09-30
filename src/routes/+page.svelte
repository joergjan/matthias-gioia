<script lang="ts">
    import { onMount } from "svelte";
    import stupid from "$lib/assets/stupid.mp4";
</script>

<br /><br />
<p>mir denn so a euem hochziit</p>
<div class="mx-auto flex items-center justify-center">
    <video
        id="vid"
        class="h-108 m-5"
        src={stupid}
        autoplay
        muted
        playsinline
        loop
    ></video>
</div>
