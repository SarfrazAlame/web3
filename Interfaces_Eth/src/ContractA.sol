// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract ContractA {
    string public message;

    function setMessage(string memory _msg) public {
        message = _msg;
    }

    function getMessage() public view returns(string memory) {
        return message;
    }
}
