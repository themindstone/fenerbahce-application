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
			enabled: connectWallet.isConnected && !!auction.id &&connectWallet.isCorrectNetwork,
			refetchInterval: 10000,
		},
	);

	const auctionHighestBalances = useQuery(
		["balances", auction.id],
		() => {
			return auctionClient.getHighestBalancesByAuctionId(auction.id).then(res => res.data);
		},
		{
			enabled: auction.isActive && !auction.isSelled && !!auction.id && connectWallet.isCorrectNetwork,
			refetchInterval: 10000,
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
			enabled: connectWallet.isConnected && fbTokenContract.isConnected && connectWallet.isCorrectNetwork,
			refetchInterval: 60000,
		},
	);

	const deposit = useCallback(
		async (params: { offer: number }) => {
			if (!connectWallet.isConnected) {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: "????lem yapabilmek i??in c??zdan??n??z?? ba??laman??z gerekiyor.",
				});
				return;
			}

			if (!fbTokenAllowanceData || fbTokenAllowanceData.allowance === undefined) {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: "????lemi ger??ekle??tirebilmek i??in FB Token izninizin olmas?? gerekiyor.",
				});
				return;
			}
			await switchToNetwork();

			const balance = Number((userBalance as any).data?.balance?.toFixed?.(2)) || 0;

			const newOffer = Number((params.offer - balance).toFixed(2));
			const increaseByAllowance = Number((newOffer - fbTokenAllowanceData.allowance).toFixed(2));

			try {
				loadingModalEventBus.publish("loadingmodal.open", { message: "A????k art??rma teklifiniz y??kleniyor..." });

				if (fbTokenAllowanceData.allowance + increaseByAllowance >= newOffer && increaseByAllowance > 0) {
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
					description: "Allowance esnas??nda bir hata olu??tu",
				});
				return;
			} finally {
				loadingModalEventBus.publish("loadingmodal.close");
			}

			try {
				loadingModalEventBus.publish("loadingmodal.open", { message: "A????k art??rma teklifiniz y??kleniyor..." });

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
						? "A????k art??rma ??cretiniz g??ncellendi"
						: "A????k art??rmaya ba??ar??yla kat??ld??n??z.";

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
