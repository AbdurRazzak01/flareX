import React, { useState, useEffect } from "react";
import { parseEther, formatUnits, isAddress } from "ethers";
import { getGAEHEscrowContract, getMockStablecoinContract, getProvider } from "../utils/contracts";

const EscrowManager = ({ account }) => {
  const [amount, setAmount] = useState("");
  const [escrowId, setEscrowId] = useState("");
  const [escrowDetails, setEscrowDetails] = useState(null);

  // Hardcoded seller address
  const hardcodedSellerAddress = "0x07F8e2824850048d9360f09BcE75E5A1e2501d66"; // replace with actual seller address

  useEffect(() => {
    const connectWallet = async () => {
      const provider = getProvider();
      await provider.send("eth_requestAccounts", []); // Request account access
    };
    connectWallet();
  }, []);

  const approveStablecoin = async () => {
    if (!amount) return alert("Please enter a valid amount.");

    const stablecoinContract = getMockStablecoinContract(); // Assume this returns the stablecoin contract
    try {
      const tx = await stablecoinContract.approve(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        parseEther(amount)
      );
      await tx.wait();
      alert("Stablecoin Approved for Escrow Creation!");
    } catch (error) {
      console.error("Error approving stablecoin:", error);
      alert("Stablecoin approval failed. Please try again.");
    }
  };

  const createEscrow = async () => {
    if (!amount) return alert("Please enter a valid amount.");
    if (!isAddress(hardcodedSellerAddress)) return alert("Invalid hardcoded seller address.");

    const contract = getGAEHEscrowContract();
    try {
      // Using the hardcoded seller address
      const tx = await contract.createEscrow(hardcodedSellerAddress, parseEther(amount), { from: account });
      await tx.wait();
      alert("Escrow Created Successfully!");
    } catch (error) {
      console.error("Error creating escrow:", error);
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
      console.error("Error adjusting price:", error);
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
      console.error("Error finalizing escrow:", error);
      alert("Escrow finalization failed. Please try again.");
    }
  };

  const cancelEscrow = async () => {
    if (!escrowId) return alert("Please enter the escrow ID.");

    const contract = getGAEHEscrowContract();
    try {
      const tx = await contract.cancelEscrow(escrowId);
      await tx.wait();
      alert("Escrow Canceled Successfully!");
    } catch (error) {
      console.error("Error canceling escrow:", error);
      alert("Escrow cancellation failed. Please try again.");
    }
  };

  const verifyInsurance = async () => {
    if (!escrowId) return alert("Please enter the escrow ID.");

    const contract = getGAEHEscrowContract();
    try {
      const tx = await contract.verifyInsurance(escrowId);
      await tx.wait();
      alert("Insurance Verified Successfully!");
    } catch (error) {
      console.error("Error verifying insurance:", error);
      alert("Insurance verification failed. Please try again.");
    }
  };

  const fetchEscrowDetails = async () => {
    if (!escrowId) return alert("Please enter the escrow ID.");

    const contract = getGAEHEscrowContract();
    try {
      const details = await contract.escrows(escrowId);
      setEscrowDetails(details);
      alert("Escrow details fetched successfully!");
    } catch (error) {
      console.error("Error fetching escrow details:", error);
      alert("Failed to fetch escrow details.");
    }
  };

  return (
    <div>
      <h2>Manage Your Escrows</h2>
      <div>
        <p>Seller Address: {hardcodedSellerAddress}</p>
        <input
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={approveStablecoin}>Approve Stablecoin</button>
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
        <button onClick={cancelEscrow}>Cancel Escrow</button>
        <button onClick={verifyInsurance}>Verify Insurance</button>
        <button onClick={fetchEscrowDetails}>Fetch Escrow Details</button>
      </div>

      {escrowDetails && (
        <div>
          <h3>Escrow Details:</h3>
          <p><strong>Buyer:</strong> {escrowDetails.buyer}</p>
          <p><strong>Seller:</strong> {escrowDetails.seller}</p>
          <p><strong>Amount:</strong> {formatUnits(escrowDetails.amount, "ether")} ETH</p>
          <p><strong>Status:</strong> {escrowDetails.status}</p>
          <p><strong>Last Price Update:</strong> {escrowDetails.lastPriceUpdate}</p>
        </div>
      )}
    </div>
  );
};

export default EscrowManager;