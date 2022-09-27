import { useMemo } from "react";
import { testnetChain } from "~/constants";
import { IChain } from "~/interfaces";
import { switchToNetwork } from "~/utils";

export const useChainConfig = () => {
	const chainConfig: IChain = useMemo(() => {
		if (config.NODE_ENV === "development") {
			return testnetChain;
		} else if (config.NODE_ENV === "production") {
			return testnetChain;
		}

		return testnetChain;
	}, []);

	return { switchToNetwork: async () => await switchToNetwork(chainConfig) };
};
