import { Box, Flex, Heading, Text, VStack, Link } from "@chakra-ui/react";
import { ReactElement, useMemo } from "react";
import { Carousel } from "~/components";
import { useLoaderData } from "@remix-run/react";
import { humanReadableNumber } from "~/utils";

interface HighestOffersCardProps {
	id: string;
	offers: number[];
	photoUrls: string[];
}

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

const HighestOffersCard = ({ id, offers = [], photoUrls }: HighestOffersCardProps): ReactElement => {
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
						<Text>En yüksek 2. teklif</Text>
						<Text>{offers[1] || "19.780"} ₺</Text>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
};

export const HighestOffers = (): ReactElement => {
	const { highestOfferAuctions } = useLoaderData();

	const auctions = useMemo(() => {
		const newAuctions = highestOfferAuctions.map((auction: any) => {
			const lowOffer = Math.floor(Math.random() * 6000) + 12000;
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
			<Heading size="xl">En Yüksek Teklif Gelen Açık Artırmalar</Heading>
			<Carousel options={options}>
				{auctions.map((item: any) => {
					return <HighestOffersCard id={item.id} offers={item.offers} photoUrls={item.photoUrls} />;
				})}
			</Carousel>
		</VStack>
	);
};
