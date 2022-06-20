const axios = require("axios");
const Config = require("../../config");

// Build and deploy the contract
async function main() {
  const [deployer] = await ethers.getSigners();

  //get the chain id
  const chainId = await ethers.provider.getNetwork().then(function(network) {
    return network.chainId;
  });

  console.log("\n- Le Task Manager -\n");

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", ((await deployer.getBalance())/10 ** 18).toString()+" eth");
  console.log("Deploying on chainId:", chainId, "\n");

  // Marketplace

  const Contract = await ethers.getContractFactory("TaskManager");
  const contract = await Contract.deploy();
  console.log("Deployed contracts:", contract.address);

  saveFrontendFiles(contract , "TaskManager");
  await pushAbiToEtherscan(contract.address, "TaskManager");

}



// Save the abi to a file
function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

//push abi to etherscan.coeptix.net with the axios API
async function pushAbiToEtherscan(address, name) {

  const url = Config.restAPI + "/api?module=contract&action=insertabi&address=" + address + "&apikey=" + Config.ApiKeyToken;

  let contractArtifact = artifacts.readArtifactSync(name);

    //get the chain id
  const chainId = await ethers.provider.getNetwork().then(function(network) {
    return network.chainId;
  });

  contractArtifact.chainId = chainId;

  await axios.post(url, contractArtifact).then(function(response) {
    console.log(name, "abi pushed to etherscan.coeptix.net", response.data.message);
    console.log("https://etherscan.coeptix.net/interface/" + address + "\n");
  }
  ).catch(function(error) {
    console.log('error',error);
  })

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });