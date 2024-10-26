const { ethers, run } = require("hardhat");

async function main() {
  // Replace this with the address of the actual FtsoV2Interface implementation or the mock
  const ftsoAddress = "0x01464c522f55534400000000000000000000000000";

  const FtsoV2FeedConsumer = await ethers.getContractFactory("FtsoV2FeedConsumer");
  const ftsoConsumer = await FtsoV2FeedConsumer.deploy();

  await ftsoConsumer.waitForDeployment();
  console.log("FtsoV2FeedConsumer deployed to:", await ftsoConsumer.getAddress());


  try {
    const result = await run("verify:verify", {
        address: await await ftsoConsumer.getAddress(),
        constructorArguments: [],
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
