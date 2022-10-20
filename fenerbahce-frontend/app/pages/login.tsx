import { Flex, Heading, Input, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Layout } from "~/admincomponents";
import * as yup from "yup";
import { GoldenFizzButton } from "~/components";
import { useAuthContext } from "~/context";

const schema = yup.object({
	email: yup.string().email("Email geçerli değil").required("Email bilgisi zorunludur."),
	password: yup.string().required("Şifre bilgisi zorunludur."),
});

type LoginFormType = yup.InferType<typeof schema>;

const LoginForm = () => {
	const { signIn } = useAuthContext();

	const { register, handleSubmit, formState } = useForm<LoginFormType>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<LoginFormType> = async data => {
		await signIn(data);
		window.location.href = "/admin";
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex width="500px" gap="15px" direction="column">
				<Input type="text" placeholder="Email" {...register("email")} />
				{formState.errors.email && <Text>{formState.errors.email.message}</Text>}
				<Input type="password" placeholder="Password" {...register("password")} />
				{formState.errors.password && <Text>{formState.errors.password.message}</Text>}
				<GoldenFizzButton type="submit">Gönder</GoldenFizzButton>
			</Flex>
		</form>
	);
};

export const LoginPage = (): ReactElement => {

	return (
		<Layout authenticationRequired={false}>
			<Heading mb="15px">Login With Username and Password</Heading>

			<LoginForm />
		</Layout>
	);
};
