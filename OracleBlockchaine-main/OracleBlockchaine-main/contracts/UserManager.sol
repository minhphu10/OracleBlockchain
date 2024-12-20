// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Chainlink, ChainlinkClient} from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract APIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    string public volume;
    bytes32 private jobId;
    uint256 private fee;

    event RequestVolume(bytes32 indexed requestId, string volume);

    constructor(address _linkTokenAddress, address _mockOracleAddress) ConfirmedOwner(msg.sender) {
        _setChainlinkToken(_linkTokenAddress);
        _setChainlinkOracle(_mockOracleAddress);
        jobId = "7d80a6386ef543a3abb52817f6707e3b";
        fee = (1 * 10**18) / 10; // Fee: 0.1 LINK
    }

    function requestVolumeData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req._add("get", "http://localhost:8080/api/v1/customers"); // Mock example URL
        req._add("path", "data,data,customers");
        return _sendChainlinkRequest(req, fee);
    }

     function requestVolumeDataProduct() public returns (bytes32 requestId) {
        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req._add("get", "http://localhost:8080/api/v1/products"); // Mock example URL
        req._add("path", "data,data,products");
        return _sendChainlinkRequest(req, fee);
    }

    function fulfill(
        bytes32 _requestId,
        string memory _volume
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestVolume(_requestId, _volume);
        volume = _volume;
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(_chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
     function logdata() public returns(string memory data){
    return "hello";
}
}
