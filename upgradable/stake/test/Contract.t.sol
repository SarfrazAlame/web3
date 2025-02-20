// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/Contract.sol";

contract TestContract is Test {
    StakingContract c;

    function setUp() public {
        c = new StakingContract();
    }

    function testStake() public {
        uint value = 10 ether;
        c.stack{value:value}(value);

        assert(c.totalStake() == value);
    }

    function testFailStake() public {
        uint value = 10 ether;
        c.stack(value);

        assert(c.totalStake() == value);
    }

    function testUnstake() public {
        uint value = 10 ether;
        c.stack{value:value}(value);

        c.unstack(value);

        assert(c.totalStake() == 0);
    }
}

