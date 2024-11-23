import "server-only";

import { getSession } from "@lib/session";
import { prisma } from "@lib/workloads/app-db";
import { redirect } from "next/navigation";
import { tokensKV } from "./workloads/redis";

export async function ensureUser() {
	const user = await sessionUser();
	if (user === undefined) {
		return redirect("/");
	}
	return user;
}

export async function ensureNoUser() {
	const user = await sessionUser();
	if (user !== undefined) {
		return redirect("/boards");
	}
	return;
}

async function sessionUser() {
	const session = await getSession();
	if (session.userId === undefined) {
		return;
	}
	const user = await prisma.account.findUnique({
		where: {
			id: session.userId,
		},
	});
	if (user === null) {
		return;
	}
	return user;
}

export async function confirmUser(token: string) {
	const email = await tokensKV.client.get(token);
	if (email === null) {
		return false;
	}
	await prisma.account.update({
		data: {
			confirmed: true,
		},
		where: {
			email,
		},
	});
	await tokensKV.client.del(token);
	return true;
}
