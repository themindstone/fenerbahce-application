import { Flex, Heading } from "@chakra-ui/react";
import type { ReactElement } from "react";
import React from "react";
import { Carousel } from "~/components";

const options = {
	loop: false,
	responsive: {
		800: { items: 1, dots: false },
		600: { items: 3 },
		500: { items: 2 },
		0: {
			items: 1,
			dots: true,
		},
	},
};

const ActiveAuctionsCard = (): ReactElement => {
	return <div>enes ince</div>;
};

export const ActiveAuctions = (): ReactElement => {
	return (
		<Flex direction="column" gap="20px" marginTop="50px">
			<Heading size="xl">Aktif acik artirmalar</Heading>
			<Carousel options={options}>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
				<ActiveAuctionsCard></ActiveAuctionsCard>
			</Carousel>
		</Flex>
	);
};
