<script lang="ts">
    import linda_jan from "$lib/assets/linda_jan.jpg";
    import matthias from "$lib/assets/matthias.jpg";

    import * as Card from "$lib/components/ui/card/index.js";

    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
</script>

<div>
    <div class="flex w-max space-x-4">
        <figure class="shrink-0">
            <Card.Root class="h-96 w-48 overflow-hidden p-0 shadow-xl">
                <img
                    src={linda_jan}
                    alt="Matthias und Gioia"
                    class="h-full w-full object-cover"
                />
            </Card.Root>

            <figcaption class="pt-2 text-xs text-muted-foreground">
                das sind
                <span class="font-semibold text-foreground">
                    Linda und Jan
                </span>
            </figcaption>
        </figure>
        <figure class="shrink-0">
            <Card.Root class="h-96 w-48 overflow-hidden p-0 shadow-xl">
                <img
                    src={matthias}
                    alt="Matthias und Gioia"
                    class="h-full w-full object-cover"
                />
            </Card.Root>

            <figcaption class="pt-2 text-xs text-muted-foreground">
                De
                <span class="font-semibold text-foreground"> Matthias </span>
                aber chli creepy
            </figcaption>
        </figure>
        <figure class="shrink-0">
            <Card.Root class="h-96 w-48 overflow-hidden p-0 shadow-xl">
                <img
                    src={linda_jan}
                    alt="Matthias und Gioia"
                    class="h-full w-full object-cover"
                />
            </Card.Root>

            <figcaption class="pt-2 text-xs text-muted-foreground">
                das sind imfall au
                <span class="font-semibold text-foreground">
                    Linda und Jan
                </span>
            </figcaption>
        </figure>
    </div>
</div>
