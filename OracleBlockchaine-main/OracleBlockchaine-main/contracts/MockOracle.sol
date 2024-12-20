// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/ChainlinkRequestInterface.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract MockOracle {
    LinkTokenInterface public linkToken;
    address public owner;

    event RequestFulfilled(bytes32 indexed requestId, string result);

    constructor(address _linkToken) {
        linkToken = LinkTokenInterface(_linkToken);
        owner = msg.sender;
    }

    function fulfillRequest(
        bytes32 _requestId,
        string memory _result
    ) public {
        emit RequestFulfilled(_requestId, _result);
    }

    function setLinkToken(address _link) external {
        require(msg.sender == owner, "Only owner can set LINK token");
        linkToken = LinkTokenInterface(_link);
    }
}
