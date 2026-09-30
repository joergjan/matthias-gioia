import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import {
    TH_SMTP_PASSWORD,
    TH_SMTP_PORT,
    TH_SMTP_SERVER,
    TH_SMTP_USERNAME
} from '$env/static/private';

const transporter = nodemailer.createTransport({
    host: TH_SMTP_SERVER,
    port: TH_SMTP_PORT,
    secure: false,
    auth: {
        user: TH_SMTP_USERNAME,
        pass: TH_SMTP_PASSWORD
    }
});

export const actions = {
    createOrder: async ({ request }) => {
        const formData: FormData = await request.formData();
        const firstName: string = String(formData.get('firstName') ?? '').trim();
        const lastName: string = String(formData.get('lastName') ?? '').trim();
        const email: string = String(formData.get('email') ?? '').trim();
        const receiver: string = String(formData.get('receiver') ?? '').trim();
        const message: string = String(formData.get('message') ?? '').trim();
        const children: number = Number(formData.get('children') ?? '')
        const partner: boolean = Boolean(formData.get('partner') ?? false)
        const firstNamePartner: string = String(formData.get('firstNamePartner') ?? '').trim();
        const lastNamePartner: string = String(formData.get('lastNamePartner') ?? '').trim();
        const street: string = String(formData.get('street') ?? '').trim()
        const postcode: string = "8315"
        const city: string = "Lindau"

        if (!firstName || !lastName || !email || !street || !street || !postcode || !city) {
            return fail(400, { success: false, message: 'Bitte fülle alle Felder aus.' });
        }

        const subject = `Hochzeitsanmeldung von ${firstName} ${lastName}`
        const text = `${children}x Kleinkind\n\n${partner ? 'inkl. Partner' : 'ohne Partner'}\n\n\n${message}\n\n${email}\n${firstName} ${lastName} \n${street}\n${postcode} ${city}`

        await sendMail(subject, text, undefined, receiver)


        return { success: true, message: 'Deine Bestellung ist angekommen. Sobald wir einen Geldeingang erhalten haben, werden wir dir den Honig in den Briefkasten stellen.' };
    },
    askQuestion: async ({ request }) => {
        const formData = await request.formData();
        const firstName = String(formData.get('firstName') ?? '').trim();
        const lastName = String(formData.get('lastName') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const receiver = String(formData.get('receiver') ?? '').trim();
        const message = String(formData.get('message') ?? '').trim();



        if (!firstName || !lastName || !email || !message) {
            return fail(400, { success: false, message: 'Bitte fülle alle Felder aus.' });
        }

        const subject = `Anfrage von ${firstName} ${lastName}`
        const text = `${message}\n\nAntworten an: ${email}`

        await sendMail(subject, text, undefined, receiver)

        return { success: true, message: 'Deine Bestellung ist angekommen. Sobald wir einen Geldeingang erhalten haben, werden wir dir den Honig in den Briefkasten stellen.' };
    },
};

async function sendMail(subject: String, text: String, replyTo?: String, to?: String) {
    await transporter.sendMail({
        from: 'no-reply@jan-joerg.ch',
        to: to ? to : 'jan.joerg@proton.me',
        replyTo: replyTo ? replyTo : 'jan.joerg@proton.me',
        subject,
        text
    });
}