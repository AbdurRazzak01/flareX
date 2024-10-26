const { ethers, run } = require("hardhat");


async function main() {
  const stablecoinAddress = "0x8aa8b6b6D972Ade7F862Ffc9DD55ed7C212705CA";
  const insuranceOracleAddress = "0x884aF8A58E156EC4Aa19929E921AF0Fa8c1218bB";

  const ContractFactory = await ethers.getContractFactory("GAEHEscrow");
  const contract = await ContractFactory.deploy(stablecoinAddress, insuranceOracleAddress);

  await contract.waitForDeployment();
  console.log("GAEHEscrow deployed to:", await contract.getAddress());

  try {
    const result = await run("verify:verify", {
        address: await contract.getAddress(),
        constructorArguments: [stablecoinAddress, insuranceOracleAddress],
    })

    console.log(result)
  } catch (e) {
      console.log(e.message)
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
