<script lang="ts">
    import { onMount } from "svelte";
    import photo_booth from "$lib/assets/photo_booth.jpg";
    import gioia1 from "$lib/assets/gioia1.png";
    import gioia2 from "$lib/assets/gioia2.png";
    import { Button } from "$lib/components/ui/button";

    let days = $state<number | null>(null);
    let hours = $state<number | null>(null);
    let minutes = $state<number | null>(null);
    let seconds = $state<number | null>(null);

    function formatCountdownPart(value: number | null) {
        return value === null ? "" : String(value).padStart(2, "0");
    }

    onMount(() => {
        const target = new Date(2027, 8, 17, 15, 0).getTime();

        function updateCountdown() {
            const secondsLeft = Math.max(
                0,
                Math.floor((target - Date.now()) / 1000),
            );
            days = Math.floor(secondsLeft / 86_400);
            hours = Math.floor((secondsLeft % 86_400) / 3_600);
            minutes = Math.floor((secondsLeft % 3_600) / 60);
            seconds = secondsLeft % 60;
        }

        updateCountdown();
        const interval = window.setInterval(updateCountdown, 1000);

        return () => window.clearInterval(interval);
    });
</script>

<div>
    <h1>WE WARMLY INVITE YOU TO</h1>
    <h2>Our Wedding</h2>

    <p>17. September 2027</p>
    <p>bi dinere Mueter dehei</p>
</div>

<div>
    <div class="grid grid-cols-7 max-w-2xl mx-auto">
        <h1>{formatCountdownPart(days)}</h1>
        <h1>:</h1>
        <h1>{formatCountdownPart(hours)}</h1>
        <h1>:</h1>
        <h1>{formatCountdownPart(minutes)}</h1>
        <h1>:</h1>
        <h1>{formatCountdownPart(seconds)}</h1>
    </div>
    <div class="grid grid-cols-7 max-w-2xl mx-auto">
        <p>Tage</p>
        <p></p>
        <p>Stunden</p>
        <p></p>
        <p>Minuten</p>
        <p></p>
        <p>Sekunden</p>
    </div>
</div>

<div>
    <figure
        class="relative mx-auto aspect-[0.68] w-full max-w-md"
        aria-label="Save-the-date, Einladung und Fotostreifen"
    >
        <img
            class="absolute left-[8%] top-0 w-[88%] rotate-[-8deg] shadow-xl"
            src={gioia1}
            alt="Save-the-date Karte"
        />
        <img
            class="absolute left-[10%] top-[40%] w-[84%] rotate-1 shadow-xl"
            src={gioia2}
            alt="Hochzeitseinladung"
        />
        <img
            class="absolute left-[3%] top-[49%] z-10 w-[18%] rotate-[-11deg] shadow-xl"
            src={photo_booth}
            alt="Fotostreifen mit Bildern von Matthias und Gioia"
        />
    </figure>
</div>

<div>
    <Button href="/2/mail" variant="outline">Anmelden</Button>
</div>
