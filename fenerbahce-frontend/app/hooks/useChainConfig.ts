import { useMemo } from "react";
import { localChain, testnetChain } from "~/constants";
import { IChain } from "~/interfaces";
import { switchToNetwork } from "~/utils";

export const useChainConfig = () => {
	const chainConfig: IChain = useMemo(() => {
		if (config.NODE_ENV === "development") {
			return localChain;
		} else if (config.NODE_ENV === "production") {
			return testnetChain;
		}

		return testnetChain;
	}, []);

	return { switchToNetwork: async () => await switchToNetwork(chainConfig) };
};
