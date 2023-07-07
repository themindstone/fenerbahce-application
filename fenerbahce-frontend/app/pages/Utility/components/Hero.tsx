import { Box, VStack } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Carousel } from "~/components";
import { JorgeJesusBanner } from "~/assets";

const options = {
	loop: false,
	items: 1,
	margin: 30,
};

const HeroCard = (): ReactElement => {
	return (
		<Box
			borderRadius="15px"
			style={{ aspectRatio: "100/45" }}
			bgSize="cover"
			bgImage={`url(${JorgeJesusBanner})`}></Box>
	);
};

export const Hero = (): ReactElement => {
	return (
		<VStack maxW="1000px" w="90%" margin="auto">
			<Carousel options={options}>
				<HeroCard />
			</Carousel>
		</VStack>
	);
};
