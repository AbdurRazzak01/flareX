import { ethers } from "ethers";
import GAEHEscrowABI from "../contracts/GAEHEscrow.json";
import FtsoV2FeedConsumerABI from "../contracts/FtsoV2FeedConsumer.json";
import { getProvider, getSigner } from "./ethers";

const GAEHEscrowAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const FtsoV2FeedConsumerAddress = process.env.REACT_APP_FTSO_CONTRACT_ADDRESS;

export const getGAEHEscrowContract = () => {
  const provider = getSigner();
  return new ethers.Contract(GAEHEscrowAddress, GAEHEscrowABI.abi, provider);
};

export const getFtsoV2FeedConsumerContract = () => {
  const provider = getProvider();
  return new ethers.Contract(FtsoV2FeedConsumerAddress, FtsoV2FeedConsumerABI.abi, provider);
};
