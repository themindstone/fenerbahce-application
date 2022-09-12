import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Fragment, ReactElement, useCallback, useState } from "react";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useCountdownTimer } from "~/hooks";
import { useLoaderData } from "@remix-run/react";
import { OfferCard } from "./OfferCard";
import { CollapsibleCard } from "./CollapsibleCard";
import { TimeLeftBox } from "./TimeLeftBox";
import { MathUtils, humanReadableNumber } from "~/utils";
import { useAuctionContract } from "~/contracts";
import { useConnectWallet } from "~/context";
import { useQuery } from "react-query";
import { useUserClient } from "~/client";

export const ProductInfo = (): ReactElement => {
	const { auction } = useLoaderData();

	const [balances, setBalances] = useState(() => auction.balances);

	const { days, hours, minutes } = useCountdownTimer(auction.endDate);

	const auctionContract = useAuctionContract();
	const connectWallet = useConnectWallet();
	const userClient = useUserClient();

	const userBalance = useQuery(["balance", connectWallet.address], () => {
		return userClient.getBalanceByAuctionId(auction.id, connectWallet.address)
			.then(res => res.data);
	}, {
		enabled: connectWallet.isConnected
	});

	const deposit = useCallback(() => {
		const balance = Number((userBalance as any).data?.balance?.toFixed?.(2)) || 0;

		let newOffer;
		const balanceArr: number[] = balances.map((x: any) => x.balance);
		const maxOffer = MathUtils.max(balanceArr) + auction.bidIncrement;

		if (balances.length === 0) {
			newOffer = auction.startPrice;
		}
		else if (balance) {
			newOffer = maxOffer - balance;
		}
		else {
			newOffer = maxOffer;
		}
		newOffer = newOffer.toFixed(2)

		auctionContract.deposit({
			auctionId: auction.id,
			value: newOffer.toString(),
		});
	}, [auctionContract, balances, userBalance]);

	const buyNow = useCallback(() => {

		auctionContract.buyNow({
			auctionId: auction.id,
			buyNowPrice: auction.buyNowPrice.toString(),
		});
	}, [auctionContract]);

	return (
		<Box>
			<Flex direction="column" maxW="400px" gap="30px">
				{auction.isSelled && (
					<Text color="green" fontSize="20px">
						Bu açık artırma bir başkası tarafından satın alındı
					</Text>
				)}
				{!auction.isActive && (
					<Text color="red" fontSize="20px">
						Bu açık artırma şu anda aktif değil
					</Text>
				)}
				<Heading>{auction.name}</Heading>
				<Flex direction="column" gap="10px">
					<Text>Kalan süre</Text>
					<Flex gap="20px">
						<TimeLeftBox left={days} text="GÜN"></TimeLeftBox>
						<TimeLeftBox left={hours} text="SAAT"></TimeLeftBox>
						<TimeLeftBox left={minutes} text="DAKİKA"></TimeLeftBox>
					</Flex>
				</Flex>
				<Flex gap="10px" direction="column" alignItems="stretch">
					<WhiteButton onClick={buyNow}>HEMEN AL {humanReadableNumber(auction.buyNowPrice)}₺</WhiteButton>
					<GoldenFizzButton onClick={deposit}>TEKLİF VER</GoldenFizzButton>
				</Flex>
				{balances.length === 0 && <Text>Bu açık artırmaya hiç teklif gelmedi</Text>}
				{balances.length !== 0 && (
					<Fragment>
						<Flex direction="column" gap="10px">
							<Text>En Yüksek Teklif</Text>
							{balances.length > 0 && (
								<OfferCard
									withToken={true}
									address={balances[0].address}
									numberOfTokens={balances[0].balance}
								/>
							)}
						</Flex>
						{balances.length !== 0 && (
							<Flex direction="column" gap="10px">
								<Text>Diğer Teklifler</Text>
								{balances.length > 1 && (
									<OfferCard
										withToken={false}
										address={balances[0].address}
										numberOfTokens={balances[1].balance}
									/>
								)}
								{balances.length > 2 && (
									<OfferCard
										withToken={false}
										address={balances[1].address}
										numberOfTokens={balances[2].balance}
									/>
								)}
								{balances.length > 3 && (
									<OfferCard
										withToken={false}
										address={balances[2].address}
										numberOfTokens={balances[3].balance}
									/>
								)}
							</Flex>
						)}
					</Fragment>
				)}
				<Flex gap="15px" direction="column">
					<CollapsibleCard
						title="Deneyimin detayları"
						content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro."
					/>
					<CollapsibleCard
						title="Deneyimin özellikleri"
						content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro."
					/>
					<CollapsibleCard
						title="Şartlar"
						content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro."
					/>
				</Flex>
			</Flex>
		</Box>
	);
};
