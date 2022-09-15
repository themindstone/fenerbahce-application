import { ethers } from "ethers";
import { useContract } from "~/context";
import { auctionAddress } from "~/data";
import { FBTokenContractFunctions, FBTokenContractReturnType } from "~/interfaces";

export const useFBTokenContract = (): FBTokenContractFunctions => {
	const { contract } = useContract("FBToken");
    
	const approveAuctionContract = async (): Promise<FBTokenContractReturnType> => {
		if (!contract) {
			return {
				isError: true,
				errorMessage: "İşlem yapabilmek için cüzdanınızı bağlamanız gerekiyor.",
			};
		}

		const transaction = await contract.approve(auctionAddress, ethers.constants.MaxUint256);
        const tx = await transaction.wait();

		return {
            tx,
			isError: false,
		};
	};

	return {
		approveAuctionContract,
	};
};
