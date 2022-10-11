// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FenerbahceAuction is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Auction {
        uint256 startDate;
        uint256 endDate;
        uint32 startPrice;
        uint32 buyNowPrice;
        uint16 bidIncrement;
        bool isBought;
    }

    uint32 latestId;

    address fbTokenAddress;
    IERC20 fbToken;

    mapping(uint32 => Auction) idToAuctions;
    mapping(uint32 => mapping(address => uint32)) idToOffers;
    mapping(uint32 => uint32) idToMaxOffers;
    mapping(uint32 => bool) idToAuctionRefundDone;

    event AuctionCreated(
        uint32 auctionId,
        uint32 startPrice,
        uint32 buyNowPrice,
        uint16 bidIncrement,
        uint256 startDate,
        uint256 endDate
    );
    event AuctionDeposited(uint32 auctionId, address from, uint32 value);
    event AuctionSelled(uint32 auctionId, address buyer);
    event AuctionRefunded(uint32 auctionId, address to, uint32 value);
    event AuctionProlonged(uint32 auctionId, uint256 toDate);
    event AuctionBuyNowPriceUpdated(uint32 auctionId, uint32 newBuyNowPrice);
    event AuctionFinished(uint32 auctionId);

    constructor(address _address) {
        fbTokenAddress = _address;
        fbToken = IERC20(fbTokenAddress);
    }

    function _prolongAuction(uint32 _auctionId) internal {
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
        uint256 _startDate,
        uint256 _endDate,
        uint32 _startPrice,
        uint32 _buyNowPrice,
        uint16 _bidIncrement
    ) public onlyOwner returns (uint32) {
        latestId += 1;

        idToAuctions[latestId] = Auction(
            _startDate,
            _endDate,
            _startPrice,
            _buyNowPrice,
            _bidIncrement,
            false
        );

        idToMaxOffers[latestId] = 0;

        emit AuctionCreated(
            latestId,
            _startPrice,
            _buyNowPrice,
            _bidIncrement,
            _startDate,
            _endDate
        );

        return latestId;
    }

    function deposit(uint32 _auctionId, uint32 value) public nonReentrant {
        Auction memory auction = idToAuctions[_auctionId];

        uint32 userBalanceToAuction = value +
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
        } else {
            require(
                userBalanceToAuction > idToMaxOffers[_auctionId],
                "You need to deposit more than max offer!"
            );
        }

        _prolongAuction(_auctionId);

        idToOffers[_auctionId][msg.sender] = userBalanceToAuction;
        idToMaxOffers[_auctionId] = userBalanceToAuction;

        fbToken.safeTransferFrom(msg.sender, address(this), value);

        emit AuctionDeposited(_auctionId, msg.sender, userBalanceToAuction);
    }

    function buyNow(uint32 _auctionId) public nonReentrant {
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

    function refund(uint32 _auctionId, address _to) public nonReentrant {
        Auction memory auction = idToAuctions[_auctionId];
        require(
            block.timestamp > auction.endDate,
            "Auction have not finished yet!"
        );
        require(auction.buyNowPrice != 0, "There is no auction like that");

        uint32 value = idToOffers[_auctionId][_to];

        fbToken.approve(address(this), value);
        fbToken.safeTransferFrom(address(this), _to, value);

        emit AuctionRefunded(_auctionId, _to, value);
    }

    function getUserBalanceByAuctionId(uint32 _auctionId, address _address)
        public
        view
        returns (uint32)
    {
        return idToOffers[_auctionId][_address];
    }

    function updateBuyNowPrice(uint32 _auctionId, uint32 _newPrice)
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

    function withdrawOtherTokens(address tokenAddress)
        external
        nonReentrant
        onlyOwner
    {
        require(
            tokenAddress != fbTokenAddress,
            "TokenVesting: invalid token address"
        );
        IERC20 tokenInterface = IERC20(tokenAddress);
        require(
            tokenInterface != fbToken,
            "TokenVesting: use withdraw for contract token"
        );

        uint256 balance = tokenInterface.balanceOf(address(this));
        require(balance > 0, "TokenVesting: no funds to withdraw");

        tokenInterface.safeTransfer(owner(), balance);
    }

    function withdraw(uint256 amount) external nonReentrant onlyOwner {
        fbToken.safeTransfer(owner(), amount);
    }
}
