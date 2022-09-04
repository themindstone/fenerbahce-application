import { Button, ButtonProps } from "@chakra-ui/react";
import React, { ReactElement } from "react";

export const GoldenFizzButton = React.forwardRef((
	{ children, ...rest }: ButtonProps,
	ref: React.LegacyRef<HTMLButtonElement>
): ReactElement => {
	return (
		<Button ref={ref} {...rest} bg="var(--golden-fizz)" color="var(--biscay)" fontWeight="bold">
			{children}
		</Button>
	);
});
