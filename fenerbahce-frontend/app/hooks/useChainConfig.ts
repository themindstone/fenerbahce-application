import { useMemo } from "react";
import { localChain, mainnetChain, testnetChain } from "~/constants";
import { IChain } from "~/interfaces";
import { switchToNetwork, checkIfIsCorrectNetwork } from "~/utils";

export const useChainConfig = () => {
	const chainConfig: IChain = useMemo(() => {
		if (config.NODE_ENV === "development") {
			return localChain;
		} else if (config.NODE_ENV === "test") {
			return testnetChain;
		}

		return mainnetChain;
	}, []);

	return {
		switchToNetwork: async () => await switchToNetwork(chainConfig),
		checkIfIsCorrectNetwork: async () => await checkIfIsCorrectNetwork(chainConfig),
	};
};
