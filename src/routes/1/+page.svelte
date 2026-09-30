<script lang="ts">
    import AddToCalendarButton from "$lib/components/AddToCalendarButton.svelte";
    import Heart from "@lucide/svelte/icons/heart";
</script>

<div class="grid items-center justify-center mx-auto">
    <h2 class="inline-flex justify-center items-center">
        Wir heiraten<Heart class="h-4" />
    </h2>

    <p class="inline-flex justify-center items-center">
        Du bist herzlich zu unserem Hochzeit eingeladen
    </p>

    <div>
        <AddToCalendarButton
            event={{
                title: "Hochzeit Matthias & Gioia",
                startDate: "2026-09-17",
                startTime: "15:00",
                endDate: "2026-09-17",
                endTime: "23:15",
                description:
                    "Endlich isch es sowiit - mir chönd üses Hochziit mit dir zeme fiire!",
            }}
        />
    </div>
</div>
