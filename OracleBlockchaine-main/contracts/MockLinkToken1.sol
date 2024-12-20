// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockLinkToken is ERC20 {
    // Constructor truyền name và symbol cho ERC20
    constructor(address initialHolder) ERC20("Chainlink Mock Token", "LINK") {
        _mint(initialHolder, 1000000 * 10**18); // Mint token cho initialHolder
    }

    // Hàm mint thêm token
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
