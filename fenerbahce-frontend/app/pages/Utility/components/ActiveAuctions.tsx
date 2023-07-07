import { Heading, VStack } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Fragment, useMemo } from "react";
import { Carousel, AuctionCard } from "~/components";
import { useLoaderData } from "@remix-run/react";
import { humanReadableNumber } from "~/utils";

const options = {
	loop: false,
	responsive: {
		800: {
			items: 3,
			slideBy: 3,
		},
		550: {
			items: 2,
			slideBy: 2,
		},
		0: {
			items: 1,
			slideBy: 1,
		},
	},
	margin: 30,
};

export const ActiveAuctions = (): ReactElement => {
	const { activeAuctions } = useLoaderData();

	const auctions = useMemo(() => {
		const lowOffer = Math.floor(Math.random() * 6000) + 12000;
		const newAuctions = activeAuctions.map((auction: any) => {
			auction.offers = [
				humanReadableNumber(lowOffer + Math.floor(Math.random() * 6000)),
				humanReadableNumber(lowOffer),
			];
			return auction;
		});
		return newAuctions;
	}, []);

	if (auctions.length === 0) {
		return <Fragment></Fragment>;
	}

	return (
		<VStack gap="20px" maxW="1000px" margin="50px auto" padding="0 30px">
			<Heading size="xl">Aktif Açık Artırmalar</Heading>
			<Carousel options={options}>
				{auctions.map((item: any) => {
					return <AuctionCard {...item} />;
				})}
			</Carousel>
		</VStack>
	);
};
