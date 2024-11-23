"use server";

import { mailer } from "@lib/workloads/mailer";
import { tokensKV } from "@lib/workloads/redis";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthFormState } from "../_components/auth-form";
import { accountExists, createAccount } from "../_lib/account";
import { userCredentialsSchema } from "../_lib/user-credentials";

export async function signUp(prevState: AuthFormState, formData: FormData) {
	const data = Object.fromEntries(formData.entries());
	const validation = await schema.safeParseAsync(data);
	if (validation.success) {
		const tokenAndLink = await confirmationTokenAndLink();
		const user = await createAccount(validation.data.email, validation.data.password);
		await tokensKV.set(tokenAndLink.token, user.email);
		await sendConfirmationEmail(user.email, tokenAndLink.link);
		redirect("/thank-you");
	}
	return {
		errors: validation.error.format(),
		formData,
	} satisfies AuthFormState;
}

const schema = userCredentialsSchema.extend({
	email: userCredentialsSchema.shape.email.refine(async (val) => !(await accountExists(val)), {
		message: "An account with this email already exists.",
	}),
});

async function sendConfirmationEmail(email: string, link: string) {
	await mailer.client.sendMail({
		from: "no-reply@trellex-example.com",
		to: email,
		subject: "Thank you for subscribing to our newsletter!",
		text: `Hi there!

Confirm your email with this link:

${link}`,
	});
}

async function confirmationTokenAndLink() {
	const headersList = await headers();
	const host = headersList.get("x-forwarded-host");
	const proto = headersList.get("x-forwarded-proto");
	const uuid = randomUUID();
	return {
		token: uuid,
		link: `${proto}://${host}/confirm?token=${uuid}`,
	};
}
