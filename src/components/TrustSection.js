// TrustSection.js
import React from "react";
import "./../styles/TrustSection.css";

const TrustSection = () => {
  return (
    <section className="trust-section">
      <h2>Why Trust Flare Escrow?</h2>
      <ul>
        <li><span className="tick">✔️</span> Secure: Advanced encryption protects your data.</li>
        <li><span className="tick">✔️</span> Decentralized: Full transparency through blockchain.</li>
        <li><span className="tick">✔️</span> Reliable: Thousands of successful transactions.</li>
      </ul>
    </section>
  );
};

export default TrustSection;