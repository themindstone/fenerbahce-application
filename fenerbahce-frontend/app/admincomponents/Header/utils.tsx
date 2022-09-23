import type { ReactElement } from "react";
import { Link, LinkProps, Text } from "@chakra-ui/react";

export const NavLink = ({ children, ...rest }: LinkProps): ReactElement => {
	return (
		<Link {...rest} fontWeight="bold">
			{children}
		</Link>
	);
};

export const FBTokenText = (): ReactElement => (
	<Text bg="white" color="var(--biscay)" fontWeight="bold" p="5px 10px" borderRadius="5px" fontSize="16px">
		FB Token: 36.05₺
	</Text>
);

