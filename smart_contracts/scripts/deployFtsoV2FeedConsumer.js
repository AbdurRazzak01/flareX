const { ethers } = require("hardhat");

async function main() {
  // Replace this with the address of the actual FtsoV2Interface implementation or the mock
  const ftsoAddress = "0xYourFtsoV2MockOrRealAddress";

  const FtsoV2FeedConsumer = await ethers.getContractFactory("FtsoV2FeedConsumer");
  const ftsoConsumer = await FtsoV2FeedConsumer.deploy(ftsoAddress);

  await ftsoConsumer.waitForDeployment();
  console.log("FtsoV2FeedConsumer deployed to:", await ftsoConsumer.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
