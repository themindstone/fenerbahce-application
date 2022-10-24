import { ethers } from "ethers";

export interface FBTokenGetAuctionContractAllowanceDTO {
	address: string;
}

export interface FBTokenContractFunctions {
	approveAuctionContract: (
		newOffer: number,
	) => Promise<{ tx?: ethers.Transaction; isError: boolean; errorMessage?: string }>;
	getAuctionContractAllowance: (
		params: FBTokenGetAuctionContractAllowanceDTO,
	) => Promise<{ allowance?: number; isError: boolean; errorMessage?: string }>;
	isConnected: boolean;
}

export interface FBTokenContractErrors {
	UnknownError: string;
	InsufficentBalance: string;
	UserDeniedTransaction: string;
}
