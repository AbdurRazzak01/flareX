const { ethers } = require("hardhat");

async function main() {
  // Convert 1 million tokens to the correct format
  const initialSupply = ethers.parseUnits("1000000", 18); // Use parseUnits instead of parseEther for ERC20 tokens
  
  // Deploy Mock Stablecoin
  const MockStablecoin = await ethers.getContractFactory("MockStablecoin");
  const stablecoin = await MockStablecoin.deploy(initialSupply); 
  await stablecoin.waitForDeployment();  // Wait for the stablecoin contract to deploy
  console.log("MockStablecoin deployed to:", await stablecoin.getAddress());

  // Deploy Mock Insurance Oracle
  const MockInsuranceOracle = await ethers.getContractFactory("MockInsuranceOracle");
  const insuranceOracle = await MockInsuranceOracle.deploy();
  await insuranceOracle.waitForDeployment(); // Wait for the oracle contract to deploy
  console.log("MockInsuranceOracle deployed to:", await insuranceOracle.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
