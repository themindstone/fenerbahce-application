import { Fragment, ReactElement } from "react";
import { Link, LinkProps, Text } from "@chakra-ui/react";
import { useFBTokenCalculator } from "~/hooks";

export const NavLink = ({ children, ...rest }: LinkProps): ReactElement => {
	return (
		<Link {...rest} fontWeight="bold">
			{children}
		</Link>
	);
};

export const FBTokenText = (): ReactElement => {
	const fbTokenCalculator = useFBTokenCalculator();

	if (!fbTokenCalculator.price) {
		return <Fragment></Fragment>;
	}

	return (
		<Text bg="white" color="var(--biscay)" fontWeight="bold" p="5px 10px" borderRadius="5px" fontSize="16px">
			FB Token: {fbTokenCalculator.price}₺
		</Text>
	);
};
