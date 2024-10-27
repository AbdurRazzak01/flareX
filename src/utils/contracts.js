import { BrowserProvider, Contract } from "ethers";
import GAEHEscrowABI from "../contracts/GAEHEscrow.json";
import MockStablecoinABI from "../contracts/MockStableCoin.json"; // Import MockStablecoin ABI
import FtsoV2FeedConsumerABI from "../contracts/FtsoV2FeedConsumer.json";
import { BigNumber } from "ethers";

// Ensure these are defined in your .env file
const GAEHEscrowAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const MockStablecoinAddress = process.env.REACT_APP_STABLECOIN_ADDRESS; // Stablecoin address from .env
const FtsoV2FeedConsumerAddress = process.env.REACT_APP_FTSOV2FEED_CONSUMER_ADDRESS;

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("No crypto wallet found. Please install it.");
  }
  return new BrowserProvider(window.ethereum); // Connects to MetaMask
};

export const getSigner = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []); // Prompt user to connect wallet
  return provider.getSigner(); // Provides signer for transactions
};

export const getGAEHEscrowContract = async () => {
  const signer = await getSigner();
  return new Contract(GAEHEscrowAddress, GAEHEscrowABI.abi, signer);
};

export const getMockStablecoinContract = async () => {
  const provider = getProvider(); // Reuse the getProvider function
  const signer = await provider.getSigner(); // Await the signer to resolve the Promise

  if (!MockStablecoinAddress) {
    throw new Error("Stablecoin contract address is missing.");
  }

  return new Contract(MockStablecoinAddress, MockStablecoinABI.abi, signer); // Use the stablecoin ABI here
};


export const getFtsoV2FeedConsumerContract = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return new Contract(FtsoV2FeedConsumerAddress, FtsoV2FeedConsumerABI.abi, signer);
};

export const getCurrentPrice = async () => {
  try {
    const contract = await getFtsoV2FeedConsumerContract();

    console.log('adddr', await contract.getAddress());
    const sth = await contract.getCurrentPrice();
    console.log('here', sth)
    const price = parseInt(sth[0].toString()) 
    const decimals = parseInt(sth[1].toString())
    const timestamp = sth[2]
    const adjustedPrice = (price / Math.pow(10, decimals)).toString();
    return { adjustedPrice: adjustedPrice, timestamp: timestamp.toString() };
  } catch (error) {
    console.error("Error fetching current price:", error);
    throw error;
  }
};
