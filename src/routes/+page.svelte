<script lang="ts">
    import stupid from "$lib/assets/stupid.mp4";
    import Volume2 from "@lucide/svelte/icons/volume-2";
    import AddToCalendarButton from "$lib/components/AddToCalendarButton.svelte";

    let videoElement: HTMLVideoElement;
    let soundEnabled = $state(false);

    function enableSound() {
        videoElement.muted = false;
        soundEnabled = true;
        void videoElement.play().catch(() => undefined);
    }
</script>

<br />
<p>17.09.2027</p>

<p>mir denn so a euem hochziit</p>

<div class="relative mx-auto flex items-center justify-center">
    <div>
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
        <div class="absolute top-10">
            <button
                type="button"
                class="rounded-md border inline-flex border-white/40 bg-black/60 px-3 py-2 text-white backdrop-blur-md"
                onclick={enableSound}
            >
                <Volume2 class="pr-1" /> Sound an
            </button>
        </div>
    {/if}
</div>

<div>
    <AddToCalendarButton
        event={{
            title: "Hochzeit Matthias & Gioia",
            startDate: "2026-09-17",
            startTime: "15:00",
            endDate: "2027-09-17",
            endTime: "23:15",
            description:
                "Endlich isch es sowiit - mir chönd üses Hochziit mit dir zeme fiire!",
        }}
    />
</div>
