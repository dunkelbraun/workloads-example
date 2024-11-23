import { confirmUser } from "@lib/user";
import { Alert } from "reshaped";
import { LogInForm } from "../_components/log-in";

interface ConfirmProps {
	searchParams: Promise<{ token?: string }>;
}

export default async function Confirm({ searchParams }: ConfirmProps) {
	const token = (await searchParams).token;
	return token !== undefined && (await confirmUser(token)) ? (
		<>
			<Alert title="All set!" color="positive">
				You can log in with your credentials.
			</Alert>
			<LogInForm />
		</>
	) : (
		<Alert color="critical">Invalid token.</Alert>
	);
}
