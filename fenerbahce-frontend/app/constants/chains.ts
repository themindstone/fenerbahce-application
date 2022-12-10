import { IChain } from "~/interfaces";

export const localChain: IChain = {
	isDefaultNetwork: false,
	chainId: `0x${(8178).toString(16)}`,
	chainName: "Custom RPC",
	rpcUrls: ["http://localhost:8545"],
	nativeCurrency: {
		name: "GO",
		symbol: "GO",
		decimals: 18,
	},
};

export const mainnetChain: IChain = {
	isDefaultNetwork: false,
	chainId: "0xa86a",
	chainName: "Avalanche Mainnet C-Chain",
	nativeCurrency: {
		name: "Avalanche",
		symbol: "AVAX",
		decimals: 18,
	},
	rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
	blockExplorerUrls: ["https://snowtrace.io/"],
};

export const testnetChain: IChain = {
	isDefaultNetwork: false,
	chainId: "0xa869",
	chainName: "Avalanche Testnet C-Chain",
	nativeCurrency: {
		name: "Avalanche",
		symbol: "AVAX",
		decimals: 18,
	},
	rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
	blockExplorerUrls: ["https://testnet.snowtrace.io/"],
};
