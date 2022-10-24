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
				...(auction.balances || []),
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
			enabled: connectWallet.isConnected && !!auction.id,
		},
	);

	const auctionHighestBalances = useQuery(
		["balances", auction.id],
		() => {
			return auctionClient.getHighestBalancesByAuctionId(auction.id).then(res => res.data);
		},
		{
			enabled: auction.isActive && !auction.isSelled && !!auction.id,
		},
	);

	const { data: fbTokenAllowanceData, error } = useQuery(
		["fbTokenAllowance", connectWallet.address],
		() => {
			return fbTokenContract.getAuctionContractAllowance({
				address: connectWallet.address,
			});
		},
		{
			enabled: connectWallet.isConnected && fbTokenContract.isConnected,
		},
	);

	console.log("fbTokenAllowanceData", error);

	const deposit = useCallback(
		async (params: { offer: number }) => {
			if (!connectWallet.isConnected) {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
				});
				return;
			}

			if (!fbTokenAllowanceData || fbTokenAllowanceData.allowance === undefined) {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: "İşlemi gerçekleştirebilmek için FB Token izninizin olması gerekiyor.",
				});
				return;
			}

			const balance = Number((userBalance as any).data?.balance?.toFixed?.(2)) || 0;

			const newOffer = Number((params.offer - balance).toFixed(2));
			const increaseByAllowance = newOffer - fbTokenAllowanceData.allowance;

			try {
				loadingModalEventBus.publish("loadingmodal.open", { message: "Açık artırma teklifiniz yükleniyor..." });
				await switchToNetwork();

				if (increaseByAllowance >= newOffer) {
					const fbTokenAllowance = await fbTokenContract.approveAuctionContract(increaseByAllowance);

					if (fbTokenAllowance.isError) {
						modal1907EventBus.publish("modal.open", {
							isSucceed: false,
							description: fbTokenAllowance.errorMessage ?? "Hata",
						});
						return;
					}
				}
			} catch (e: any) {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: "Allowance esnasında bir hata oluştu",
				});
				return;
			} finally {
				loadingModalEventBus.publish("loadingmodal.close");
			}

			try {
				loadingModalEventBus.publish("loadingmodal.open", { message: "Açık artırma teklifiniz yükleniyor..." });

				await switchToNetwork();
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

	useEffect(() => {
		if (!auction) {
			return;
		}
		let balances;
		if (auction.isSelled) {
			balances = [
				{
					id: "sdnfasdf",
					balance: auction.buyNowPrice,
					userAddress: auction.selledToAddress,
				},
				...(auction.balances || []),
			];
		} else {
			balances = auction.balances || [];
		}

		setBalances(balances);
	}, [auction, ...deps]);

	return { deposit };
};
