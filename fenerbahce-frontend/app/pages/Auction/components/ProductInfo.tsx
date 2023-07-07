import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Fragment, useEffect, useState } from "react";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useCountdownTimer } from "~/hooks";
import { useLoaderData } from "@remix-run/react";
import { OfferCard } from "./OfferCard";
import { CollapsibleCard } from "./CollapsibleCard";
import { TimeLeftBox } from "./TimeLeftBox";
import { humanReadableNumber } from "~/utils";
import { useQuery } from "react-query";
import { BalanceClient } from "~/client";
import { buyNowModalEventBus, placeBidModalEventBus } from "~/eventbus";

export const ProductInfo = (): ReactElement => {
	const { auction } = useLoaderData();

	const [balances, setBalances] = useState<any[]>(() => auction.balances);

	const { days, hours, minutes, seconds, status } = useCountdownTimer(auction.endDate);

	const openPlaceBidModal = async () => {
		placeBidModalEventBus.publish("placebidmodal.open", {
			...auction,
			balances: auction.balances.map((i: any) => i.balance),
		});
	};

	const auctionHighestBalances = useQuery(
		["balances", auction.id],
		() => {
			return BalanceClient.getHighestBalancesByAuctionId(auction.id);
		},
		{
			enabled: auction.isActive && !auction.isSelled && !!auction.id,
			refetchInterval: 10000,
		},
	);

	useEffect(() => {
		if (auctionHighestBalances.data) {
			setBalances(auctionHighestBalances.data);
		}
	}, [auctionHighestBalances]);

	const buyNowModalOpen = async () => {
		buyNowModalEventBus.publish("buynowmodal.open", auction);
	};

	return (
		<Box>
			<Flex direction="column" maxW="400px" gap="30px">
				<Heading>{auction.name}</Heading>
				{status === "success" && !auction.isSelled && (
					<Flex direction="column" gap="10px">
						<Text>Kalan süre</Text>
						{days === "00" ? (
							<Flex gap="20px">
								<TimeLeftBox left={hours} text="SAAT"></TimeLeftBox>
								<TimeLeftBox left={minutes} text="DAKİKA"></TimeLeftBox>
								<TimeLeftBox left={seconds} text="SANİYE"></TimeLeftBox>
							</Flex>
						) : (
							<Flex gap="20px">
								<TimeLeftBox left={days} text="GÜN"></TimeLeftBox>
								<TimeLeftBox left={hours} text="SAAT"></TimeLeftBox>
								<TimeLeftBox left={minutes} text="DAKİKA"></TimeLeftBox>
							</Flex>
						)}
					</Flex>
				)}
				{(status === "undefined" || auction.isSelled) && (
					<Box borderRadius="7px" border="2px solid white" p="10px 15px" fontWeight="extrabold">
						AÇIK ARTIRMA TAMAMLANDI
					</Box>
				)}
				{status === "success" && !auction.isSelled && (
					<Flex gap="10px" direction="column" alignItems="stretch">
						<WhiteButton onClick={buyNowModalOpen}>
							HEMEN AL {humanReadableNumber(auction.buyNowPrice).toFixed(2)} FB
						</WhiteButton>
						<GoldenFizzButton onClick={openPlaceBidModal}>TEKLİF VER</GoldenFizzButton>
					</Flex>
				)}
				{balances.length !== 0 && (
					<Fragment>
						<Flex direction="column" gap="10px">
							<Text>
								{status === "undefined" || auction.isSelled ? "Kazanan Teklif" : "En Yüksek Teklif"}
							</Text>
							{balances.length > 0 && (
								<OfferCard
									isWinner={status === "undefined" || auction.isSelled ? true : false}
									withToken={true}
									address={balances[0].userAddress}
									numberOfTokens={balances[0].balance}
								/>
							)}
						</Flex>
						{balances.length > 1 && (
							<Flex direction="column" gap="10px">
								<Text>Diğer Teklifler</Text>
								{balances.length > 1 && (
									<OfferCard
										withToken={false}
										address={balances[1].userAddress}
										numberOfTokens={balances[1].balance}
									/>
								)}
								{balances.length > 2 && (
									<OfferCard
										withToken={false}
										address={balances[1].userAddress}
										numberOfTokens={balances[2].balance}
									/>
								)}
								{balances.length > 3 && (
									<OfferCard
										withToken={false}
										address={balances[2].userAddress}
										numberOfTokens={balances[3].balance}
									/>
								)}
							</Flex>
						)}
					</Fragment>
				)}
				<Flex gap="15px" direction="column">
					<CollapsibleCard title="Deneyimin detayları">
						Başlangıç fiyatı: {auction.startPrice} FB <br />
						Hemen al fiyatı: {auction.buyNowPrice} FB
						<br />
						Açık artırma bitiş zamanı: {new Date(auction.endDate).getDate() + 1}/
						{new Date(auction.endDate).getMonth() + 1}/{new Date(auction.endDate).getFullYear()} -{" "}
						{new Date(auction.endDate).getHours()}:{new Date(auction.endDate).getMinutes()}
						<br />
					</CollapsibleCard>
					<CollapsibleCard title="Deneyimin özellikleri">Deneyimin özellikleri</CollapsibleCard>
					<CollapsibleCard title="Şartlar">
						Yakım açık artırmadan kazanılan ödüller Fenerbahçe SK şartlarına bağlıdır.
					</CollapsibleCard>
				</Flex>
			</Flex>
		</Box>
	);
};
