// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Auction is Ownable {

    uint256 private auctionStartTime;
    uint256 private auctionEndTime;

    mapping(address => uint256) allowance;
    mapping(address => uint256) balances;

    constructor(uint256 _auctionStartTime, uint256 _auctionEndTime) {
        auctionStartTime = _auctionStartTime;
        auctionEndTime = _auctionEndTime;
    }

    function deposit() onlyOwner public payable {
        require(block.timestamp > auctionStartTime, "Auction have not started yet");
        require(block.timestamp < auctionEndTime, "Auction have finished");
        require(allowance[msg.sender] > msg.value, "You don't have enough allowance");
    }

    function withdraw() public {
    }

}
