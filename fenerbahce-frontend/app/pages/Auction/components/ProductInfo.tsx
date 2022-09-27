import { Box, Flex, Heading, Text, useDisclosure, useInterval } from "@chakra-ui/react";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { GoldenFizzButton, WhiteButton, Modal1907 } from "~/components";
import { useCountdownTimer } from "~/hooks";
import { useLoaderData } from "@remix-run/react";
import { OfferCard } from "./OfferCard";
import { CollapsibleCard } from "./CollapsibleCard";
import { TimeLeftBox } from "./TimeLeftBox";
import { humanReadableNumber } from "~/utils";
import { useQuery } from "react-query";
import { useAuctionClient } from "~/client";
import { modal1907EventBus } from "~/eventbus";
import { useAuctionContractAdapter } from "~/mediators";

const Modal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [description, setDescription] = useState<string>("");
	const [isSucceed, setIsSucceed] = useState<boolean>(false);

	modal1907EventBus.useListener(
		"modal.open",
		({ isSucceed, description }) => {
			setIsSucceed(isSucceed);
			setDescription(description);
			onOpen();
		},
		[],
	);

	return <Modal1907 isOpen={isOpen} onClose={onClose} description={description} isSucceed={isSucceed}></Modal1907>;
};

export const ProductInfo = (): ReactElement => {
	const { auction } = useLoaderData();

	const [balances, setBalances] = useState(() => {
		if (auction.isSelled) {
			return [{
				id: "asdnfasdf",
				balance: auction.buyNowPrice,
				userAddress: auction.selledToAddress
			}, ...auction.balances];
		}
		return auction.balances
	});

	const { days, hours, minutes, seconds, status } = useCountdownTimer(auction.endDate);

	const auctionClient = useAuctionClient();

	const  { buyNow, deposit } = useAuctionContractAdapter();

	const auctionHighestBalances = useQuery(
		["balances", auction.id],
		() => {
			return auctionClient.getHighestBalancesByAuctionId(auction.id).then(res => res.data);
		},
		{
			enabled: auction.isActive && !auction.isSelled,
		},
	);

	// refetch auction highest balance in every 2 minutes
	useInterval(() => {
		auctionHighestBalances.refetch();
	}, 1000 * 60 * 2);

	useEffect(() => {
		if (auctionHighestBalances.data) {
			setBalances(auctionHighestBalances.data);
		}
	}, [auctionHighestBalances]);

	return (
		<Box>
			<Flex direction="column" maxW="400px" gap="30px">
				<Heading>{auction.name}</Heading>
				{status === "success" && (
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
						<WhiteButton onClick={buyNow}>
							HEMEN AL {humanReadableNumber(auction.buyNowPrice)} FB
						</WhiteButton>
						<GoldenFizzButton onClick={deposit}>TEKLİF VER</GoldenFizzButton>
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
			<Modal></Modal>
		</Box>
	);
};
