<script lang="ts">
    import CalendarPlus from "@lucide/svelte/icons/calendar-plus";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "./ui/button";
    import CalendarHeart from "@lucide/svelte/icons/calendar-heart";
    import Download from "@lucide/svelte/icons/file-down";
    import Link from "@lucide/svelte/icons/square-arrow-out-up-right";

    type CalendarEvent = {
        title: string;
        description?: string;
        location?: string;
        /** YYYY-MM-DD */
        startDate: string;
        /** HH:mm, omit for an all-day event */
        startTime?: string;
        /** YYYY-MM-DD, defaults to startDate */
        endDate?: string;
        /** HH:mm */
        endTime?: string;
        /** IANA time zone, e.g. "Europe/Zurich". Ignored for all-day events. */
        timeZone?: string;
    };

    let { event }: { event: CalendarEvent } = $props();
    const timeZone = $derived(event.timeZone ?? "Europe/Zurich");

    const isAllDay = $derived(!event.startTime);

    // Offset (ms) between UTC and the given IANA time zone at a specific instant.
    function tzOffset(timeZone: string, date: Date) {
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone,
            hourCycle: "h23",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
            .formatToParts(date)
            .reduce<Record<string, string>>((acc, part) => {
                acc[part.type] = part.value;
                return acc;
            }, {});

        const asUtc = Date.UTC(
            Number(parts.year),
            Number(parts.month) - 1,
            Number(parts.day),
            Number(parts.hour),
            Number(parts.minute),
            Number(parts.second),
        );
        return asUtc - date.getTime();
    }

    // Converts a wall-clock date/time in `timeZone` to the equivalent UTC instant.
    function toUtcDate(dateStr: string, timeStr: string, timeZone?: string) {
        const [year, month, day] = dateStr.split("-").map(Number);
        const [hour, minute] = timeStr.split(":").map(Number);
        const guess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
        if (!timeZone) return guess;
        return new Date(guess.getTime() - tzOffset(timeZone, guess));
    }

    function pad(n: number) {
        return n.toString().padStart(2, "0");
    }

    function formatUtc(date: Date) {
        return (
            `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
            `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
        );
    }

    function formatDateOnly(dateStr: string) {
        return dateStr.replace(/-/g, "");
    }

    // exclusive end date for all-day ranges, per the iCal/Google spec
    function nextDay(dateStr: string) {
        const [year, month, day] = dateStr.split("-").map(Number);
        const date = new Date(Date.UTC(year, month - 1, day + 1));
        return formatDateOnly(date.toISOString().slice(0, 10));
    }

    function getRange() {
        const endDate = event.endDate ?? event.startDate;

        if (isAllDay) {
            return {
                start: formatDateOnly(event.startDate),
                end: nextDay(endDate),
            };
        }

        const start = toUtcDate(event.startDate, event.startTime!, timeZone);
        const end = toUtcDate(
            endDate,
            event.endTime ?? event.startTime!,
            timeZone,
        );
        return { start: formatUtc(start), end: formatUtc(end) };
    }

    function googleUrl() {
        const { start, end } = getRange();
        const params = new URLSearchParams({
            action: "TEMPLATE",
            text: event.title,
            dates: `${start}/${end}`,
        });
        if (event.description) params.set("details", event.description);
        if (event.location) params.set("location", event.location);
        if (!isAllDay) params.set("ctz", timeZone);
        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    function officeUrl(host: "outlook.live.com" | "outlook.office.com") {
        const endDate = event.endDate ?? event.startDate;
        const start = isAllDay
            ? `${event.startDate}T00:00:00`
            : toUtcDate(
                  event.startDate,
                  event.startTime!,
                  timeZone,
              ).toISOString();
        const end = isAllDay
            ? `${nextDay(endDate).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")}T00:00:00`
            : toUtcDate(
                  endDate,
                  event.endTime ?? event.startTime!,
                  timeZone,
              ).toISOString();

        const params = new URLSearchParams({
            path: "/calendar/action/compose",
            rru: "addevent",
            subject: event.title,
            startdt: start,
            enddt: end,
            allday: String(isAllDay),
        });
        if (event.description) params.set("body", event.description);
        if (event.location) params.set("location", event.location);
        return `https://${host}/calendar/0/deeplink/compose?${params.toString()}`;
    }

    function yahooUrl() {
        const { start, end } = getRange();
        const params = new URLSearchParams({
            v: "60",
            title: event.title,
            st: start,
            et: end,
        });
        if (isAllDay) params.set("dur", "allday");
        if (event.description) params.set("desc", event.description);
        if (event.location) params.set("in_loc", event.location);
        return `https://calendar.yahoo.com/?${params.toString()}`;
    }

    function icsContent() {
        const { start, end } = getRange();
        const dateKey = isAllDay ? "VALUE=DATE:" : ":";
        const lines = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//add-to-calendar//svelte//EN",
            "BEGIN:VEVENT",
            `UID:${crypto.randomUUID()}`,
            `DTSTAMP:${formatUtc(new Date())}`,
            `DTSTART${dateKey}${start}`,
            `DTEND${dateKey}${end}`,
            `SUMMARY:${event.title}`,
        ];
        if (event.description) lines.push(`DESCRIPTION:${event.description}`);
        if (event.location) lines.push(`LOCATION:${event.location}`);
        lines.push("END:VEVENT", "END:VCALENDAR");
        return lines.join("\r\n");
    }

    function downloadIcs() {
        const blob = new Blob([icsContent()], {
            type: "text/calendar;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${event.title}.ics`;
        link.click();
        URL.revokeObjectURL(url);
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
            <Button variant="outline" {...props}>
                <CalendarHeart />
                Datum speichern
            </Button>
        {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={downloadIcs}>
            <Download />
            Apple
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            {#snippet child({ props })}
                <a
                    {...props}
                    href={googleUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Link />
                    Google
                </a>
            {/snippet}
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            {#snippet child({ props })}
                <a
                    {...props}
                    href={officeUrl("outlook.live.com")}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Link />
                    Outlook
                </a>
            {/snippet}
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>
