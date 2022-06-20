/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

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
};
