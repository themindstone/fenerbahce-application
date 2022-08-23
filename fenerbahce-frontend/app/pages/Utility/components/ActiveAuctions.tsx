import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Carousel } from "~/components";
import { UniformImage } from "~/assets";

const options = {
	loop: false,
	responsive: {
		800: {
			items: 3,
			slideBy: 3,
		},
		600: {
			items: 3,
			slideBy: 3,
		},
		500: {
			items: 2,
			slideBy: 2,
		},
		0: {
			items: 1,
			slideBy: 1,
		},
	},
	margin: 30
};

const ActiveAuctionsCard = (): ReactElement => {
	return (<Flex borderRadius="15px" overflow="hidden">
		<Box style={{ aspectRatio: "13/16" }}
			bgImage={`url(${UniformImage})`}
			w="100%"
			bgRepeat="no-repeat"
			bgPos="center" />
	</Flex>);
};

export const ActiveAuctions = (): ReactElement => {
	return (
		<VStack gap="20px" maxW="1000px" margin="50px auto">
			<Heading size="xl">Aktif acik artirmalar</Heading>
			<Carousel options={options}>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
			</Carousel>
		</VStack>
	);
};
