import React from "react";
import "./../styles/InfoSection.css";

const InfoSection = () => {
  return (
    <section className="info-section">
      <h2>How It Works</h2>
      <div className="info-item">
        <p>Buyer and seller agree on terms</p>
      </div>
      <div className="info-item">
        <p>Buyer completes payment</p>
      </div>
      <div className="info-item">
        <p>Escrow manages transaction</p>
      </div>
      <div className="info-item">
        <p>Seller fulfills requirements</p>
      </div>
      <div className="info-item">
        <p>Buyer verifies and releases funds</p>
      </div>
    </section>
  );
};

export default InfoSection;