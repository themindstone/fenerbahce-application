import { ethers } from "ethers";

export type ContractName = "Auction" | "FBToken";

export type ContractsStateType = { [key in ContractName]: ethers.Contract | null };

export interface IRegistry {
	name: ContractName;
	address: string;
	abi: ethers.ContractInterface;
}

export interface ContractsContextInterface {
	connectContractIfNotConnected: (contractName: ContractName) => void;
	contracts: ContractsStateType;
}

export interface ContractsProviderProps {
	children: React.ReactNode;
}
