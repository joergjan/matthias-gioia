<script lang="ts">
    import PartyPopper from "@lucide/svelte/icons/party-popper";
    import DollarSign from "@lucide/svelte/icons/dollar-sign";
    import TriangleAlert from "@lucide/svelte/icons/triangle-alert";
    import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
    import { enhance } from "$app/forms";
    import { slide } from "svelte/transition";
    import { Input } from "$lib/components/ui/input/index.js";
    import { turnstile } from "@svelte-put/cloudflare-turnstile";
    import * as Item from "$lib/components/ui/item/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { PUBLIC_MG_CLOUDFLARE_TURNSTILE_SITE_KEY } from "$env/static/public";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Field from "$lib/components/ui/field/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";

    let token = $state("");
    $inspect(token);

    const id = $props.id();

    let loading: boolean = $state(false);
    let showResultMessage: boolean = $state(false);
    let resultMessage: string = $state("");
    let messageType: "success" | "error" = $state("success");

    let email = $state("");
    let firstName = $state("");
    let partner = $state(false);

    const isEmailValid = (mail: string) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(mail).toLowerCase(),
        );
    };

    const children = [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
    ];

    let childrenValue = $state("");
</script>

<form
    action="?/yeahJustInviteYourself"
    method="POST"
    hidden={loading || showResultMessage}
    use:enhance={({ controller }) => {
        loading = true;
        const timeout = setTimeout(() => controller.abort(), 10_000);

        return async ({ result }) => {
            clearTimeout(timeout);
            showResultMessage = true;

            if (controller.signal.aborted) {
                resultMessage =
                    "Die Anfrage hat zu lange gedauert und wurde abgebrochen.";
                messageType = "error";
            } else if (result.type === "success" || result.type === "failure") {
                const data = result.data as
                    | { success?: boolean; message?: string }
                    | undefined;
                resultMessage =
                    data?.message ??
                    "Die Anfrage konnte nicht gesendet werden.";
                messageType = data?.success ? "success" : "error";
            } else {
                resultMessage = "Die Anfrage konnte nicht gesendet werden.";
                messageType = "error";
            }

            loading = false;
        };
    }}
