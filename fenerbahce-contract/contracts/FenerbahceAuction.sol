// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FenerbahceAuction is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint32 latestId;

    address fbTokenAddress;
    IERC20 fbToken;

    event AuctionCreated(uint32 auctionId);
    event AuctionDeposited(uint32 auctionId, address from, uint256 value);

    mapping(uint32 => mapping(address => uint256)) auctions;

    constructor(address _address) {
        fbTokenAddress = _address;
        fbToken = IERC20(fbTokenAddress);
    }

    function createAuction(
        uint32 _auctionId
    ) public onlyOwner {
        latestId += 1;
        auctions[_auctionId][address(0)] = 0;
        emit AuctionCreated(latestId);
    }

    function deposit(uint32 _auctionId, uint256 value) public nonReentrant {
        auctions[_auctionId][msg.sender] += value;

        fbToken.safeTransferFrom(msg.sender, address(this), value);

        emit AuctionDeposited(_auctionId, msg.sender, auctions[_auctionId][msg.sender]);
    }

    function getLatestId() public view returns (uint32) {
        return latestId;
    }

    function getUserBalanceByAuctionId(uint32 _auctionId, address _address) public view returns (uint256) {
        return auctions[_auctionId][_address];
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
