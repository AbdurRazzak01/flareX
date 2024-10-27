import React from "react";
import "./../styles/Header.css";
import Navbar from "./Navbar";

const Header = ({ setAccount }) => {
  const handleConnectWallet = () => {
    setAccount("wallet_connected");
  };

  return (
    <header className="header">
   <Navbar/>
    </header>
  );
};

export default Header;