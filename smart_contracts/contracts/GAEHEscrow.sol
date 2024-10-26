// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FtsoV2FeedConsumer.sol";

interface IInsuranceOracle {
    function verifyInsurance(uint256 escrowId) external returns (bool);
}

contract GAEHEscrow is Ownable {
    enum EscrowStatus { Initialized, PriceAdjusted, InsuranceVerified, Finalized, Cancelled }

    struct Escrow {
        address buyer;
        address seller;
        uint256 amount;
        EscrowStatus status;
        uint256 lastPriceUpdate;
    }

    IERC20 public stablecoin;
    IInsuranceOracle public insuranceOracle;
    mapping(uint256 => Escrow) public escrows;
    uint256 public escrowCounter;

    event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount);
    event PriceAdjusted(uint256 indexed escrowId,uint256 adjustedPrice);//***to adjust onchain price
    event InsuranceVerified(uint256 indexed escrowId, bool verified);
    event EscrowFinalized(uint256 indexed escrowId, uint256 finalAmountPaid);
    event EscrowCancelled(uint256 indexed escrowId);

    constructor(address _stablecoin, address _insuranceOracle) Ownable(msg.sender) {
        stablecoin = IERC20(_stablecoin);
        insuranceOracle = IInsuranceOracle(_insuranceOracle);
    }

    function createEscrow(address seller, uint256 amount) external returns (uint256) {
        uint256 escrowId = escrowCounter++;
        escrows[escrowId] = Escrow({
            buyer: msg.sender,
            seller: seller,
            amount: amount,
            status: EscrowStatus.Initialized,
            lastPriceUpdate: block.timestamp
            adjustedPrice: 0 //adjust price change
        });

        require(stablecoin.transferFrom(msg.sender, address(this), amount), "Payment failed");

        emit EscrowCreated(escrowId, msg.sender, seller, amount);
        return escrowId;
    }

    function adjustPrice(uint256 escrowId) external onlyOwner {
        require(escrows[escrowId].status == EscrowStatus.Initialized, "Invalid status for adjustment");

      uint256 currentPrice = ftsoFeedConsumer.getCurrentPrice(); // Fetch current USD price
        escrows[escrowId].adjustedPrice = currentPrice;
        escrows[escrowId].status = EscrowStatus.PriceAdjusted;
        escrows[escrowId].lastPriceUpdate = block.timestamp;

        emit PriceAdjusted(escrowId);
    }

    function verifyInsurance(uint256 escrowId) external onlyOwner {
        require(escrows[escrowId].status == EscrowStatus.PriceAdjusted, "Escrow not adjusted");

        bool isVerified = insuranceOracle.verifyInsurance(escrowId);
        require(isVerified, "Insurance verification failed");

        escrows[escrowId].status = EscrowStatus.InsuranceVerified;
        emit InsuranceVerified(escrowId, isVerified);
    }

    function finalizeEscrow(uint256 escrowId) external onlyOwner {
        require(escrows[escrowId].status == EscrowStatus.InsuranceVerified, "Insurance not verified");

        require(stablecoin.transfer(escrows[escrowId].seller, escrows[escrowId].amount), "Final payment failed");

        escrows[escrowId].status = EscrowStatus.Finalized;
        emit EscrowFinalized(escrowId, escrows[escrowId].amount);
    }

    function cancelEscrow(uint256 escrowId) external {
        require(msg.sender == escrows[escrowId].buyer, "Only buyer can cancel");

        require(stablecoin.transfer(escrows[escrowId].buyer, escrows[escrowId].amount), "Refund failed");

        escrows[escrowId].status = EscrowStatus.Cancelled;
        emit EscrowCancelled(escrowId);
    }
}
