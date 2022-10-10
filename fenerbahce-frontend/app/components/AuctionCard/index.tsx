import { Box, Flex, Grid, Link, Text } from "@chakra-ui/react";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useAuctionClient } from "~/client";
import { buyNowModalEventBus, placeBidModalEventBus } from "~/eventbus";
import { useCountdownTimer } from "~/hooks";
import { humanReadableNumber } from "~/utils";
import { GoldenFizzButton, WhiteButton } from "../Button";

export const AuctionCard = (auction: any, isFinished: boolean = false): ReactElement => {
	const [state, setState] = useState<boolean>(false);
	const [highestBalances, setHighestBalances] = useState<number[]>([]);

	const auctionClient = useAuctionClient();
	const timeLeft = useCountdownTimer(auction.endDate);

	const displayedTimeLeft = useMemo(() => {
		if (Number(timeLeft.days)) {
			return `${Number(timeLeft.days)} gün`;
		} else if (Number(timeLeft.hours)) {
			return `${Number(timeLeft.hours)} saat`;
		} else if (Number(timeLeft.minutes)) {
			return `${Number(timeLeft.minutes)} dakika`;
		} else if (Number(timeLeft.seconds)) {
			return `${Number(timeLeft.seconds)} saniye`;
		}
		return undefined;
	}, []);

	const onOver = () => {
		setState(true);
	};

	const onOut = () => {
		setState(false);
	};

	const openPlaceBidModal = () => {
		placeBidModalEventBus.publish("placebidmodal.open", { ...auction, balances: highestBalances });
	};

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

	const buyNowModalOpen = () => {
		buyNowModalEventBus.publish("buynowmodal.open", auction);
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
							<WhiteButton onClick={buyNowModalOpen}>Hemen Al</WhiteButton>
							<GoldenFizzButton onClick={openPlaceBidModal}>Teklif Ver</GoldenFizzButton>
						</Grid>
					)}
				</Box>
				<Flex direction="column" p="15px 20px" gap="10px" fontWeight="bold">
					<Box fontSize="lg">{auction.name}</Box>
					<Flex justifyContent="space-between">
						<Flex direction="column">
							<Text fontWeight="normal">Kalan Süre</Text>
							<Text color="var(--golden-fizz)">{displayedTimeLeft}</Text>
						</Flex>
						<Flex direction="column" alignItems="end">
							<Text fontWeight="normal">En yüksek teklif</Text>
							<Text color="var(--golden-fizz)">
								{auctionHighestBalances.isSuccess && auctionHighestBalances.data.length > 0
									? humanReadableNumber(auctionHighestBalances.data[0].balance).toFixed(2) + " FB"
									: "-"}
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
};
