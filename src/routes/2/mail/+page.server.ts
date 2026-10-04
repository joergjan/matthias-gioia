import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import {
    MG_SMTP_PASSWORD,
    MG_SMTP_PORT,
    MG_SMTP_SERVER,
    MG_SMTP_USERNAME
} from '$env/static/private';

const transporter = nodemailer.createTransport({
    host: MG_SMTP_SERVER,
    port: MG_SMTP_PORT,
    secure: false,
    auth: {
        user: MG_SMTP_USERNAME,
        pass: MG_SMTP_PASSWORD
    }
});

export const actions = {
    yeahJustInviteYourself: async ({ request }) => {
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
        const text = `${children}x Kleinkind\n${partner ? 'inkl. Partner - ' + firstNamePartner + ' ' + lastNamePartner : 'ohne Partner'}\nNachricht: ${message}\n${email}\n${firstName} ${lastName} \n${street}\n${postcode} ${city}`

        await sendMail(subject, text, undefined, receiver)


        return { success: true, message: 'Wir haben deine Anmeldung erhalten. Bis dann!' };
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