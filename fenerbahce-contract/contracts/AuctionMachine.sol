// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
// import "./Auction.sol";

contract AuctionMachine is Ownable {
    

    struct Auction {
        uint256 startDate;
        uint256 endDate;
    }

    struct AuctionDeposit {
        uint256 balance;
        bytes32 auctionId;
    }

    mapping(bytes32 => Auction) idToAuctions;

    event AuctionCreated(bytes32 auctionId, uint256 auctionStartDate, uint256 auctionEndDate);
    event AuctionDeposited(bytes32 auctionId, address from, uint256 value);
    event AuctionRefunded(bytes32 auctionId, address to, uint256 value);

    constructor(
    ) {}

    function createAuction(bytes32 _auctionId, uint256 _auctionStartDate, uint256 _auctionEndDate) onlyOwner public {
        require(idToAuctions[_auctionId].startDate == 0, "An auction with this auctionId already exists.");
        idToAuctions[_auctionId] = Auction(_auctionStartDate, _auctionEndDate);

        emit AuctionCreated(_auctionId, _auctionStartDate, _auctionEndDate);
    }

    function depositToAuction(bytes32 _auctionId) public payable {
        Auction memory auction = idToAuctions[_auctionId];

        require(auction.endDate > block.timestamp, "Auction finished");
        require(auction.startDate < block.timestamp, "Auction have not started yet");

        // TODO: if a user deposit to an auction right before the auction finished,
        // The auction end time will be prolonged

        emit AuctionDeposited(_auctionId, msg.sender, msg.value);
    }

    function refund(bytes32 _auctionId, address _to, uint256 _value) onlyOwner public {
        require(block.timestamp > idToAuctions[_auctionId].endDate, "Auction have not finished yet");


        // TODO: send balance to user's wallet

        emit AuctionRefunded(_auctionId, _to, _value);
    }

}
