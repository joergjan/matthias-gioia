<script lang="ts">
    import AddToCalendarButton from "$lib/components/AddToCalendarButton.svelte";
    import Heart from "@lucide/svelte/icons/heart";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

    import Us from "$lib/components/Us.svelte";
    import Mail from "$lib/components/Mail.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<h1>Gioia und Matthias</h1>

<div>
    <h2 class="inline-flex justify-center items-center">
        Wir heiraten<Heart class="h-4" />
    </h2>

    <p>& du bist herzlich eingeladen</p>
</div>

<div>
    <h2 class="inline-flex justify-center items-center">
        Wir<Heart class="h-4" />
    </h2>
    <ScrollArea class="w-fill h-fill" orientation="horizontal">
        <Us />
    </ScrollArea>
</div>

<div>
    <h2 class="inline-flex justify-center items-center">
        Wann?<Heart class="h-4" />
    </h2>

    <p>17.09.2026</p>

    <div class="pt-2">
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
</div>

<div>
    <h2 class="inline-flex justify-center items-center">
        Wo?<Heart class="h-4" />
    </h2>

    <p>Bi dinere Muetter</p>
    <p>Sie söll chüelschrank schomal afange fülle</p>
</div>

<div>
    <h2 class="inline-flex justify-center items-center">
        Anmeldung<Heart class="h-4" />
    </h2>
    <div class="flex h-fill w-fill items-center justify-center">
        <Button href="/1/rsvp" variant="outline">Melde dich an</Button>
    </div>
</div>
