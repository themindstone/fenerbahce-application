import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

interface ENV {
	DEPLOYER_PRIVATE_KEY: string
};

const getConfig = (): ENV => {
	return {
		DEPLOYER_PRIVATE_KEY: process.env.DEPLOYER_PRIVATE_KEY as string
	};
};

const env = getConfig();

const config: HardhatUserConfig = {
	solidity: "0.8.9",
	networks: {
		local: {
			url: "http://127.0.0.1:8545",
			gasPrice: 225000000000,
			chainId: 43112,
			accounts: [
				"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
			],
		},
		// fuji: {
		// 	url: "https://api.avax-test.network/ext/bc/C/rpc",
		// 	gasPrice: 225000000000,
		// 	chainId: 43113,
		// 	accounts: [env.DEPLOYER_PRIVATE_KEY]
		// },
		mainnet: {
			url: "https://api.avax.network/ext/bc/C/rpc",
			gasPrice: 225000000000,
			chainId: 43114,
			accounts: [],
		},
	},
};

export default config;
