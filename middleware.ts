import type { NextRequest } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
	const session = await getSession();
	const pathName = new URL(request.url).pathname;
	if (
		!session.userId &&
		pathName !== "/" &&
		!pathName.startsWith("/sign-up") &&
		!pathName.startsWith("/login")
	) {
		return Response.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};