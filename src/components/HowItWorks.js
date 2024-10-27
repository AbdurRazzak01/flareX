import React, { useEffect, useState } from "react";
import "./../styles/HowItWorks.css"; // or the appropriate path to the CSS file

// Define steps array
const steps = [
  "Buyer and seller agree on terms",
  "Buyer completes payment",
  "Escrow manages transaction",
  "Seller fulfills requirements",
];

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000); // 3-second interval for zoom effect
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="vertical-line"></div> {/* Vertical line connecting nodes */}
        {steps.map((step, index) => (
          <div key={index} className={`step ${index === currentStep ? "active" : ""}`}>
            <div className="node">
              <span className="tick">✔️</span>
            </div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
