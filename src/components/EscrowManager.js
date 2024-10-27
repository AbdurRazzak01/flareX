import React, { useState, useEffect } from "react";
import { parseEther, formatUnits, isAddress } from "ethers";
import { getGAEHEscrowContract, getMockStablecoinContract, getCurrentPrice, getProvider } from "../utils/contracts";
import "../styles/EscrowManager.css"; // Import CSS file
import Ai from "./Ai";


const EscrowManager = ({ account }) => {
  const [amount, setAmount] = useState("", "", "");
  const [escrowId, setEscrowId] = useState("");
  const [escrowDetails, setEscrowDetails] = useState(null);
  const [priceData, setPriceData] = useState({ adjustedPrice: null, timestamp: null });
  const [role, setRole] = useState("buyer"); // "buyer" or "seller" role toggle

  // Hardcoded seller address
  const hardcodedSellerAddress = "0x3016DBeE1F9580638E2691546e8D2df1535B03be"; // replace with actual seller address

  useEffect(() => {
    const connectWallet = async () => {
      const provider = getProvider();
      await provider.send("eth_requestAccounts", []); // Request account access
    };
    connectWallet();
  }, []);
  const buttonStyle = {
    background: 'linear-gradient(90deg, #5ce16b, #8c52ff)',
    color: 'white',
    border: 'none',
    padding: '15px 10px', // Smaller padding for smaller buttons
    fontSize: '1rem', // Smaller font size
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '5px',
    transition: 'transform 0.3s ease',
  };
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
  


  const fetchAndDisplayPrice = async () => {
    try {
      const { adjustedPrice, timestamp } = await getCurrentPrice();
      setPriceData({ adjustedPrice, timestamp });
      console.log(`Current Price: ${adjustedPrice}, Timestamp: ${timestamp}`);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  useEffect(() => {
    fetchAndDisplayPrice();
  }, []);


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
  const toggleRole = () => setRole(role === "buyer" ? "seller" : "buyer");

  

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
  const imageStyle = {
    width: '100%',
    maxWidth: '150px', // Limit the size of the image
    marginTop: '10px',
    borderRadius: '10px', // Optional: add rounded corners
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
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
 //              <button style={buttonStyle} onClick={verifyInsurance}>Verify Insurance</button>

  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {/* Main Content Area for Escrow Management */}
      <div style={{ width: '60%' }}>

      {/* Role Toggle Button */}
<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
  <button onClick={toggleRole} style={buttonStyle}>
    Switch to {role === "buyer" ? "Seller" : "Buyer"} View
  </button>
</div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
  {/* Buy Now Section 1 */}
  <div style={{ width: '30%', textAlign: 'center' }}>
    <img
      src="/image2.png" // First image
      alt="Buy Now Option 1"
      style={imageStyle}
    />
    <input
      placeholder="Amount (C2FLR)"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      style={{
        width: '80%',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        marginTop: '10px',
      }}
    />
    <button style={buttonStyle} onClick={approveStablecoin}>Buy Now!</button>
  </div>

  {/* Buy Now Section 2 */}
  <div style={{ width: '30%', textAlign: 'center' }}>
    <img
      src="/image3.png" // Second image
      alt="Buy Now Option 2"
      style={imageStyle}
    />
    <input
      placeholder="Amount (C2FLR)"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      style={{
        width: '80%',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        marginTop: '10px',
      }}
    />
    <button style={buttonStyle} onClick={approveStablecoin}>Buy Now!</button>
  </div>

  {/* Buy Now Section 3 */}
  <div style={{ width: '30%', textAlign: 'center' }}>
    <img
      src="/image4.png" // Third image
      alt="Buy Now Option 3"
      style={imageStyle}
    />
    <input
      placeholder="Amount (C2FLR)"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      style={{
        width: '80%',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        marginTop: '10px',
      }}
    />
    <button style={buttonStyle} onClick={approveStablecoin}>Buy Now!</button>
  </div>
</div>

        
        {/* Create Escrow Button */}
        <button style={{ ...buttonStyle, marginTop: '20px' }} onClick={createEscrow}>Create Escrow</button>

        {/* Additional controls for buyer/seller */}
        <div>
          <input
            placeholder="Escrow ID"
            value={escrowId}
            onChange={(e) => setEscrowId(e.target.value)}
            style={{ width: '80%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd', marginTop: '20px' }}
          />
          {/* Buttons based on Buyer or Seller Role */}
          {role === "buyer" && (
            <>
              <button style={buttonStyle} onClick={fetchEscrowDetails}>Fetch Escrow Details</button>
              <button style={buttonStyle} onClick={adjustPrice}>Adjust Price</button>

              <button style={buttonStyle} onClick={cancelEscrow}>Cancel Escrow</button>
              {/*<button style={buttonStyle} onClick={finalizeEscrow}>Finalize Escrow</button>*/}

            </>
          )}
          
          {role === "seller" && (
            <>
              <button style={buttonStyle} onClick={fetchEscrowDetails}>Fetch Escrow Details</button>
              <button style={buttonStyle} onClick={adjustPrice}>Adjust Price</button>
            </>
            
          )}
        </div>


        {/* Display Escrow Details if Available */}
        {escrowDetails && (
          <div>
            <h3>Escrow Details:</h3>
            <p><strong>Buyer:</strong> {escrowDetails.buyer}</p>
            <p><strong>Seller:</strong> {escrowDetails.seller}</p>
            <p><strong>Amount:</strong> {formatUnits(escrowDetails.amount, "ether")} C2FLR</p>
            
          </div>
          

        )}

      </div>

      {/* Current Ethereum Price Section on Right Side */}
      <div style={{
        width: '30%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(140, 82, 255, 0.3), rgba(92, 225, 107, 0.3))',
        borderRadius: '15px',
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        position: 'fixed',
        right: '50px',
        top: '200px',
        fontFamily: "'Poppins', sans-serif",
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '15px',
          color: '#ffffff',
          textShadow: '1px 1px 6px rgba(0, 0, 0, 0.6)',
        }}>Current Ethereum Price</h2>

        {priceData.adjustedPrice !== null && priceData.timestamp !== null ? (
          <div style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            textAlign: 'center',
          }}>
            <p><strong>Price:</strong> {priceData.adjustedPrice} USD</p>
            <p><strong>Timestamp:</strong> {new Date(priceData.timestamp * 1000).toLocaleString()}</p>
          </div>
        ) : (
          <p style={{
            fontSize: '1.2rem',
            fontStyle: 'italic',
            textAlign: 'center',
          }}>Loading price data...</p>
        )}
      </div>

      <div style={{ marginTop: '450px', height: '20px', }}>
  <Ai/>
</div>
    </div>
    
  );
};

export default EscrowManager;