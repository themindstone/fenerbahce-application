import { IChain } from "~/interfaces";

export const switchToNetwork = async (chain: IChain) => {
	if (window.ethereum) {

		const ethereum = window.ethereum as any;
		const chainId = await ethereum.request({ method: "eth_chainId" })
	
		if (chainId === chain.chainId) {
			return;
		}

		if (chain.isDefaultNetwork) {

			await ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{
				   chainId: chain.chainId
				}]
			 })
		}
		else {
			const chainObj: Partial<IChain> = Object.assign({}, chain);
			delete chainObj["isDefaultNetwork"]
			await ethereum.request({ method: "wallet_addEthereumChain", params: [chainObj] });
		}
	}
};
