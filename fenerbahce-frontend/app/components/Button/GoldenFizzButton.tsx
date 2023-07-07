import { Button } from "@chakra-ui/react";
import React from "react";
import type { ReactElement } from "react";
import type { ButtonProps } from "@chakra-ui/react";

export const GoldenFizzButton = React.forwardRef(
	({ children, ...rest }: ButtonProps, ref: React.LegacyRef<HTMLButtonElement>): ReactElement => {
		return (
			<Button ref={ref} {...rest} bg="var(--golden-fizz)" color="var(--biscay)" fontWeight="bold">
				{children}
			</Button>
		);
	},
);
