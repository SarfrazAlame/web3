// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/StakingContract.sol";

contract TestContract is Test {
    StackingContract c;

    function setUp() public {
        c = new StackingContract();
    }

    function testStack() public {
        c.stack{value: 200}(200);
        assert(c.balanceOf(address(this)) == 200);
    }

    function testStakedUser() public {
        vm.startPrank(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD);
        vm.deal(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 10 ether);

        c.stack{value: 1}(1);
        assert(c.balanceOf(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD) == 1);
    }

    function testUnstack() public {
        c.stack{value:10}(10);
        c.unStack(10);

        assert(c.balanceOf(address(this)) == 0);
    }

    function testFailUnstack() public{
        c.stack{value:100}(100);
        c.unStack(200);
    }
}   
