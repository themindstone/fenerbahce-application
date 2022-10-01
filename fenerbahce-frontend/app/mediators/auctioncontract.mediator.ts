import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuctionClient, useBalanceClient } from "~/client";
import { useConnectWallet } from "~/context";
import { useAuctionContract, useFBTokenContract } from "~/contracts";
import { modal1907EventBus, loadingModalEventBus } from "~/eventbus";
import { useChainConfig } from "~/hooks";

// TODO: This page will be seperated from UI things
export const useAuctionContractAdapter = (auction: any, deps: any[] = []) => {
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
				...auction.balances || [],
			];
		}
		return auction.balances || [];
	});

	const userBalance = useQuery(
		["balance", connectWallet.address, auction.id],
		() => {
			return balanceClient.getBalanceByAuctionId(auction.id, connectWallet.address).then(res => res.data);
		},
		{
			enabled: connectWallet.isConnected,
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

	const deposit = useCallback(
		async (params: { offer: number }) => {
			if (!connectWallet.isConnected) {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
				});
				return;
			}

			await switchToNetwork();
			const balance = Number((userBalance as any).data?.balance?.toFixed?.(2)) || 0;

			const newOffer = (params.offer - balance).toFixed(2);
			const fbTokenAllowance = await fbTokenContract.approveAuctionContract(params.offer);

			if (fbTokenAllowance.isError) {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: fbTokenAllowance.errorMessage ?? "Hata",
				});
				return;
			}
			try {
				loadingModalEventBus.publish("loadingmodal.open", { message: "Açık artırma teklifiniz yükleniyor..." });

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
					const message = balance
						? "Açık artırma ücretiniz güncellendi"
						: "Açık artırmaya başarıyla katıldınız.";

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
		},
		[auctionContract, fbTokenContract, balances, userBalance, auction, ...deps],
	);

	const buyNow = useCallback(async () => {
		if (!connectWallet.isConnected) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
			});
			return;
		}
		await switchToNetwork();
		const fbTokenAllowance = await fbTokenContract.approveAuctionContract(auction.buyNowPrice as number);

		if (fbTokenAllowance.isError) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: fbTokenAllowance.errorMessage ?? "Hata",
			});
			return;
		}
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
	}, [auctionContract, auction, ...deps]);

	useEffect(() => {
		if (!auction) {
			return;
		}
		let balances;
		if (auction.isSelled) {
			balances = [
				{
					id: "asdnfasdf",
					balance: auction.buyNowPrice,
					userAddress: auction.selledToAddress,
				},
				...auction.balances || [],
			];
		} else {
			balances = auction.balances || [];
		}

		setBalances(balances);
	}, [auction, ...deps]);

	return { deposit, buyNow };
};
