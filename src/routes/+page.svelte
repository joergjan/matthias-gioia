<script lang="ts">
    import photo_booth_1 from "$lib/assets/photo_booth_1.jpg";
    import photo_booth_2 from "$lib/assets/photo_booth_2.jpg";
    import photo_booth_3 from "$lib/assets/photo_booth_3.jpg";
    import printer from "$lib/assets/printer.wav";
    import { onMount } from "svelte";
    import AddToCalendarButton from "$lib/components/AddToCalendarButton.svelte";
    import Heart from "@lucide/svelte/icons/heart";
    import * as Item from "$lib/components/ui/item/index.js";
    import * as Card from "$lib/components/ui/card/index.js";

    onMount(() => {
        const audio = new Audio(printer);
        audio.play().catch(() => {});
        return () => audio.pause();
    });
</script>

<figure class="picture-frame">
    <div class="frame-bevel">
        <div class="frame-mat">
            <div class="walls">
                <span class="wall wall-top"></span>
                <span class="wall wall-right"></span>
                <span class="wall wall-bottom"></span>
            </div>
            <div class="floor-back"></div>
            <div class="slot"></div>
            <div class="frame-floor">
                <div class="photo-booth">
                    <img src={photo_booth_1} alt="Gioia und Matthias, Foto 1" />
                    <img src={photo_booth_2} alt="Gioia und Matthias, Foto 2" />
                    <img src={photo_booth_3} alt="Gioia und Matthias, Foto 3" />
                </div>
            </div>
        </div>
    </div>
</figure>

<div>
    <div>
        <h1>SAVE THE</h1>
        <h2 class="inline-flex justify-center items-center">
            <Heart class="h-4 mr-1" />Date<Heart class="h-4 ml-1" />
        </h2>
    </div>
    <div class="pt-3">
        <p>17.09.2026</p>

        <div class="pt-2">
            <AddToCalendarButton
                event={{
                    title: "Hochzeit Gioia & Matthias",
                    startDate: "2026-09-17",
                    startTime: "10:00",
                    endDate: "2027-09-18",
                    endTime: "12:00",
                    location:
                        "Reblaus Bahlingen, Am Silberbrunnen 4, 79353 Bahlingen am Kaiserstuhl, Deutschland",
                    description: "Save the Date – Einladung folgt.",
                }}
            />
        </div>
    </div>
</div>

<div>
    <h1>FEIER MIT</h1>
    <h2 class="inline-flex justify-center items-center">
        <Heart class="h-4 mr-1" />Uns<Heart class="h-4 ml-1" />
    </h2>
    <div class="pt-3">
        <p>Reblaus Bahlingen</p>
        <p>Am Silberbrunnen 4</p>
        <p>79353 Bahlingen am Kaiserstuhl</p>
    </div>
</div>

<div class="items-center justify-center flex">
    <Card.Root class="max-w-xl">
        <Card.Content>
            <Card.Title>Übernachtung</Card.Title>
            <Card.Description
                >Für alle, die gerne in der Nähe übernachten möchten, teilen wir
                zu einem späteren Zeitpunkt noch einige Hotelempfehlungen mit
                euch.
            </Card.Description>
        </Card.Content>
    </Card.Root>
</div>

