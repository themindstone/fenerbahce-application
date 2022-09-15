import { ethers } from "ethers";

export interface FBTokenContractReturnType {
	tx?: ethers.Transaction;
	isError: boolean;
	errorMessage?: string;
}

export interface FBTokenContractFunctions {
	approveAuctionContract: () => Promise<FBTokenContractReturnType>;
}
