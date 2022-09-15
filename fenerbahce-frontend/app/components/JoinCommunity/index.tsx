import { Flex, Heading, VStack, Link } from "@chakra-ui/react";
import type { ReactElement } from "react";
import type { ISocialMediaIcon } from "~/interfaces";
import { socialmediaicons } from "~/data";

interface SocialMediaIconProps extends ISocialMediaIcon {}

export const SocialMediaIcon = ({ title, link, Icon }: SocialMediaIconProps): ReactElement => {
	return (
		<Link href={link}>
			<Flex gap="10px" alignItems="center" fontWeight="bold">
				<Icon />
				{title}
			</Flex>
		</Link>
	);
};

export const JoinCommunity = (): ReactElement => {
	return (
		<VStack gap="50px" bg="#fbfbfb" color="black" padding="0 0 100px">
			<Heading size="lg">Topluluga katilin</Heading>
			<Flex
				justifyContent="space-between"
				maxW="1000px"
				w="90%"
				gap="10px"
				direction={{
					base: "column",
					md: "row",
				}}>
				{socialmediaicons.map(item => {
					return <SocialMediaIcon title={item.title} link={item.link} Icon={item.Icon} key={item.key} />;
				})}
			</Flex>
		</VStack>
	);
};
