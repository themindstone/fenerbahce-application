import { IChain } from "~/interfaces";

export const checkIfIsCorrectNetwork = async (chain: IChain): Promise<boolean> => {
	if (!window.ethereum) {
		return false;
	}
	const chainId = await window.ethereum.request({ method: "eth_chainId" });

	if (chainId === chain.chainId) {
		return true;
	}

	return false;
};

export const switchToNetwork = async (chain: IChain) => {
	if (window.ethereum) {
		if (await checkIfIsCorrectNetwork(chain)) {
			return;
		}

		if (chain.isDefaultNetwork) {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [
					{
						chainId: chain.chainId,
					},
				],
			});
		} else {
			const chainObj: Partial<IChain> = Object.assign({}, chain);
			delete chainObj["isDefaultNetwork"];
			await window.ethereum.request({ method: "wallet_addEthereumChain", params: [chainObj] });
		}
	}
};
