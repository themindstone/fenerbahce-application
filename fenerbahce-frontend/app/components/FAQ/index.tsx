import type { ReactElement } from "react";
import { Box, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { IFAQ } from "~/interfaces";
import { faq } from "~/data";
import { ArrowForwardIcon } from "~/assets";

interface FAQItemProps extends IFAQ {}


const FAQItem = ({ text, url }: FAQItemProps): ReactElement => {
	return (
		<Link href={url}>
			<Flex borderBottom="1px solid #ddd" justifyContent="space-between" p="10px 15px">
				<Text>
					{text}
				</Text>
				<ArrowForwardIcon height="25px" width="25px" cursor="pointer" fill="#000" />
			</Flex>
		</Link>
	);
};

export const FAQ = (): ReactElement => {
	return (
		<VStack bg="#fbfbfb" color="black" paddingTop="150px" paddingBottom="100px">
			<Heading size="lg">Şıkça Sorulan Sorular</Heading>
			<Box maxW="800px" w="90%">
				{faq.map((item, index) => {
					return <FAQItem text={item.text} url={item.url} key={index} />;
				})}
			</Box>
		</VStack>
	);
};
