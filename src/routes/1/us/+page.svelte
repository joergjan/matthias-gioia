<script lang="ts">
    import linda_jan from "$lib/assets/linda_jan.jpg";
    import matthias from "$lib/assets/matthias.jpg";

    import * as Card from "$lib/components/ui/card/index.js";
</script>

<div class="mx-auto w-fit pb-16">
    <Card.Root
        class="relative z-10 h-56 w-48 -rotate-6 overflow-hidden p-0 shadow-xl"
    >
        <img
            src={linda_jan}
            alt="Matthias und Gioia"
            class="h-full w-full object-cover"
        />
    </Card.Root>
    <Card.Root
        class="relative z-20 -mt-28 ml-24 h-56 w-48 rotate-3 overflow-hidden p-0 shadow-xl"
    >
        <img
            src={matthias}
            alt="Matthias und Gioia"
            class="h-full w-full object-cover"
        />
    </Card.Root>
    <Card.Root
        class="relative z-30 -mt-28 ml-48 h-56 w-48 -rotate-2 overflow-hidden p-0 shadow-xl"
    >
        <img
            src={linda_jan}
            alt="Matthias und Gioia"
            class="h-full w-full object-cover"
        />
    </Card.Root>
</div>
