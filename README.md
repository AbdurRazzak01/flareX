# FlareX: Decentralized Real-Time Price Adjusting Escrow Solution
FlareX is a decentralized escrow system designed for high-value asset transactions, offering real-time price adjustments, secure on-chain tracking, and robust transparency through Flare’s enshrined Data Protocols. This project demonstrates how blockchain technology, combined with decentralized oracles and real-world data integration, can create a seamless, trustless, and secure transaction experience.
# Interested to Know More About Our Business Case?
Here is our slide-deck: https://www.canva.com/design/DAGUtbZ6jUs/akfz8osRcEEG3BqUIgs3AQ/edit?utm_content=DAGUtbZ6jUs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
# Fancy To See a Demo Video?
https://youtu.be/8gYME4DyQK4
# 🌐 Why Flare?
Flare’s unique infrastructure allows for true decentralized price feeds and data integration, solving problems that traditional escrows face with static prices, data opacity, and risk of default. FlareX’s smart contracts are empowered by Flare’s FTSO and FDC, enabling an entirely new level of trust and security in asset-backed escrows.

# 🚀 Features
### Real-Time Price Adjustments
FlareX utilizes Flare’s Time Series Oracle (FTSO) to adjust escrow prices in real-time, ensuring fair transactions by reflecting the latest market prices for all parties.

### Trustless Escrow Management
Built on smart contracts, FlareX operates a fully trustless escrow process, automating the transaction lifecycle while minimizing the need for intermediaries.

### On-Chain Data Bridging
Through the Flare Data Connector (FDC), FlareX seamlessly bridges Web2 data (e.g., shipment tracking) with blockchain, offering transparency and proof for every transaction.(Under Development)

#### Enhanced Security and Transparency
With decentralized oracles and AI validation for key data, FlareX enhances security and mitigates counterparty risks in high-value transactions.

# 🛠️ Tech Stack
### Blockchain: Flare Network (FTSO and FDC for decentralized data and oracles)
### Smart Contracts: Solidity (Ethereum-compatible)
### Frontend: React (JavaScript)
### APIs: Shipment tracking and asset verification APIs for data bridging
### AI Integration: OpenAI API and codes to increase targeted accuracy
## 📂 Project Structure
### Contracts: Smart contracts that manage the escrow logic, price adjustments, and insurance verifications.
### Frontend: React-based interface displaying current Ethereum prices, transaction statuses, and escrow management controls.
### API Integration: Data bridging for shipment tracking, powered by Flare Data Connector (FDC).(Under Development)

# 🔍 How It Works
Real-Time Data Access: The escrow contract queries Flare’s decentralized oracles to ensure the latest price data is integrated, adjusting escrowed amounts in real-time.
Escrow Lifecycle Management: Buyers and sellers agree on terms, with FlareX managing payment and status updates through each phase—from initialization to completion using user inputs and API traxcker.
On-Chain Verification: With FDC, shipment and insurance data are stored on-chain, providing an end-to-end transparent and verifiable record of all escrowed transactions.(Under Development)

# 📦 Installation
### Clone the Repository

bash
Copy code
git clone [https://github.com/yourusername/flarex.git](https://github.com/AbdurRazzak01/flareX)
cd flarex
### Install Dependencies

bash
Copy code
npm install
### Start the Development Server

bash
Copy code
npm start
### Deploy Contracts
Ensure you have Hardhat set up for contract deployment. Run:

bash
Copy code
npx hardhat run scripts/deploy.js --network yourNetwork
# 📖 Usage
Escrow Creation: Buyers initiate an escrow transaction by setting the terms and depositing funds. The contract automatically adjusts the escrowed amount based on FTSO price feeds.
Transaction Management: Track and verify each stage, from price adjustment to fulfillment.
Data Validation: Real-time data bridging validates key shipment and insurance info directly on-chain.
# 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

# 📫 Contact
For any inquiries, reach out to Abdur Razzak (abrazzak1101@icloud.com)
