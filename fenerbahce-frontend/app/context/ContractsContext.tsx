import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { auctionABI, auctionAddress } from "~/data";
import { connectContracts } from "~/hooks/useContract";
import { useConnectWallet } from "./MetamaskConnectContext";

type ContractName = "Auction";

type ContractsStateType = { [key in ContractName]: ethers.Contract | null };

interface IRegistry {
    name: ContractName;
    address: string;
    abi: ethers.ContractInterface;
}

interface ContractsContextInterface {
    connectContractIfNotConnected: (contractName: ContractName) => void;
    contracts: ContractsStateType
}

const registry: IRegistry[] = [
    { name: "Auction", address: auctionAddress, abi: auctionABI },
];


const ContractsContext = React.createContext<ContractsContextInterface>({
    connectContractIfNotConnected: (contractName: ContractName) => {},
    contracts: {
        Auction: null
    }
});


export const ContractsProvider = () => {

    const { isConnected } = useConnectWallet();

    const [contracts, setContracts] = useState<ContractsStateType>({
        Auction: null
    });

    const [contractQueue, setContractQueue] = useState<ContractName[]>([]);

    const connectContractIfNotConnected = (contractName: ContractName) => {
        if (!isConnected &&
            !contractQueue.includes(contractName)) {
            setContractQueue(prev => [...prev, contractName]);
            throw new Error("First, you need to connect your wallet")
        }
        else if (!isConnected) {
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
            [contractName]: contract
        }));
    };


    const value = { connectContractIfNotConnected, contracts };

    return (<ContractsContext.Provider value={value}>

    </ContractsContext.Provider>);
};

export const useContract = (contractName: ContractName): ethers.Contract | null => {
    const { contracts, connectContractIfNotConnected } = useContext(ContractsContext);

    if (!contracts[contractName]) {
        connectContractIfNotConnected(contractName);
    }

    return contracts[contractName];
};
