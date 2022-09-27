import { ethers } from "ethers";

// export interface FBTokenContractTransactionReturnType {
// 	tx?: ethers.Transaction;
// 	isError: boolean;
// 	errorMessage?: string;
// };

export interface FBTokenGetAuctionContractAllowanceDTO {
	address: string;
};

// export interface FBTokenContractQueryReturnType {
// 	res?: any;
// 	isError: boolean;
// 	errorMessage?: string;
// }


export interface FBTokenContractFunctions {
	approveAuctionContract: (newOffer?: number) => Promise<{ tx?: ethers.Transaction, isError: boolean, errorMessage?: string; }>;
	getAuctionContractAllowance: (params: FBTokenGetAuctionContractAllowanceDTO) => Promise<{ allowance?: number, isError: boolean, errorMessage?: string }>;
	isConnected: boolean;
};


export interface FBTokenContractErrors {
	UnknownError: string;
};
