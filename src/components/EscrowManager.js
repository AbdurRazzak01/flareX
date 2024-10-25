import React, { useState } from "react";
import { ethers } from "ethers";
import { getGAEHEscrowContract, getFtsoV2FeedConsumerContract } from "../utils/contracts";

const EscrowManager = ({ account }) => {
  const [amount, setAmount] = useState("");
  const [seller, setSeller] = useState("");
  const [escrowId, setEscrowId] = useState("");
  const [price, setPrice] = useState(null);

  const createEscrow = async () => {
    if (!amount || !seller) return alert("Please enter a valid amount and seller address.");

    const contract = getGAEHEscrowContract();
    try {
      const tx = await contract.createEscrow(seller, ethers.utils.parseEther(amount), 5);
      await tx.wait();
      alert("Escrow Created Successfully!");
    } catch (error) {
      console.error(error);
      alert("Escrow creation failed. Please try again.");
    }
  };

  const adjustPrice = async () => {
    if (!escrowId) return alert("Please enter the escrow ID.");

    const contract = getGAEHEscrowContract();
    try {
      const tx = await contract.adjustPrice(escrowId);
      await tx.wait();
      alert("Price Adjusted Successfully!");
    } catch (error) {
      console.error(error);
      alert("Price adjustment failed. Please try again.");
    }
  };

  const finalizeEscrow = async () => {
    if (!escrowId) return alert("Please enter the escrow ID.");

    const contract = getGAEHEscrowContract();
    try {
      const tx = await contract.finalizeEscrow(escrowId);
      await tx.wait();
      alert("Escrow Finalized Successfully!");
    } catch (error) {
      console.error(error);
      alert("Escrow finalization failed. Please try again.");
    }
  };

  const getCurrentPrice = async () => {
    const contract = getFtsoV2FeedConsumerContract();
    try {
      const [latestPrice] = await contract.getCurrentPrice();
      setPrice(ethers.utils.formatUnits(latestPrice, 2));
    } catch (error) {
      console.error(error);
      alert("Failed to fetch the latest price. Please try again.");
    }
  };

  return (
    <div>
      <h2>Manage Your Escrows</h2>
      <div>
        <input
          placeholder="Seller Address"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        />
        <input
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={createEscrow}>Create Escrow</button>
      </div>
      
      <div>
        <input
          placeholder="Escrow ID"
          value={escrowId}
          onChange={(e) => setEscrowId(e.target.value)}
        />
        <button onClick={adjustPrice}>Adjust Price</button>
        <button onClick={finalizeEscrow}>Finalize Escrow</button>
      </div>

      <div>
        <button onClick={getCurrentPrice}>Get Current Price</button>
        {price && <p>Current Price: {price} USD</p>}
      </div>
    </div>
  );
};

export default EscrowManager;
