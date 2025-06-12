// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/Contract.sol";

contract TestContract is Test {
    StackingContract c;

    function setUp() public {
        c = new StackingContract();
    }

    function testStack() public {
        uint value = 10 ether;
        c.stack{value: value}(value);

        assert(c.totalStackes() == value);
    }

    function testFailStack() public {
        uint value = 10 ether;
        c.stack(value);

        assert(c.totalStackes() == value);
    }

    function testUnstack() public {
        uint value = 10 ether;
        vm.startPrank(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD);
        vm.deal(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, value);

        c.stack{value: value}(value);
        c.unStack(value);

        assert(c.totalStackes() == 0);
    }
}
