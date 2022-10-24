import { useMemo } from "react";
import { localChain, mainnetChain, testnetChain } from "~/constants";
import { IChain } from "~/interfaces";
import { switchToNetwork } from "~/utils";

export const useChainConfig = () => {
	const chainConfig: IChain = useMemo(() => {
		console.log("config.NODE_ENV", config.NODE_ENV);
		if (config.NODE_ENV === "development") {
			return localChain;
		} else if (config.NODE_ENV === "test") {
			return testnetChain;
		}

		return mainnetChain;
	}, []);

	return { switchToNetwork: async () => await switchToNetwork(chainConfig) };
};
