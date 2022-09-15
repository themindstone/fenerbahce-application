import { ethers } from "ethers";
import { useCallback } from "react";
import { useContract } from "~/context";
import {
	AuctionContractBuyNowDTO,
	AuctionContractDepositDTO,
	AuctionContractErrors,
	AuctionContractFunctionReturnType,
	AuctionContractFunctions,
} from "~/interfaces";

export const AuctionContractErrorsEnglish: AuctionContractErrors = {
	AlreadySelledError: "This is already selled",
	AuctionNotFoundError: "There is no auction like that",
	AuctionFinishedError: "Auction finished",
	AuctionNotStartedError: "Auction have not started yet",
	AuctionStartPriceError: "You need to start auction with auction start price",
	IncreaseByBidIncrementError: "You can only increase auction by bidIncrement",
	UnknownError: "An error occured",
};

export const AuctionContractErrorsTurkish: AuctionContractErrors = {
	AlreadySelledError: "Bu açık artırma zaten satın alındı.",
	AuctionNotFoundError: "Açık artırma bulunamadı.",
	AuctionFinishedError: "Bu açık artırma süresi doldu.",
	AuctionNotStartedError: "Bu açık artırma başlamadı.",
	AuctionStartPriceError: "Bu açık artırmaya minimum açık artırma fiyatı ile başlamanız gerekiyor.",
	IncreaseByBidIncrementError: "Açık artırmaya yalnızca artırma oranı kadar artırma yaparak katılabilirsiniz.",
	UnknownError: "Bilinmeyen bir hata oluştu.",
};

export const getAuctionContractErrorMessage = (e: string | null) => {
	if (typeof e !== "string") {
		return;
	}

	for (const [k, v] of Object.entries(AuctionContractErrorsEnglish)) {
		if (e.includes(v)) {
			return AuctionContractErrorsTurkish[k as keyof AuctionContractErrors];
		}
	}

	return AuctionContractErrorsEnglish.UnknownError;
};

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
				console.log(e);
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
		async ({ auctionId, buyNowPrice }: AuctionContractBuyNowDTO): Promise<AuctionContractFunctionReturnType> => {
			if (!contract) {
				// throw new Error("First, you need to connect contract");
				return {
					isError: true,
					errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
				};
			}

			let error;
			let transaction;

			try {
				const tx = await contract.buyNow(auctionId, {
					value: ethers.utils.parseUnits(buyNowPrice, "18"),
				});

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
	};
};
