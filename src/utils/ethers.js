import { ethers } from "ethers";

export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider(process.env.REACT_APP_FLARE_RPC_URL);
};

export const getSigner = () => {
  const provider = getProvider();
  return provider.getSigner();
};
