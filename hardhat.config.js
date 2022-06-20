/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    coeptix: {
      url: "https://ethernode.coeptix.net",
      accounts: [ "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/7b16e033fae342cd8afa67a9d340aaac",
      accounts: [ "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"]
  },
    hardhat: {
      // See its defaults
    }
},
  paths: {
    artifacts: "./backend/artifacts",
    sources: "./backend/contracts",
    cache: "./backend/cache",
    tests: "./backend/test"
  },
  etherscan: {
    apiKey: {
        mainnet: "",
        ropsten: "",
        rinkeby: "",
        kovan: "",
        coeptix: "bohx4Gaej6pheing1leiti9roo6eimae"

    },
    customChains: [
        {
            network: "coeptix",
            chainId: 35478,
            urls: {
                apiURL: "https://etherapi.coeptix.net/api",
                browserURL: "https://etherscan.coeptix.net",
            }
        }
    ]

    }
};
