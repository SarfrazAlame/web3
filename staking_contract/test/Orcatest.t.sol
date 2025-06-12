// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {OrcaToken} from "../src/OrcaToken.sol";

contract OrcaTest is Test {
    OrcaToken c;

    function setUp() public {
        c = new OrcaToken(address(this));
    }

    function testMint() public {
        c.mint(address(this), 100);

        assert(c.balanceOf(address(this)) == 100);
    }

    function testFailMint()public {
        vm.startPrank(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD);

        c.mint(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD ,10);

        assertEq(c.balanceOf(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD), 10, "ok");
    }
}
