import React, { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import EscrowManager from "./components/EscrowManager";
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
    </div>
  );
}

export default App;
