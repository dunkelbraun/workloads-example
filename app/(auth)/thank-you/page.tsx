import { Alert, Text } from "reshaped";

export default async function ThankYou() {
	return (
		<Alert color="positive">
			<Text variant="body-2" weight="regular">
				You will shorty receive an email with a confirmation link.
			</Text>
		</Alert>
	);
}
