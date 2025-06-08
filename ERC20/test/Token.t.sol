// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {MyToken} from  "../src/MyToken.sol";

contract TestMyToken is Test {
    MyToken public c;

    function setUp() public {
        c = new MyToken();
    }

    function testMint() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100);

        c.mint(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 100);
        assertEq(c.balanceOf(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD), 100);
    }
}
