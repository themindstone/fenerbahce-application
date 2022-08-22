import { Button, ButtonProps } from "@chakra-ui/react";
import type { ReactElement } from "react";

export const WhiteButton = ({ children, ...rest }: ButtonProps): ReactElement => {
	return (
		<Button {...rest} bg="white" color="var(--biscay)">
			{children}
		</Button>
	);
};
