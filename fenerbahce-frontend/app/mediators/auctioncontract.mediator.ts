import { useLoaderData } from "@remix-run/react";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useAuctionClient, useBalanceClient } from "~/client";
import { useConnectWallet } from "~/context";
import { useAuctionContract, useFBTokenContract } from "~/contracts";
import { modal1907EventBus, loadingModalEventBus } from "~/eventbus";
import { useChainConfig } from "~/hooks";
import { MathUtils } from "~/utils";

// TODO: This page will be seperated from UI things
export const useAuctionContractAdapter = () => {

	const { auction } = useLoaderData();

	const balanceClient = useBalanceClient();
	const auctionClient = useAuctionClient();
	const connectWallet = useConnectWallet();

	const fbTokenContract = useFBTokenContract();
	const auctionContract = useAuctionContract();

	const { switchToNetwork } = useChainConfig();

	const [balances, setBalances] = useState(() => {
		if (auction.isSelled) {
			return [
				{
					id: "asdnfasdf",
					balance: auction.buyNowPrice,
					userAddress: auction.selledToAddress,
				},
				...auction.balances,
			];
		}
		return auction.balances;
	});

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
		if (!connectWallet.isConnected) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
			});
			return;
		}
		if (!userAllowance.data || userAllowance.data.isError) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "Sayfayı yenileyip tekrar dener misiniz?",
			});
			// window.location.reload();
			return;
		}
		try {
			loadingModalEventBus.publish("loadingmodal.open", { message: "Açık artırma teklifiniz yükleniyor..." });
			await switchToNetwork();

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
			console.log(newOffer);

			const { isError, errorMessage } = await auctionContract.deposit({
				auctionId: auction.id,
				value: newOffer.toString(),
			});
			if (isError && errorMessage) {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: errorMessage,
				});
			} else {
				const message = balance ? "Açık artırma ücretiniz güncellendi" : "Açık artırmaya başarıyla katıldınız.";

				modal1907EventBus.publish("modal.open", {
					isSucceed: true,
					description: message,
				});
				setTimeout(() => {
					auctionHighestBalances.refetch();
				}, 5000);
			}
		} finally {
			loadingModalEventBus.publish("loadingmodal.close");
		}
	}, [auctionContract, fbTokenContract, balances, userBalance, userAllowance]);

	const buyNow = useCallback(async () => {
		try {
			loadingModalEventBus.publish("loadingmodal.open", {
				message: "Açık artırma hemen al teklifiniz veriliyor...",
			});
			let { isError, errorMessage } = await auctionContract.buyNow({
				auctionId: auction.id,
			});
			if (isError && errorMessage) {
				// show modal with error message
				modal1907EventBus.publish("modal.open", {
					isSucceed: !isError,
					description: errorMessage,
				});
			} else {
				modal1907EventBus.publish("modal.open", {
					isSucceed: true,
					description: "İşleminiz başarıyla tamamlandı.",
				});
			}
		} finally {
			loadingModalEventBus.publish("loadingmodal.close");
		}
	}, [auctionContract]);

	return { deposit, buyNow };
};