<style>
    /* outer dark chrome rim */
    .picture-frame {
        width: clamp(12rem, 34vw, 17rem);
        aspect-ratio: 0.5;
        margin: 0.5rem auto 0;
        padding: 0.85rem;
        transform: rotate(-2deg);
        background: linear-gradient(
            105deg,
            #181918 0%,
            #555650 8%,
            #262725 15%,
            #77766e 21%,
            #272825 29%,
            #111211 48%,
            #77766e 68%,
            #292a27 79%,
            #141514 100%
        );
        box-shadow:
            0 1.2rem 2rem rgb(0 0 0 / 35%),
            0 0.25rem 0.4rem rgb(0 0 0 / 25%),
            inset 1px 1px 2px rgb(255 255 255 / 55%),
            inset -2px -2px 4px rgb(0 0 0 / 80%);
    }

    .frame-bevel {
        display: flex;
        width: 100%;
        height: 100%;
        padding: 0.45rem;
        background: linear-gradient(
            100deg,
            #252622,
            #b4b1a6 8%,
            #55564f 14%,
            #d0ccc0 19%,
            #77766d 24%,
            #393a35 31%,
            #aaa79c 53%,
            #4a4b46 70%,
            #c4c0b4 84%,
            #32332f 100%
        );
        box-shadow:
            inset 0 0 0 1px rgb(0 0 0 / 75%),
            inset 0 0 0 3px rgb(255 255 255 / 28%),
            0 0 0 1px rgb(0 0 0 / 60%);
    }

    /* looking into the box: top, right and bottom walls are visible as thin
       strips, the left wall is hidden behind the rim */
    .frame-mat {
        --wall: 1.6rem;
        position: relative;
        isolation: isolate;
        flex: 1;
        overflow: hidden;
        padding: var(--wall) var(--wall) var(--wall) 0;
        background: #2a2b28;
        box-shadow:
            0 0 0 1px rgb(0 0 0 / 70%),
            0 0 0 3px rgb(255 255 255 / 18%);
    }

    /* blur on a wrapper, since clip-path is applied after filter */
    .walls {
        position: absolute;
        z-index: 0;
        inset: 0;
        filter: blur(3px);
    }

    .wall {
        position: absolute;
        inset: 0;
    }

    .wall-top {
        clip-path: polygon(
            0 0,
            100% 0,
            calc(100% - var(--wall)) var(--wall),
            0 var(--wall)
        );
        background: linear-gradient(90deg, #0e0f0e, #262725);
    }

    .wall-right {
        clip-path: polygon(
            100% 0,
            100% 100%,
            calc(100% - var(--wall)) calc(100% - var(--wall)),
            calc(100% - var(--wall)) var(--wall)
        );
        background: linear-gradient(180deg, #55564f, #8e8b80);
    }

    .wall-bottom {
        clip-path: polygon(
            0 100%,
            100% 100%,
            calc(100% - var(--wall)) calc(100% - var(--wall)),
            0 calc(100% - var(--wall))
        );
        background: linear-gradient(90deg, #cfccc0, #ebe8dc);
    }

    /* back panel: brushed grey metal, strip emerges from under the top wall */
    /* blurred on its own so the seam to the side walls is soft but the strip stays sharp */
    .floor-back {
        position: absolute;
        z-index: 1;
        inset: var(--wall) var(--wall) var(--wall) 0;
        filter: blur(3px);
        background: repeating-linear-gradient(
                0deg,
                rgb(255 255 255 / 5%) 0 1px,
                rgb(0 0 0 / 6%) 1px 2px
            ),
            linear-gradient(160deg, #7b7b76, #8d8d87 50%, #777771);
        box-shadow:
            inset 5px 6px 16px rgb(0 0 0 / 60%),
            inset -4px -4px 12px rgb(255 255 255 / 25%);
    }

    /* dark metal slot in the top wall */
    .slot {
        position: absolute;
        z-index: 2;
        top: calc(var(--wall) * -0.05);
        left: 50%;
        width: 62%;
        height: calc(var(--wall) * 0.6);
        transform: translateX(-50%);
        background: linear-gradient(
            105deg,
            #181918 0%,
            #555650 8%,
            #262725 15%,
            #77766e 21%,
            #272825 29%,
            #111211 48%,
            #77766e 68%,
            #292a27 79%,
            #141514 100%
        );
        box-shadow:
            0 1px 3px rgb(0 0 0 / 70%),
            inset 1px 1px 1px rgb(255 255 255 / 45%),
            inset -1px -1px 2px rgb(0 0 0 / 80%);
    }

    /* clips the strip at the slot, so it appears to come out of the top wall */
    .frame-floor {
        position: absolute;
        z-index: 3;
        overflow: hidden;
        inset: calc(var(--wall) * 0.3) 0 0 0;
    }

    .photo-booth {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 0.28rem;
        padding: 0.28rem 0.28rem 1.2rem;
        background: #f7f4e9;
        box-shadow: 0 0.3rem 0.55rem rgb(0 0 0 / 35%);
        transform: translate(-50%, -105%);
        animation: photo-slide-in 5.82s linear forwards;
    }

    .photo-booth img {
        display: block;
        width: 100%;
        aspect-ratio: 630 / 900;
        object-fit: cover;
        filter: grayscale(1);
    }

    @keyframes photo-slide-in {
        from {
            transform: translate(-50%, -105%);
        }

        to {
            transform: translate(-50%, 0);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .photo-booth {
            transform: translate(-50%, 0);
            animation: none;
        }
    }
</style>
