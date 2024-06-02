import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image.js";
import Link from "next/link.js";
import "./globals.css";
import { LoginIcon, LogoutIcon } from "./icons/icons";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userId = undefined;
	return (
		<html lang="en">
			<body className="h-screen bg-slate-100 text-slate-900">
				<div className="h-full flex flex-col min-h-0">
					<div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
						<Link href="/" className="block leading-3 w-1/3">
							<div className="font-black text-2xl text-white">Trellix</div>
							<div className="text-slate-500">a Next.js Demo</div>
						</Link>
						<div className="flex items-center gap-6">
							<IconLink
								href="https://github.com/remix-run/example-trellix"
								label="Source"
								icon="/github-mark-white.png"
							/>
						</div>
						<div className="w-1/3 flex justify-end">
							{userId ? (
								<form method="post" action="/logout">
									<button className="block text-center">
										<LogoutIcon />
										<br />
										<span className="text-slate-500 text-xs uppercase font-bold">
											Log out
										</span>
									</button>
								</form>
							) : (
								<Link href="/login" className="block text-center">
									<LoginIcon />
									<br />
									<span className="text-slate-500 text-xs uppercase font-bold">
										Log in
									</span>
								</Link>
							)}
						</div>
					</div>
					<div className="flex-grow min-h-0 h-full">{children}</div>
				</div>
			</body>
		</html>
	);
}

function IconLink({
	icon,
	href,
	label,
}: {
	icon: string;
	href: string;
	label: string;
}) {
	return (
		<a
			href={href}
			className="text-slate-500 text-xs uppercase font-bold text-center"
		>
			<Image
				src={icon}
				aria-hidden
				className="inline-block h-8"
				alt={""}
				width={30}
				height={30}
			/>
			<span className="block mt-2">{label}</span>
		</a>
	);
}
