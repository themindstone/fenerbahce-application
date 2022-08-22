import type { ReactElement } from "react";
import { Box, Flex, Heading, Link, VStack } from "@chakra-ui/react";
import { IFAQ } from "~/interfaces";
import { faq } from "~/data";

interface FAQItemProps extends IFAQ {}

const FAQItem = ({ text, url }: FAQItemProps): ReactElement => {
	return (
		<Link href={url}>
			<Flex borderBottom="1px solid #ddd" justifyContent="space-between" p="10px 15px">
				{text}
			</Flex>
		</Link>
	);
};

export const FAQ = (): ReactElement => {
	return (
		<VStack bg="#fbfbfb" color="black" paddingTop="250px" paddingBottom="100px">
			<Heading size="lg">Sikca Sorulan Sorular</Heading>
			<Box maxW="800px" w="90%">
				{faq.map((item, index) => {
					return <FAQItem text={item.text} url={item.url} key={index} />;
				})}
			</Box>
		</VStack>
	);
};
