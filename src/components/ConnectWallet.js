import React from "react";

const ConnectWallet = ({ setAccount }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        alert("Connection failed. Please try again.");
      }
    } else {
      alert("MetaMask is required to connect your wallet.");
    }
  };

  return (
    <div>
      <h2>Welcome to Flare</h2>
      <p>Connect your wallet to get started.</p>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default ConnectWallet;
