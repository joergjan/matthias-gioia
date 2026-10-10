<script lang="ts">
    import type { Pathname } from "$app/types";
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { locales, localizeHref } from "$lib/paraglide/runtime.js";
    import "./layout.css";
    import "./typography.css";
    import { onMount } from "svelte";
    import Heart from "@lucide/svelte/icons/heart";
    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    import { injectAnalytics } from "@vercel/analytics/sveltekit";
    import { dev } from "$app/environment";

    let { children } = $props();

    // Leaving / drops access, so the password is asked on the next entry
    onMount(() => {
        const logout = () => navigator.sendBeacon("/logout");
        window.addEventListener("pagehide", logout);
        return () => {
            window.removeEventListener("pagehide", logout);
            logout();
        };
    });

    injectSpeedInsights();
    if (!dev) injectAnalytics({ mode: "production" });
</script>

<div class="grid grid-cols-1 gap-15 px-3 py-12">
    <div>
        <h1>WIR HEIRATEN</h1>
        <h2 class="inline-flex justify-center items-center">
            <Heart class="h-4 mr-1" />Gioia und Matthias <Heart
                class="h-4 ml-1"
            />
        </h2>
    </div>
    {@render children()}
</div>

<div style="display:none">
    {#each locales as locale (locale)}
        <a
            href={resolve(
                localizeHref(page.url.pathname, { locale }) as Pathname,
            )}>{locale}</a
        >
    {/each}
</div>
