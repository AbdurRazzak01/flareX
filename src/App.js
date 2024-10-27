import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConnectWallet from "./components/ConnectWallet";
import EscrowManager from "./components/EscrowManager";
import HowItWorks from "./components/HowItWorks";
import RotatingCube from "./components/RotatingCube";
import "./styles/App.css";
import "./styles/ConnectWallet.css";
import "./styles/EscrowManager.css";
import InfoBox from "./components/InfoBox";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="App">
      <Header/>

      {!account ? (
        <>
          <ConnectWallet setAccount={setAccount} />
          <RotatingCube />
          <HowItWorks />
        
        </>
      ) : (
        <EscrowManager account={account} />
      )}
    
      <Footer />
    </div>
  );
}

export default App;
