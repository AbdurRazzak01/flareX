const { ethers } = require("hardhat");

async function main() {
  const stablecoinAddress = "0xaAcB12F1Ac0baD56D77c2cfDa0Cf03BeabF0B1BC";
  const insuranceOracleAddress = "0x884aF8A58E156EC4Aa19929E921AF0Fa8c1218bB";

  const ContractFactory = await ethers.getContractFactory("GAEHEscrow");
  const contract = await ContractFactory.deploy(stablecoinAddress, insuranceOracleAddress);

  await contract.waitForDeployment();
  console.log("GAEHEscrow deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});