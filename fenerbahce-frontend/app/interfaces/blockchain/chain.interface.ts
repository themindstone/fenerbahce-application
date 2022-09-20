export interface IChain {
	isDefaultNetwork: boolean;
	chainId: string;
	chainName?: string;
	rpcUrls?: string[];
    blockExplorerUrls?: string[];
	nativeCurrency?: { name: string; symbol: string; decimals: number };
}
