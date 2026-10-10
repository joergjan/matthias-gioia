<script lang="ts">
    import { enhance } from "$app/forms";

    import * as Card from "$lib/components/ui/card";
    import * as Field from "$lib/components/ui/field";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";

    let { form } = $props();
</script>

<Card.Root class="mx-auto w-full max-w-sm">
    <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description
            >Gib das Passwort ein, um die Einladung anzusehen.</Card.Description
        >
    </Card.Header>
    <Card.Content>
        <form method="POST" use:enhance>
            <Field.Group>
                <Field.Field data-invalid={form?.message ? true : undefined}>
                    <Field.Label for="password">Passwort</Field.Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        aria-invalid={form?.message ? true : undefined}
                    />
                    {#if form?.message}
                        <Field.Error>{form.message}</Field.Error>
                    {/if}
                </Field.Field>
                <Button type="submit" variant="default" class="w-full">
                    Weiter
                </Button>
            </Field.Group>
        </form>
    </Card.Content>
</Card.Root>
