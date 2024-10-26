require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    flareCoston2: {
        url: "https://coston2-api.flare.network/ext/C/rpc",

      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
