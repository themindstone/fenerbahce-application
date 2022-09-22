import { useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { testnetChain, localChain, mainnetChain } from "~/constants";
import { IChain } from "~/interfaces";
import { switchToNetwork } from "~/utils";

export const useChainConfig = () => {
	const { config } = useLoaderData();

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
