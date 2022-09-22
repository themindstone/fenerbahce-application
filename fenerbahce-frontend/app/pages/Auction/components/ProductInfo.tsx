import { Box, Flex, Heading, Text, useDisclosure, useInterval } from "@chakra-ui/react";
import { Fragment, ReactElement, useCallback, useEffect, useState } from "react";
import { GoldenFizzButton, WhiteButton, Modal1907 } from "~/components";
import { useChainConfig, useCountdownTimer } from "~/hooks";
import { useLoaderData } from "@remix-run/react";
import { OfferCard } from "./OfferCard";
import { CollapsibleCard } from "./CollapsibleCard";
import { TimeLeftBox } from "./TimeLeftBox";
import { MathUtils, humanReadableNumber, switchToNetwork } from "~/utils";
import { useAuctionContract, useFBTokenContract } from "~/contracts";
import { useConnectWallet } from "~/context";
import { useQuery } from "react-query";
import { useAuctionClient, useBalanceClient } from "~/client";
import { auctionResultModalEventBus } from "~/eventbus";

const Modal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [description, setDescription] = useState<string>("");
	const [isSucceed, setIsSucceed] = useState<boolean>(false);

	auctionResultModalEventBus.useListener(
		"auctionresultmodal.open",
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

	const [balances, setBalances] = useState(() => auction.balances);

	const { days, hours, minutes, status } = useCountdownTimer(auction.endDate);

	const auctionContract = useAuctionContract();
	const fbTokenContract = useFBTokenContract();
	const connectWallet = useConnectWallet();
	const balanceClient = useBalanceClient();
	const auctionClient = useAuctionClient();
	const { switchToNetwork } = useChainConfig();

	const userBalance = useQuery(
		["balance", connectWallet.address],
		() => {
			return balanceClient.getBalanceByAuctionId(auction.id, connectWallet.address).then(res => res.data);
		},
		{
			enabled: connectWallet.isConnected,
		},
	);

	const userAllowance = useQuery(
		["allowance", connectWallet.address],
		() => {
			return fbTokenContract.getAuctionContractAllowance({
				address: connectWallet.address,
			});
		},
		{
			enabled: fbTokenContract.isConnected,
		},
	);

	const auctionHighestBalances = useQuery(
		["balances", auction.id],
		() => {
			return auctionClient.getHighestBalancesByAuctionId(auction.id).then(res => res.data);
		},
		{
			enabled: auction.isActive && !auction.isSelled,
		},
	);

	const deposit = useCallback(async () => {
		switchToNetwork();
		if (!userAllowance.data || userAllowance.data.isError) {
			auctionResultModalEventBus.publish("auctionresultmodal.open", { isSucceed: false, description: "Allowance bilgilerinizi alırken bir hata oluştu" });
			return;
		}

		if (userAllowance.data.allowance === 0) {
			await fbTokenContract.approveAuctionContract();
		}
		const balance = Number((userBalance as any).data?.balance?.toFixed?.(2)) || 0;

		let newOffer;
		const getMaxOffer = () => {
			const balanceArr: number[] = balances.map((x: any) => x.balance);
			return MathUtils.max(balanceArr) + auction.bidIncrement;
		};

		if (balances.length === 0) {
			newOffer = auction.startPrice;
		} else if (balance) {
			newOffer = getMaxOffer() - balance;
		} else {
			newOffer = getMaxOffer();
		}
		newOffer = newOffer.toFixed(2);

		const { isError, errorMessage } = await auctionContract.deposit({
			auctionId: auction.id,
			value: newOffer.toString(),
		});
		if (isError && errorMessage) {
			auctionResultModalEventBus.publish("auctionresultmodal.open", {
				isSucceed: false,
				description: errorMessage,
			});
		} else {
			const message = balance ? "Açık artırma ücretiniz güncellendi" : "Açık artırmaya başarıyla katıldınız.";

			auctionResultModalEventBus.publish("auctionresultmodal.open", { isSucceed: true, description: message });
			setTimeout(() => {
				auctionHighestBalances.refetch();
			}, 5000);
		}
	}, [auctionContract, fbTokenContract, balances, userBalance, userAllowance]);

	const buyNow = useCallback(async () => {
		let { isError, errorMessage } = await auctionContract.buyNow({
			auctionId: auction.id,
		});

		if (isError && errorMessage) {
			// show modal with error message
			auctionResultModalEventBus.publish("auctionresultmodal.open", {
				isSucceed: !isError,
				description: errorMessage,
			});
		} else {
			auctionResultModalEventBus.publish("auctionresultmodal.open", {
				isSucceed: true,
				description: "İşleminiz başarıyla tamamlandı.",
			});
		}
	}, [auctionContract]);

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
				{status === "success" && (
					<Flex direction="column" gap="10px">
						<Text>Kalan süre</Text>
						<Flex gap="20px">
							<TimeLeftBox left={days} text="GÜN"></TimeLeftBox>
							<TimeLeftBox left={hours} text="SAAT"></TimeLeftBox>
							<TimeLeftBox left={minutes} text="DAKİKA"></TimeLeftBox>
						</Flex>
					</Flex>
				)}
				{status === "undefined" && "Açık artırmanın süresi doldu"}
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
									address={balances[0].userAddress}
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