>
    <Field.Group>
        <Field.Set>
            <Field.Legend>Anmelden</Field.Legend>

            <Field.Description>melde dich für's Hochzeit an</Field.Description>
            <Field.Group>
                <div class="grid grid-cols-2 gap-4">
                    <Field.Field>
                        <Field.Label for="firstName-{id}">Vorname</Field.Label>

                        <Input
                            bind:value={firstName}
                            type="text"
                            id="firstName-{id}"
                            name="firstName"
                            placeholder="Max"
                            required
                        />
                    </Field.Field>

                    <Field.Field>
                        <Field.Label for="lastName-{id}">Nachname</Field.Label>

                        <Input
                            type="text"
                            id="lastName-{id}"
                            name="lastName"
                            placeholder="Muster"
                            required
                        />
                    </Field.Field>
                </div>

                <Field.Field
                    data-invalid={email === "" ? false : !isEmailValid(email)}
                >
                    <Field.Label for="email-{id}">Email</Field.Label>

                    <Input
                        bind:value={email}
                        type="email"
                        id="email-{id}"
                        name="email"
                        placeholder="gioia.heim@justmarried.ch"
                        aria-invalid={email === ""
                            ? false
                            : !isEmailValid(email)}
                        required
                    />
                    {#if email === "" ? false : !isEmailValid(email)}
                        <div transition:slide={{ duration: 200 }}>
                            <Field.Error>
                                Gib eine gültige Email Adresse ein.
                            </Field.Error>
                        </div>
                    {/if}
                </Field.Field>

                <Field.Field>
                    <Field.Label for="receiver-{id}">
                        Empfänger Email Adresse (nur Testzwecke)
                    </Field.Label>

                    <Input
                        type="email"
                        required
                        id="receiver-{id}"
                        name="receiver"
                        placeholder="matthias.lerch@justmarried.ch"
                    />
                </Field.Field>
            </Field.Group>
            <Field.Separator />
            <Field.Group>
                <Field.Field>
                    <Field.Label for="street-{id}">Strasse</Field.Label>

                    <Input
                        type="street"
                        id="street-{id}"
                        name="street"
                        placeholder="Musterstrasse 15"
                        required
                    />
                </Field.Field>

                <div class="grid grid-cols-3 gap-4">
                    <Field.Field class="col-span-1">
                        <Field.Label for="postcode-{id}">PLZ</Field.Label>

                        <Input
                            type="postcode"
                            id="postcode-{id}"
                            name="postcode"
                            placeholder="8315"
                            required
                        />
                    </Field.Field>
                    <Field.Field class="col-span-2">
                        <Field.Label for="city-{id}">Ort</Field.Label>
                        <Input
                            type="city"
                            id="city-{id}"
                            name="city"
                            placeholder="Lindau"
                            required
                        />
                    </Field.Field>
                </div>
            </Field.Group>

            <Field.Separator />

            <Field.Group>
                <Field.Field orientation="horizontal">
                    <Checkbox
                        bind:checked={partner}
                        id="partner-{id}"
                        name="partner"
                    />
                    <Field.Content>
                        <Field.Label for="terms-checkbox-2"
                            >Kommt dein Partner/deine
                            Partnerin/es/you/youere/eruiopghqp ebenfalls?</Field.Label
                        >
                    </Field.Content>
                </Field.Field>

                <div class="grid grid-cols-2 gap-4">
                    <Field.Field>
                        <Field.Label for="firstNamePartner-{id}"
                            >Vorname deines Partners</Field.Label
                        >

                        <Input
                            type="text"
                            id="firstNamePartner-{id}"
                            name="firstNamePartner"
                            placeholder="Max"
                            required={partner}
                            disabled={!partner}
                        />
                    </Field.Field>

                    <Field.Field>
                        <Field.Label for="lastNamePartner-{id}"
                            >Nachname deines Partners</Field.Label
                        >

                        <Input
                            type="text"
                            id="lastNamePartner-{id}"
                            name="lastNamePartner"
                            placeholder="Muster"
                            required={partner}
                            disabled={!partner}
                        />
                    </Field.Field>
                </div>
            </Field.Group>

            <Field.Group>
                <div class="grid sm:grid-cols-2 grid-cols-1 gap-4">
                    <Field.Field>
                        <Field.Label for="amountSmallGlasses-{id}">
                            Meine (Klein-)Kinder sind ebenfalls dabei
                        </Field.Label>

                        <Select.Root
                            type="single"
                            name="children"
                            items={children}
                            bind:value={childrenValue}
                        >
                            <Select.Trigger class="w-full max-w-48">
                                <Select.Value placeholder="Anzahl Kinder" />
                            </Select.Trigger>
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>Anzahl Kinder</Select.Label>
                                    {#each children as child (child.value)}
                                        <Select.Item
                                            value={child.value}
                                            label={child.label}
                                        >
                                            {child.label}
                                        </Select.Item>
                                    {/each}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </Field.Field>
                </div>
            </Field.Group>
            <Field.Separator />
            <Field.Group>
                <Field.Field>
                    <Field.Label for="message-{id}">
                        Hinterlasse uns eine Nachricht
                    </Field.Label>

                    <Textarea
                        id="message-{id}"
                        name="message"
                        placeholder="Ich freue mich jetzt bereits auf das Hochzeit! "
                        rows={4}
                    />
                </Field.Field>
            </Field.Group>
            <Field.Separator />
            <Field.Group>
                <Field.Field>
                    <div class="flex w-full flex-col">
                        <div
                            use:turnstile
                            turnstile-sitekey={PUBLIC_MG_CLOUDFLARE_TURNSTILE_SITE_KEY}
                            turnstile-theme="auto"
                            turnstile-size="normal"
                            turnstile-language="en"
                            turnstile-response-field-name="turnstile"
                            turnstile-response-field
                            onturnstile={(e) => (token = e.detail.token)}
                        ></div>
                        <input type="hidden" name="turnstile" value={token} />
                    </div>
                </Field.Field>
            </Field.Group>

            <Field.Separator />

            <Field.Field orientation="responsive">
                <Button type="submit" class="mt-4">Anmeldung absenden</Button>
            </Field.Field>
        </Field.Set>
    </Field.Group>
</form>

{#if loading}
    <Item.Root variant="muted">
        <Item.Media>
            <Spinner />
        </Item.Media>
        <Item.Content>
            <Item.Title class="line-clamp-1">Taube fliegt los...</Item.Title>
        </Item.Content>
    </Item.Root>
{:else if showResultMessage}
    {#if messageType === "success"}
        <Item.Root variant="muted">
            <Item.Media>
                <PartyPopper />
            </Item.Media>
            <Item.Content>
                <Item.Title class="line-clamp-1"
                    >Die Taube ist angekommen!</Item.Title
                >
                <Item.Description>{resultMessage}</Item.Description>
            </Item.Content>
        </Item.Root>
    {:else}
        <Item.Root variant="muted">
            <Item.Media>
                <AlertCircleIcon />
            </Item.Media>
            <Item.Content>
                <Item.Title class="line-clamp-1"
                    >Die Taube hat sich leider verfolgen :(</Item.Title
                >
                <Item.Description>{resultMessage}</Item.Description>
            </Item.Content>
        </Item.Root>
    {/if}
{/if}
