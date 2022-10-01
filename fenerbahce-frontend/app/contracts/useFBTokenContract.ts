import { ethers } from "ethers";
import { useCallback } from "react";
import { useContract } from "~/context";
import { auctionAddress } from "~/data";
import { FBTokenContractFunctions, FBTokenContractErrors, FBTokenGetAuctionContractAllowanceDTO } from "~/interfaces";

export const FBTokenContractErrorsEnglish: FBTokenContractErrors = {
	UnknownError: "An error occured",
};

export const FBTokenContractErrorsTurkish: FBTokenContractErrors = {
	UnknownError: "Bilinmeyen bir hata oluştu.",
};

export const getFBTokenContractErrorMessage = (e: string | null) => {
	if (typeof e !== "string") {
		return;
	}

	for (const [k, v] of Object.entries(FBTokenContractErrorsEnglish)) {
		if (e.includes(v)) {
			return FBTokenContractErrorsTurkish[k as keyof FBTokenContractErrors];
		}
	}

	return FBTokenContractErrorsTurkish.UnknownError;
};

export const useFBTokenContract = (): FBTokenContractFunctions => {
	const { contract } = useContract("FBToken");

	const approveAuctionContract = useCallback(
		async (newOffer: number) => {
			if (!contract) {
				return {
					isError: true,
					errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
				};
			}

			try {
				const transaction = await contract.approve(
					auctionAddress[config.NODE_ENV],
					ethers.utils.parseUnits(newOffer.toString(), "18") ?? ethers.constants.MaxUint256,
				);
				const tx = await transaction.wait();

				return {
					tx,
					isError: false,
				};
			} catch (e: any) {
				console.log(e)
				return {
					isError: true,
					errorMessage: getFBTokenContractErrorMessage(e.message),
				};
			}
		},
		[contract],
	);

	const getAuctionContractAllowance = useCallback(
		async ({ address }: FBTokenGetAuctionContractAllowanceDTO) => {
			if (!contract) {
				return {
					isError: true,
					errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
				};
			}

			try {
				const res = await contract.allowance(address, auctionAddress[config.NODE_ENV]);
				const allowance = Number(ethers.utils.formatEther(res));

				return {
					allowance,
					isError: false,
				};
			} catch (e: any) {
				console.log(e);
				return {
					isError: true,
				};
			}
		},
		[contract],
	);

	return {
		approveAuctionContract,
		getAuctionContractAllowance,
		isConnected: !!contract,
	};
};
