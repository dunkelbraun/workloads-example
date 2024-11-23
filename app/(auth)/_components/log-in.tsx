import { Link, Text, View } from "reshaped";
import { signIn } from "../login/actions";
import AuthForm from "./auth-form";

export function LogInForm() {
	return (
		<AuthForm buttonLabel="Log In" action={signIn}>
			<View direction="row" paddingTop={4}>
				<Text variant="body-3">
					Don&#39;t have an account?{" "}
					<Link href="/sign-up" className="underline">
						Sign up
					</Link>
				</Text>
			</View>
		</AuthForm>
	);
}
