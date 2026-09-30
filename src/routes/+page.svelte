<script lang="ts">
    import stupid from "$lib/assets/stupid.mp4";
    import Volume2 from "@lucide/svelte/icons/volume-2";

    let videoElement: HTMLVideoElement;
    let soundEnabled = $state(false);

    function enableSound() {
        videoElement.muted = false;
        soundEnabled = true;
        void videoElement.play().catch(() => undefined);
    }
</script>

<br /><br />
<p>mir denn so a euem hochziit</p>
<div class="mx-auto flex items-center justify-center">
    <video
        id="vid"
        bind:this={videoElement}
        class="h-108 m-5"
        src={stupid}
        autoplay
        muted
        playsinline
        loop
    ></video>
</div>
{#if !soundEnabled}
    <button
        type="button"
        class="rounded-md border inline-flex border-white/40 bg-black/60 px-3 py-2 text-white backdrop-blur-md"
        onclick={enableSound}
    >
        <Volume2 class="pr-1" /> Sound an
    </button>
{/if}
