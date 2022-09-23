import { Box, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { ReactElement, useMemo, useState } from "react";
import { Carousel } from "~/components";
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

interface ActiveAuctionsCardProps {
	photoUrls: string[];
	id: string;
	offers: number[];
}

const ActiveAuctionsCard = ({ photoUrls, offers = [], id }: ActiveAuctionsCardProps): ReactElement => {
	return (
		<Link href={`/product/${id}`} _hover={{ textDecor: "none" }}>
			<Flex borderRadius="15px" overflow="hidden" bg="var(--governor-bay)" direction="column">
				<Box
					style={{ aspectRatio: "13/16" }}
					bgImage={`url(${photoUrls[0]})`}
					bgSize={"cover"}
					w="100%"
					bgRepeat="no-repeat"
					bgPos="center"
				/>
				<Flex direction="column" p="15px 20px" gap="10px" fontWeight="bold">
					<Flex justifyContent="space-between" color="var(--golden-fizz)">
						<Text>En yüksek teklif</Text>
						<Text>{offers[0] || "22.455"} ₺</Text>
					</Flex>
					<Flex justifyContent="space-between">
						<Text>En 2. yüksek teklif</Text>
						<Text>{offers[1] || "19.780"} ₺</Text>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
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

	return (
		<VStack gap="20px" maxW="1000px" margin="50px auto" padding="0 30px">
			<Heading size="xl">Aktif Açık Artırmalar</Heading>
			<Carousel options={options}>
				{auctions.map((item: any) => {
					return (
						<ActiveAuctionsCard
							key={item.id}
							photoUrls={item.photoUrls}
							offers={item.offers}
							id={item.id}
						/>
					);
				})}
			</Carousel>
		</VStack>
	);
};
