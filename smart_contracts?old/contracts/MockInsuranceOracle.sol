// MockInsuranceOracle.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MockInsuranceOracle {
    function verifyInsurance(uint256) external pure returns (bool) {
        return true;
    }
}
