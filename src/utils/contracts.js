import { BrowserProvider, Contract } from "ethers";
import GAEHEscrowABI from "../contracts/GAEHEscrow.json";
import MockStablecoinABI from "../contracts/MockStableCoin.json"; // Import MockStablecoin ABI
import FtsoV2FeedConsumerABI from "../contracts/FtsoV2FeedConsumer.json";

// Ensure these are defined in your .env file
const GAEHEscrowAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const MockStablecoinAddress = process.env.REACT_APP_STABLECOIN_ADDRESS; // Stablecoin address from .env

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

export const getMockStablecoinContract = () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  if (!MockStablecoinAddress) {
    throw new Error("Stablecoin contract address is missing.");
  }
  return new Contract(MockStablecoinAddress, MockStablecoinABI.abi, signer); // Use the stablecoin ABI here
};

/*
export const getFtsoV2FeedConsumerContract = async () => {
  const provider = getProvider();
  return new Contract(FtsoV2FeedConsumerAddress, FtsoV2FeedConsumerABI.abi, provider);
};
*/
