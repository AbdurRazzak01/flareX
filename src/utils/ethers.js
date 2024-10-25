import { JsonRpcProvider } from "ethers";

export const getProvider = () => {
  return new JsonRpcProvider(process.env.REACT_APP_FLARE_RPC_URL);
};

export const getSigner = () => {
  const provider = getProvider();
  return provider.getSigner();
};
