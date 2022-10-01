// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./FBToken.sol";

contract FenerbahceAuction is Ownable {
    using SafeERC20 for IERC20;
    using SafeERC20 for FBToken;

    struct Auction {
        uint256 startPrice;
        uint256 buyNowPrice;
        uint256 bidIncrement;
        uint256 startDate;
        uint256 endDate;
        bool isBought;
    }

    FBToken fbToken;

    mapping(string => Auction) idToAuctions;
    mapping(string => mapping(address => uint256)) idToOffers;
    mapping(string => uint256) idToMaxOffers;
    mapping(string => bool) idToAuctionRefundDone;

    event AuctionCreated(
        string auctionId,
        uint256 startPrice,
        uint256 buyNowPrice,
        uint256 bidIncrement,
        uint256 startDate,
        uint256 endDate
    );
    event AuctionDeposited(string auctionId, address from, uint256 value);
    event AuctionDepositedWithBidIncrement(
        string auctionId,
        address from,
        uint256 value
    );
    event AuctionSelled(string auctionId, address buyer);
    event AuctionRefunded(string auctionId, address to, uint256 value);
    event AuctionProlonged(string auctionId, uint256 toDate);
    event AuctionBuyNowPriceUpdated(string auctionId, uint256 newBuyNowPrice);
    event AuctionFinished(string auctionId);

    constructor(address _address) {
        fbToken = FBToken(_address);
    }

    function _prolongAuction(string memory _auctionId) internal {
        Auction memory auction = idToAuctions[_auctionId];
        uint256 diff = auction.endDate - block.timestamp;

        // if a user deposit to an auction half an hour before the auction is finished,
        // The auction end time will be prolonged to half an hour
        uint256 maxLeftTime = 30 * 60;
        if (diff < maxLeftTime) {
            auction.endDate += maxLeftTime - diff;
            emit AuctionProlonged(_auctionId, auction.endDate);
        }
    }

    function createAuction(
        string memory _auctionId,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _bidIncrement,
        uint256 _startPrice,
        uint256 _buyNowPrice
    ) public onlyOwner {
        require(
            idToAuctions[_auctionId].startDate == 0,
            "An auction with this auctionId already exists."
        );
        idToAuctions[_auctionId] = Auction(
            _startPrice,
            _buyNowPrice,
            _bidIncrement,
            _startDate,
            _endDate,
            false
        );
        idToMaxOffers[_auctionId] = 0;

        emit AuctionCreated(
            _auctionId,
            _startPrice,
            _buyNowPrice,
            _bidIncrement,
            _startDate,
            _endDate
        );
    }

    function depositWithBidIncrement(string memory _auctionId, uint256 value)
        public
    {
        Auction memory auction = idToAuctions[_auctionId];
        require(auction.startDate != 0, "There is no auction like that");

        uint256 userBalanceToAuction = value +
            idToOffers[_auctionId][msg.sender];

        require(
            auction.startDate < block.timestamp,
            "Auction have not started yet!"
        );
        require(auction.endDate > block.timestamp, "Auction finished!");
        require(auction.isBought == false, "This is already selled!");
        require(
            fbToken.allowance(msg.sender, address(this)) >= value,
            "You don't have enough allowance!"
        );
        require(
            fbToken.balanceOf(msg.sender) >= value,
            "You don't have enough balance!"
        );

        if (idToMaxOffers[_auctionId] == 0) {
            require(
                value == auction.startPrice,
                "You need to start auction with auction start price"
            );
        } else {
            require(
                userBalanceToAuction - idToMaxOffers[_auctionId] ==
                    auction.bidIncrement,
                "You can only increase auction by bidIncrement!"
            );
        }

        _prolongAuction(_auctionId);

        idToOffers[_auctionId][msg.sender] =
            idToOffers[_auctionId][msg.sender] +
            value;
        idToMaxOffers[_auctionId] = userBalanceToAuction;

        fbToken.safeTransferFrom(msg.sender, address(this), value);

        emit AuctionDepositedWithBidIncrement(
            _auctionId,
            msg.sender,
            userBalanceToAuction
        );
    }

    function deposit(string memory _auctionId, uint256 value) public {
        Auction memory auction = idToAuctions[_auctionId];

        uint256 userBalanceToAuction = value +
            idToOffers[_auctionId][msg.sender];

        require(auction.startDate != 0, "There is no auction like that");

        require(
            auction.startDate < block.timestamp,
            "Auction have not started yet!"
        );
        require(auction.endDate > block.timestamp, "Auction finished!");
        require(auction.isBought == false, "This is already selled!");

        require(
            fbToken.allowance(msg.sender, address(this)) >= value,
            "You don't have enough allowance!"
        );
        require(
            fbToken.balanceOf(msg.sender) >= value,
            "You don't have enough balance!"
        );

        if (idToMaxOffers[_auctionId] == 0) {
            require(
                userBalanceToAuction >= auction.startPrice,
                "You need to start auction with the minimum of auction start price"
            );
        }
        else {
            require(userBalanceToAuction > idToMaxOffers[_auctionId], "You need to deposit more than max offer!");
        }

        _prolongAuction(_auctionId);

        idToOffers[_auctionId][msg.sender] = userBalanceToAuction;
        idToMaxOffers[_auctionId] = userBalanceToAuction;


        fbToken.safeTransferFrom(msg.sender, address(this), value);

        emit AuctionDeposited(_auctionId, msg.sender, userBalanceToAuction);
    }

    function buyNow(string memory _auctionId) public {
        require(
            idToAuctions[_auctionId].startDate != 0,
            "There is no auction like that"
        );

        Auction memory auction = idToAuctions[_auctionId];

        require(auction.isBought == false, "This is already selled!");
        require(auction.endDate > block.timestamp, "Auction finished!");
        require(
            auction.startDate < block.timestamp,
            "Auction have not started yet!"
        );
        require(
            fbToken.allowance(msg.sender, address(this)) >= auction.buyNowPrice,
            "You don't have enough allowance!"
        );
        require(
            fbToken.balanceOf(msg.sender) >= auction.buyNowPrice,
            "You don't have enough balance!"
        );

        fbToken.safeTransferFrom(
            msg.sender,
            address(this),
            auction.buyNowPrice
        );

        idToAuctions[_auctionId].isBought = true;
        // you can buy it now
        emit AuctionSelled(_auctionId, msg.sender);
    }

    function refund(string memory _auctionId, address _to) public {
        Auction memory auction = idToAuctions[_auctionId];
        require(
            block.timestamp > auction.endDate,
            "Auction have not finished yet!"
        );
        require(auction.buyNowPrice != 0, "There is no auction like that");

        uint256 value = idToOffers[_auctionId][_to];

        // fbToken.safeTransferFrom(address(this), _to, value);
        fbToken.approve(address(this), value);
        fbToken.safeTransferFrom(address(this), _to, value);

        emit AuctionRefunded(_auctionId, _to, value);
    }

    function getUserBalanceByAuctionId(
        string memory _auctionId,
        address _address
    ) public view returns (uint256) {
        return idToOffers[_auctionId][_address];
    }

    function updateBuyNowPrice(string memory _auctionId, uint256 _newPrice)
        public
        onlyOwner
    {
        Auction memory auction = idToAuctions[_auctionId];
        require(auction.isBought == false, "This auction is already selled");
        require(auction.buyNowPrice != 0, "There is no auction like that");
        require(
            _newPrice > auction.buyNowPrice,
            "New buy now price needs to be bigger than the old price"
        );

        idToAuctions[_auctionId].buyNowPrice = _newPrice;
        emit AuctionBuyNowPriceUpdated(_auctionId, _newPrice);
    }
}
