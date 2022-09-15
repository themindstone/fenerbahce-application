import { ethers } from "ethers";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { auctionABI, auctionAddress, fbTokenAddress, fbTokenABI } from "~/data";
import { connectContracts } from "~/hooks/useContract";
import { useConnectWallet } from "./MetamaskConnectContext";
import {
	IRegistry,
	ContractsContextInterface,
	ContractsProviderProps,
	ContractName,
	ContractsStateType,
} from "~/interfaces";

const registry: IRegistry[] = [
	{ name: "Auction", address: auctionAddress, abi: auctionABI },
	{ name: "FBToken", address: fbTokenAddress, abi: fbTokenABI },
];

const ContractsContext = React.createContext<ContractsContextInterface>({
	connectContractIfNotConnected: (contractName: ContractName) => {},
	contracts: {
		Auction: null,
		FBToken: null,
	},
});

export const ContractsProvider = ({ children }: ContractsProviderProps) => {
	const { isConnected } = useConnectWallet();

	const [contracts, setContracts] = useState<ContractsStateType>({
		Auction: null,
		FBToken: null,
	});

	const [contractQueue, setContractQueue] = useState<ContractName[]>([]);

	const connectContractIfNotConnected = (contractName: ContractName) => {
		if (!isConnected && !contractQueue.includes(contractName)) {
			setContractQueue(prev => [...prev, contractName]);
			throw new Error("First, you need to connect your wallet");
		} else if (!isConnected) {
			throw new Error("First, you need to connect your wallet");
		}

		const contractInfo = registry.find(item => item.name === contractName);

		if (!contractInfo) {
			throw new Error(`There is no contract in the contract registry with ${contractName} name`);
		}

		const contract = connectContracts(contractInfo.address, contractInfo.abi);

		if (!contract) {
			return;
		}

		setContracts(prev => ({
			...prev,
			[contractName]: contract,
		}));
	};

	const value = { connectContractIfNotConnected, contracts };

	return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>;
};

export const useContract = (
	contractName: ContractName,
): {
	contract: ethers.Contract | null;
	error: any;
} => {
	const { contracts, connectContractIfNotConnected } = useContext(ContractsContext);
	const { isConnected } = useConnectWallet();
	const [error, setError] = useState();

	useEffect(() => {
		if (isConnected) {
			connect();
		}
	}, [isConnected]);

	const connect = useCallback(() => {
		if (isConnected) {
			try {
				connectContractIfNotConnected(contractName);
			} catch (e: any) {
				setError(e);
			}
		}
	}, [isConnected]);

	return {
		contract: contracts[contractName],
		error,
	};
};
