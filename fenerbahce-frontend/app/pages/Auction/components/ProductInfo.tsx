import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactElement, useCallback } from "react";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useCountdownTimer } from "~/hooks";
import { useLoaderData } from "@remix-run/react";
import { OfferCard } from "./OfferCard";
import { CollapsibleCard } from "./CollapsibleCard";
import { TimeLeftBox } from "./TimeLeftBox";
import { humanReadableNumber } from "~/utils";
import { useAuctionContract } from "~/contracts";
import { useConnectWallet } from "~/context";
import { useQuery } from "react-query";
import { useUserClient } from "~/client";
import { ethers } from "ethers";

export const ProductInfo = (): ReactElement => {

	const { auction } = useLoaderData();
	
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

		if (!userBalance.isSuccess) {
			window.alert("Cannot get your latest balance information, please make sure that you are connected to the internet");
			return;
		}

		const balanceOfWallet = userBalance.data.length !== 0 ? userBalance.data : ethers.utils.parseUnits("0", "18");
		console.log('balanceOfWallet:',balanceOfWallet.toString())

		let maxOffer = Number(auction.startPrice)

		if (Array.isArray(auction.balances) && auction.balances.length > 0) {
			const balancesArray = auction.balances.map((balance: any) => Number(balance.balance));
			maxOffer = Math.max(balancesArray);
		}

		const newOffer = (Array.isArray(auction.balances) && auction.balances.length > 0) ?
			maxOffer + Number(auction.bidIncrement) - balanceOfWallet : auction.startPrice;

		auctionContract.deposit({
			auctionId: auction.id,
			value: newOffer.toString()
		});
	}, [auctionContract, userBalance]);

	return (
		<Box>
			<Flex direction="column" maxW="400px" gap="30px">
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
					<WhiteButton>HEMEN AL {humanReadableNumber(auction.buyNowPrice)}₺</WhiteButton>
					<GoldenFizzButton onClick={deposit}>TEKLİF VER</GoldenFizzButton>
				</Flex>
				<Flex direction="column" gap="10px">
					<Text>En Yüksek Teklif</Text>
					<OfferCard withToken={true} />
				</Flex>

                <Flex direction="column" gap="10px">
					<Text>Diğer Teklifler</Text>
					<OfferCard withToken={false} />
					<OfferCard withToken={false} />
					<OfferCard withToken={false} />
				</Flex>
                <Flex gap="15px" direction="column">
                    <CollapsibleCard title="Deneyimin detayları" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro." />
                    <CollapsibleCard title="Deneyimin özellikleri" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro." />
                    <CollapsibleCard title="Şartlar" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro." />
                </Flex>
			</Flex>
		</Box>
	);
};
