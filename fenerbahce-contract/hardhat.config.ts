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
			// from: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
			accounts: [
				"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
				// "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07",
				// "0x15614556be13730e9e8d6eacc1603143e7b96987429df8726384c2ec4502ef6e",
				// "0x31b571bf6894a248831ff937bb49f7754509fe93bbd2517c9c73c4144c0e97dc",
				// "0x6934bef917e01692b789da754a0eae31a8536eb465e7bff752ea291dad88c675",
				// "0xe700bdbdbc279b808b1ec45f8c2370e4616d3a02c336e68d85d4668e08f53cff",
				// "0xbbc2865b76ba28016bc2255c7504d000e046ae01934b04c694592a6276988630",
				// "0xcdbfd34f687ced8c6968854f8a99ae47712c4f4183b78dcc4a903d1bfe8cbf60",
				// "0x86f78c5416151fe3546dece84fda4b4b1e36089f2dbc48496faf3a950f16157c",
				// "0x750839e9dbbd2a0910efe40f50b2f3b2f2f59f5580bb4b83bd8c1201cf9a010a",
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
