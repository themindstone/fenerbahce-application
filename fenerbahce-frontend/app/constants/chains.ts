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
	isDefaultNetwork: true,
	chainId: "0x1",
};

export const testnetChain: IChain = {
	isDefaultNetwork: true,
	chainId: `0x${(5).toString(16)}`,
};
