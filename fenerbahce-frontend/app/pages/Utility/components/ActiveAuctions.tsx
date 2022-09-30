import { Box, Flex, Grid, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { ReactElement, useMemo, useState } from "react";
import { Carousel, GoldenFizzButton, WhiteButton } from "~/components";
import { useLoaderData } from "@remix-run/react";
import { humanReadableNumber } from "~/utils";
import { useAuctionContractAdapter } from "~/mediators";
import { placeBidModalEventBus } from "~/eventbus";

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

const ActiveAuctionsCard = (auction: any): ReactElement => {
	const [state, setState] = useState<boolean>(false);

	const { buyNow } = useAuctionContractAdapter(auction);

	const onOver = () => {
		setState(true);
	};

	const onOut = () => {
		setState(false);
	};

	const openPlaceBidModal = () => {
		placeBidModalEventBus.publish("placebidmodal.open", auction);
	};

	return (
		<Link href={`/product/${auction.id}`} _hover={{ textDecor: "none" }} onMouseOver={onOver} onMouseOut={onOut}>
			<Flex borderRadius="15px" overflow="hidden" bg="var(--governor-bay)" direction="column">
				<Box
					style={{ aspectRatio: "13/16" }}
					bgImage={`url(${auction.photoUrls[0]})`}
					bgSize={"cover"}
					w="100%"
					bgRepeat="no-repeat"
					bgPos="center"
					pos="relative">
					{state && (
						<Grid
							bottom="0"
							pos="absolute"
							w="100%"
							templateColumns="1fr 1fr"
							gap="10px"
							p="15px"
							background="linear-gradient(to top, #1C2F6E, transparent)"
							onClick={e => {
								e.preventDefault();
							}}>
							<WhiteButton onClick={buyNow}>Hemen Al</WhiteButton>
							<GoldenFizzButton onClick={openPlaceBidModal}>Teklif Ver</GoldenFizzButton>
						</Grid>
					)}
				</Box>
				<Flex direction="column" p="15px 20px" gap="10px" fontWeight="bold">
					<Flex justifyContent="space-between" color="var(--golden-fizz)">
						<Text>En yüksek teklif</Text>
						<Text>{auction.offers[0] || "22.455"} ₺</Text>
					</Flex>
					<Flex justifyContent="space-between">
						<Text>En yüksek 2. teklif</Text>
						<Text>{auction.offers[1] || "19.780"} ₺</Text>
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
					return <ActiveAuctionsCard {...item} />;
				})}
			</Carousel>
		</VStack>
	);
};
