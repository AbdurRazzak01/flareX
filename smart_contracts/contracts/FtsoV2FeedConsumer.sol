// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface FtsoV2Interface {
    function getCurrentPrice() external view returns (uint256);
}

contract FtsoV2FeedConsumer {
    FtsoV2Interface internal ftsoV2;

    constructor(address _ftsoAddress) {
        ftsoV2 = FtsoV2Interface(_ftsoAddress);
    }

    function getCurrentPrice() external view returns (uint256) {
        return ftsoV2.getCurrentPrice();
    }
}
