// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FenerbahceAuction is Ownable {
    

    struct Auction {
        uint256 startDate;
        uint256 endDate;
        uint256 bidIncrement;
    }

    mapping(bytes32 => Auction) idToAuctions;

    event AuctionCreated(bytes32 auctionId, uint256 auctionStartDate, uint256 auctionEndDate, uint256 bidIncrement);
    event AuctionDeposited(bytes32 auctionId, address from, uint256 value);
    event AuctionRefunded(bytes32 auctionId, address to, uint256 value);
    event AuctionProlonged(bytes32 auctionId, uint256 toDate);

    constructor(
    ) {}

    function createAuction(bytes32 _auctionId, uint256 _auctionStartDate, uint256 _auctionEndDate, uint256 _bidIncrement) onlyOwner public {
        require(idToAuctions[_auctionId].startDate == 0, "An auction with this auctionId already exists.");
        idToAuctions[_auctionId] = Auction(_auctionStartDate, _auctionEndDate, _bidIncrement);

        emit AuctionCreated(_auctionId, _auctionStartDate, _auctionEndDate, _bidIncrement);
    }

    function depositToAuction(bytes32 _auctionId) public payable {
        Auction memory auction = idToAuctions[_auctionId];

        require(auction.endDate > block.timestamp, "Auction finished");
        require(auction.startDate < block.timestamp, "Auction have not started yet");

        uint256 diff = auction.endDate - block.timestamp;

        // if a user deposit to an auction half an hour before the auction is finished,
        // The auction end time will be prolonged to half an hour
        if (diff < 30 * 60 * 1000) {
            auction.endDate += 30 * 60 * 1000 - diff;
            emit AuctionProlonged(_auctionId, auction.endDate);
        }

        emit AuctionDeposited(_auctionId, msg.sender, msg.value);
    }

    function refund(bytes32 _auctionId, address _to, uint256 _value) onlyOwner public payable {
        require(block.timestamp > idToAuctions[_auctionId].endDate, "Auction have not finished yet");

        (bool sent, bytes memory data) = payable(_to).call{ value: _value }("");
        require(sent, "Failed to refund balance");

        emit AuctionRefunded(_auctionId, _to, _value);
    }

}
