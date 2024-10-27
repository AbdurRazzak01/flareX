import React from "react";
import "./../styles/InfoBox.css";

const InfoBox = () => {
  return (
    <div className="info-box-container">
      {/* Platform Statistics Box */}
      <div className="info-box statistics">
        <h3>Platform Statistics</h3>
        <ul>
          <li><strong>1,245+</strong> Transactions Completed</li>
          <li><strong>$5.3M+</strong> in Secured Funds</li>
          <li><strong>99%</strong> Customer Satisfaction</li>
        </ul>
      </div>

      {/* Need Help Box */}
      <div className="info-box support">
        <h3>Need Help?</h3>
        <p>Chat with us!</p>
        <p>📞 +1-800-FLARE-ESCROW</p>
        <p>🕒 Available 24/7</p>
      </div>
    </div>
  );
};

export default InfoBox;