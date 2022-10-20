import { BigNumber, ethers } from "ethers";
import { useCallback } from "react";
import { useContract } from "~/context";
import {
	AuctionContractCreateAuctionDto,
	AuctionContractDepositDTO,
	AuctionContractFunctionReturnType,
	AuctionContractFunctions,
} from "~/interfaces";
import { getAuctionContractErrorMessage } from "~/utils";

export const useAuctionContract = (): AuctionContractFunctions => {
	const { contract } = useContract("Auction");

	const createAuction = useCallback(
		async ({ auctionId }: AuctionContractCreateAuctionDto): Promise<AuctionContractFunctionReturnType> => {
			if (!contract) {
				return { isError: true, errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor." };
			}
			try {
				const transaction = await contract.createAuction(BigNumber.from(auctionId));
				const tx = await transaction.wait();

				return { tx, isError: false };
			} catch (e: any) {
				console.log(e)
				return { isError: true, errorMessage: getAuctionContractErrorMessage(e.message as string) };
			}
		},
		[contract],
	);

	// this will deposit with the bid increment
	const deposit = useCallback(
		async ({ auctionId, value }: AuctionContractDepositDTO): Promise<AuctionContractFunctionReturnType> => {
			if (!contract) {
				return { isError: true, errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor." };
			}

			try {
				const transaction = await contract.deposit(auctionId, ethers.utils.parseUnits(value, "6"));
				const tx = await transaction.wait();
				return { tx, isError: false };
			} catch (e: any) {
				return { isError: true, errorMessage: getAuctionContractErrorMessage(e.message as string) };
			}
		},
		[contract],
	);

	return {
		deposit,
		createAuction,
		isConnected: !!contract,
	};
};
