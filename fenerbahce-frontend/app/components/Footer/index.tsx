import { Flex, Text } from "@chakra-ui/react";
import type { ReactElement } from "react";

export const Footer = (): ReactElement => {
	return (
		<Flex borderTop="1px solid #aaa" bg="#fbfbfb" color="#00000087" p="20px 40px" justifyContent="center">
			<Text>&copy; {new Date().getFullYear()} Fenerbahçe Token</Text>
		</Flex>
	);
};
