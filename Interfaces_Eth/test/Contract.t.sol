// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "/src/ContractA.sol";


contract TestContract is Test {
    ContractA c;

    function setUp() public {
        c = new ContractA();
    }

    function testMessage() public {

    }
}
