import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-deploy";
import type { HardhatUserConfig } from "hardhat/config";
import type { NetworkUserConfig } from "hardhat/types";

import "./tasks/accounts";
import "./tasks/lock";

dotenv.config();

const chainIds = {
  hardhat: 31337,
  mainnet: 1,
  sepolia: 11155111,
};

const accounts = () => {
  const pk = process.env.PRIVATE_KEY;
  return pk ? [pk] : [];
};

const getChainConfig = (chain: keyof typeof chainIds): NetworkUserConfig => {
  const alchemyUrl = `https://eth-${chainIds[chain]}.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;

  return {
    accounts: accounts(),
    chainId: chainIds[chain],
    url: alchemyUrl,
  };
};

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY!,
      sepolia: process.env.ETHERSCAN_API_KEY!,
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  networks: {
    hardhat: {
      chainId: chainIds.hardhat,
    },
    mainnet: getChainConfig("mainnet"),
    sepolia: getChainConfig("sepolia"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.20",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;
