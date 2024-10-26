/*
import React, { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import EscrowManager from "./components/EscrowManager";
import Ai from "./components/Ai"; // Import the Ai component

import "./App.css";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="App">
      <h1>Flare Escrow Platform</h1>
      {!account ? (
        <ConnectWallet setAccount={setAccount} />
      ) : (
        <EscrowManager account={account} />
      )}
      <Ai/>
    </div>
  );
}

export default App; */


import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConnectWallet from "./components/ConnectWallet";
import EscrowManager from "./components/EscrowManager";
import Ai from "./components/Ai"; // Import the Ai component

import "./styles/App.css";
import "./styles/ConnectWallet.css";
import "./styles/EscrowManager.css";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="App">
      <Navbar />
      <Header />
      {!account ? (
        <ConnectWallet setAccount={setAccount} />
      ) : (
        <EscrowManager account={account} />
      )}
       <Ai/>
      <Footer />
    </div>
  );
}

export default App;
