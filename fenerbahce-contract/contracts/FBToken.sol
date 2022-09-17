// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FBToken is ERC20 {
    constructor(address[] memory _addresses) ERC20("FBToken", "FBT") {
        _mint(msg.sender, 10000 ether);
        for (uint i = 0; i < _addresses.length; i++) {
            _mint(_addresses[i], 10000 ether);
        }
    }
}
