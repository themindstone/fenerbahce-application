import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export const GoldenFizzButton = ({ children, ...rest }: ButtonProps): ReactElement => {
	return (
		<Button {...rest} bg="var(--golden-fizz)" color="var(--biscay)">
			{children}
		</Button>
	);
};
