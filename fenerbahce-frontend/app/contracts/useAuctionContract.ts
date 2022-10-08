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

	// this will deposit with the bid increment
	const deposit = useCallback(
		async ({ auctionId, value }: AuctionContractDepositDTO): Promise<AuctionContractFunctionReturnType> => {
			if (!contract) {
				return { isError: true, errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor." };
			}

			try {
				const transaction = await contract.deposit(auctionId, ethers.utils.parseUnits(value, "18"), { gasLimit: 10000000 });
				const tx = await transaction.wait();
				return { tx, isError: false };
			} catch (e: any) {
				return { isError: true, errorMessage: getAuctionContractErrorMessage(e.message as string) };
			}
		},
		[contract],
	);

	const buyNow = useCallback(
		async ({ auctionId }: AuctionContractBuyNowDTO): Promise<AuctionContractFunctionReturnType> => {
			if (!contract) {
				return { isError: true };
			}
			try {
				const transaction = await contract.buyNow(auctionId);

				const tx = await transaction.wait();
				return { tx, isError: false };
			} catch (e: any) {
				return { errorMessage: getAuctionContractErrorMessage(e.message as string), isError: true };
			}
		},
		[contract],
	);

	const updateBuyNowPrice = useCallback(
		async ({
			auctionId,
			newBuyNowPrice,
		}: AuctionContractUpdateBuyNowPriceDTO): Promise<AuctionContractFunctionReturnType> => {
			if (!contract) {
				return { isError: true };
			}
			try {
				const transaction = await contract.updateBuyNowPrice(
					auctionId,
					ethers.utils.parseUnits(newBuyNowPrice, "18"),
				);
				const tx = await transaction.wait();

				return { tx, isError: false };
			} catch (e: any) {
				const errorMessage = getAuctionContractErrorMessage(e.message as string);
				return { isError: true, errorMessage };
			}
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
