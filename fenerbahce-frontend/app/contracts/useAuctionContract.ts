import { ethers } from "ethers";
import { useCallback } from "react";
import { useContract } from "~/context";
import {
	AuctionContractBuyNowDTO,
	AuctionContractDepositDTO,
	AuctionContractFunctionReturnType,
	AuctionContractFunctions,
	AuctionContractUpdateBuyNowPriceDTO,
} from "~/interfaces";
import { getAuctionContractErrorMessage } from "~/utils";

export const useAuctionContract = (): AuctionContractFunctions => {
	const { contract } = useContract("Auction");

	const deposit = useCallback(
		async ({ auctionId, value }: AuctionContractDepositDTO): Promise<AuctionContractFunctionReturnType> => {
			if (!contract) {
				return {
					isError: true,
					errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
				};
			}

			let error, transaction;

			try {
				const tx = await contract.depositToAuction(auctionId, ethers.utils.parseUnits(value, "18"));
				transaction = await tx.wait();
			} catch (e: any) {
				error = getAuctionContractErrorMessage(e.message as string);
			}

			return {
				tx: transaction,
				isError: !!error,
				errorMessage: error,
			};
		},
		[contract],
	);

	const buyNow = useCallback(
		async ({ auctionId }: AuctionContractBuyNowDTO): Promise<AuctionContractFunctionReturnType> => {
			if (!contract) {
				return {
					isError: true,
					errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
				};
			}

			let error;
			let transaction;

			try {
				const tx = await contract.buyNow(auctionId);

				transaction = await tx.wait();
			} catch (e: any) {
				error = getAuctionContractErrorMessage(e.message as string);
			}

			return {
				tx: transaction,
				isError: !!error,
				errorMessage: error,
			};
		},
		[contract],
	);

	const updateBuyNowPrice = useCallback(
		async ({
			auctionId,
			newBuyNowPrice,
		}: AuctionContractUpdateBuyNowPriceDTO): Promise<AuctionContractFunctionReturnType> => {
			if (!contract) {
				return {
					isError: true,
					errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
				};
			}

			let error, transaction;

			try {
				const tx = await contract.updateBuyNowPrice(auctionId, ethers.utils.parseUnits(newBuyNowPrice, "18"));

				transaction = await tx.wait();
			} catch (e: any) {
				error = getAuctionContractErrorMessage(e.message as string);
			}

			return {
				tx: transaction,
				isError: !!error,
				errorMessage: error,
			};
		},
		[contract],
	);

	return {
		deposit,
		buyNow,
		updateBuyNowPrice,
		isConnected: !!contract,
	};
};
