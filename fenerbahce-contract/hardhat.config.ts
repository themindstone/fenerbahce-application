import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import dotenv from "dotenv";

// dotenv.config()

interface ENV {
  DEPLOYER_PRIVATE_KEY: string;
  ALCHEMY_API_KEY: string;
}

const getConfig = (): ENV => {
  return {
    DEPLOYER_PRIVATE_KEY: process.env.DEPLOYER_PRIVATE_KEY as string,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY as string,
  };
};

const env = getConfig();
console.log(env)

// console.log(env.DEPLOYER_PRIVATE_KEY)
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
      gasPrice: 225000000000,
      chainId: 8178,
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
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${env.ALCHEMY_API_KEY}`,
      accounts: [env.DEPLOYER_PRIVATE_KEY],
    },
    mainnet: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [env.DEPLOYER_PRIVATE_KEY],
    },
  },
};

export default config;
