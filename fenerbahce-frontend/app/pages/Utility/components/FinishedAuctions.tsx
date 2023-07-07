import { Box, Flex, Heading, Text, VStack, Link } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Carousel } from "~/components";
import { useLoaderData } from "@remix-run/react";
import { humanReadableNumber } from "~/utils";
import { useAuctionClient } from "~/client";
import { useQuery } from "react-query";

interface FinishedAuctionsCardProps {
	id: string;
	name: string;
	offers: number[];
	photoUrls: { photoUrl: string }[];
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

const FinishedAuctionsCard = (auction: FinishedAuctionsCardProps): ReactElement => {
	const [highestBalances, setHighestBalances] = useState<number[]>([]);

	const auctionClient = useAuctionClient();

	const auctionHighestBalances = useQuery(
		["balances", auction.id],
		() => {
			return auctionClient.getHighestBalancesByAuctionId(auction.id).then(res => res.data);
		},
		{ enabled: !!auction.id },
	);

	useEffect(() => {
		if (!auctionHighestBalances.isSuccess) {
			return;
		}
		if (auctionHighestBalances.data.length > 0) {
			const data = auctionHighestBalances.data;
			const balances = data.map((item: any) => {
				return item.balance;
			});

			setHighestBalances(balances);
		}
	}, [auctionHighestBalances.isSuccess]);

	console.log(highestBalances);

	return (
		<Link href={`/product/${auction.id}`} _hover={{ textDecor: "none" }}>
			<Flex borderRadius="15px" overflow="hidden" bg="var(--governor-bay)" direction="column">
				<Box
					style={{ aspectRatio: "13/16" }}
					bgImage={`url(${auction.photoUrls[0].photoUrl})`}
					bgSize={"cover"}
					w="100%"
					bgRepeat="no-repeat"
					bgPos="center"
					pos="relative"></Box>
				<Flex direction="column" p="15px 20px" gap="10px" fontWeight="bold">
					<Box fontSize="lg">{auction.name}</Box>
					<Flex justifyContent="space-between">
						<Flex direction="column"></Flex>
						<Flex direction="column" alignItems="end">
							<Text fontWeight="normal">En yüksek teklif</Text>
							<Text color="var(--golden-fizz)">
								{auctionHighestBalances.isSuccess && auctionHighestBalances.data.length > 0
									? humanReadableNumber(auctionHighestBalances.data[0].balance).toFixed(2) + " FB"
									: "Teklif Yok"}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
};

export const FinishedAuctions = (): ReactElement => {
	const { finishedAuctions } = useLoaderData();

	const auctions = useMemo(() => {
		const newAuctions = finishedAuctions.map((auction: any) => {
			const lowOffer = Math.floor(Math.random() * 6000) + 12000;
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
			<Heading size="xl">Bitmiş Açık Artırmalar</Heading>
			<Carousel options={options}>
				{auctions.map((item: any) => {
					return <FinishedAuctionsCard {...item} />;
				})}
			</Carousel>
		</VStack>
	);
};
