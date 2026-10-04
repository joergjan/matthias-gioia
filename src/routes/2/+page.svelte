<script lang="ts">
    import photo_booth from "$lib/assets/photo_booth.jpg";
    import { Button } from "$lib/components/ui/button";
</script>

<div>
    <h1>WE ARE GETTING</h1>
    <h2>Married</h2>
</div>

<figure class="picture-frame">
    <div class="frame-bevel">
        <div class="frame-mat">
            <img
                class="photo-booth"
                src={photo_booth}
                alt="Fotostreifen mit drei Bildern"
            />
        </div>
    </div>
</figure>

<div>
    <h1>SAVE THE</h1>
    <h2>Date</h2>
</div>

<div>
    <Button variant="outline" href="/2/invitation">Einladung öffnen</Button>
</div>

<style>
    .picture-frame {
        width: clamp(12rem, 34vw, 17rem);
        aspect-ratio: 0.45;
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

    .frame-mat {
        position: relative;
        overflow: hidden;
        flex: 1;
        border: 1px solid rgb(50 49 44 / 75%);
        background: linear-gradient(
                to bottom,
                transparent 0 91%,
                rgb(226 222 210 / 70%) 96%,
                rgb(132 128 117 / 65%) 100%
            ),
            linear-gradient(145deg, #858278, #aaa596 48%, #938f83);
        box-shadow:
            inset 2px 2px 7px rgb(0 0 0 / 35%),
            inset -2px -2px 5px rgb(255 255 255 / 45%),
            0 0 0 2px rgb(255 255 255 / 35%);
    }

    .photo-booth {
        position: absolute;
        top: -0.5rem;
        left: 50%;
        width: 50%;
        height: 78%;
        padding: 0.28rem 0.28rem 0.65rem;
        background: #f7f4e9;
        box-shadow: 0 0.3rem 0.55rem rgb(0 0 0 / 35%);
        object-fit: cover;
        transform: translate(-50%, -105%);
        animation: photo-slide-in 2.8s steps(6, end) 0.35s forwards;
    }

    @keyframes photo-slide-in {
        0%,
        10% {
            transform: translate(-50%, -105%);
        }

        32% {
            transform: translate(-50%, -70%);
        }

        48% {
            transform: translate(-50%, -70%);
        }

        70% {
            transform: translate(-50%, -32%);
        }

        84% {
            transform: translate(-50%, -32%);
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
