import React, { useState, useEffect } from "react";
import { parseEther, formatUnits, isAddress } from "ethers";
import { getGAEHEscrowContract, getMockStablecoinContract, getProvider } from "../utils/contracts";

const EscrowManager = ({ account }) => {
  const [amount, setAmount] = useState("");
  const [escrowId, setEscrowId] = useState("");
  const [escrowDetails, setEscrowDetails] = useState(null);

  // Hardcoded seller address
  const hardcodedSellerAddress = "0x3016DBeE1F9580638E2691546e8D2df1535B03be"; // replace with actual seller address

  useEffect(() => {
    const connectWallet = async () => {
      const provider = getProvider();
      await provider.send("eth_requestAccounts", []); // Request account access
    };
    connectWallet();
  }, []);

  const approveStablecoin = async () => {
    if (!amount) return alert("Please enter a valid amount.");
    
    const stablecoinContract = await getMockStablecoinContract();
    console.log("Stablecoin Contract Methods:", stablecoinContract.functions); // Debugging output
  
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
  
    const contract = await getGAEHEscrowContract();
    console.log("Available contract functions:", contract.functions); // Log contract functions
  
    try {
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
  
    const contract = await getGAEHEscrowContract();
    try {
      // Convert escrowId to a number if it's stored as a string
      const tx = await contract.adjustPrice(parseInt(escrowId));
      await tx.wait();
      alert("Price Adjusted Successfully!");
    } catch (error) {
      console.error("Error adjusting price:", error);
      alert("Price adjustment failed. Please try again.");
    }
  };
  

  /*
  const adjustPrice = async () => {
  if (!escrowId) return alert("Please enter the escrow ID.");
  
  const contract = await getGAEHEscrowContract();
  try {
    const tx = await contract.adjustPrice(parseInt(escrowId));
    await tx.wait();
    
    // Fetch escrow details again to show the new adjusted price
    const details = await contract.escrows(parseInt(escrowId));
    setEscrowDetails({
      ...details,
      adjustedPrice: formatUnits(details.adjustedPrice, "wei") // Adjust the formatting as needed
    });
    
    alert(`Price Adjusted Successfully! New Price: ${details.adjustedPrice} USD`);
  } catch (error) {
    console.error("Error adjusting price:", error);
    alert("Price adjustment failed. Please try again.");
  }
};

  */
  const finalizeEscrow = async () => {
    if (!escrowId) return alert("Please enter the escrow ID.");
  
    const contract = await getGAEHEscrowContract();
    try {
      // Fetch escrow details to check insurance status
      const details = await contract.escrows(parseInt(escrowId));
      if (!details.insuranceVerified) {  // Adjust the field name if needed
        alert("Insurance must be verified before finalizing the escrow.");
        return;
      }
  
      const tx = await contract.finalizeEscrow(parseInt(escrowId));
      await tx.wait();
      alert("Escrow Finalized Successfully!");
    } catch (error) {
      console.error("Error finalizing escrow:", error);
      alert(`Escrow finalization failed: ${error.reason || "Unknown error"}`);
    }
  };
  

  const cancelEscrow = async () => {
    if (!escrowId) return alert("Please enter the escrow ID.");
  
    const contract = await getGAEHEscrowContract();
    try {
      // Convert escrowId to a number if it's stored as a string
      const tx = await contract.cancelEscrow(parseInt(escrowId));
      await tx.wait();
      alert("Escrow Canceled Successfully!");
    } catch (error) {
      console.error("Error canceling escrow:", error);
      alert("Escrow cancellation failed. Please try again.");
    }
  };
  

  const verifyInsurance = async () => {
    if (!escrowId) return alert("Please enter the escrow ID.");
  
    const contract = await getGAEHEscrowContract();
    try {
      // Ensure that the escrow is adjusted before calling verifyInsurance
      const details = await contract.escrows(parseInt(escrowId));
      if (details.status !== "ADJUSTED") {
        alert("Escrow must be adjusted before verifying insurance.");
        return;
      }
  
      const tx = await contract.verifyInsurance(parseInt(escrowId));
      await tx.wait();
      alert("Insurance Verified Successfully!");
    } catch (error) {
      console.error("Error verifying insurance:", error);
      alert(`Insurance verification failed: ${error.reason || "Unknown error"}`);
    }
  };
  
  

  const fetchEscrowDetails = async () => {
    if (!escrowId) return alert("Please enter the escrow ID.");
  
    const contract = await getGAEHEscrowContract();
    try {
      // Convert escrowId to a number if it's stored as a string
      const details = await contract.escrows(parseInt(escrowId));
      setEscrowDetails(details);
      alert("Escrow details fetched successfully!");
    } catch (error) {
      console.error("Error fetching escrow details:", error);
      alert("Failed to fetch escrow details.");
    }
  };
  /*
  {escrowDetails && (
    <div>
      <h3>Escrow Details:</h3>
      <p><strong>Buyer:</strong> {escrowDetails.buyer}</p>
      <p><strong>Seller:</strong> {escrowDetails.seller}</p>
      <p><strong>Amount:</strong> {formatUnits(escrowDetails.amount, "ether")} ETH</p>
      <p><strong>Adjusted Price (USD):</strong> {escrowDetails.adjustedPrice || "Not adjusted yet"}</p>
      <p><strong>Status:</strong> {escrowDetails.status}</p>
      <p><strong>Last Price Update:</strong> {escrowDetails.lastPriceUpdate}</p>
    </div>
  )}*/
  
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