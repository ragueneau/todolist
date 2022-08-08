require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.9",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
            accounts: ["0xPRIVATE_KEY_HERE"]
        },
        ganache: {
            url: "http://127.0.0.1:7545"
        },
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/TOKEN_HERE",
            accounts: ["0xPRIVATE_KEY_HERE"]
        },
        coeptix: {
            url: "https://ethernode.coeptix.net",
            accounts: ["0xPRIVATE_KEY_HERE"]
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
                    apiURL: "https://etherscan.coeptix.net/api",
                    browserURL: "https://etherscan.coeptix.net"
                }
            }
        ]
    }
};
