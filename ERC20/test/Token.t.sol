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

    function testTransfer() public{
        c.mint(address(this), 100);
        c.transfer(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 60);

        assertEq(c.balanceOf(address(this)), 40);
        assertEq(c.balanceOf(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD), 60);
    }

    function test_Approval() public {
        c.mint(address(this), 100);
        c.approve(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 40);

        uint amount = c.allowance(address(this), 0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD);

        assertEq(amount, 40);
        vm.prank(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD);
        c.transferFrom(address(this), 0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 20);
        
        assertEq(c.balanceOf(address(this)), 80 );
        assertEq(c.balanceOf(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD), 20);
    }

    function testFailApprovals() public {
        c.mint(address(this), 100);
        c.approve(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 50);

        vm.prank(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD);
        c.transferFrom(address(this), 0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 80);
    }
     function testFailTransfer() public {
        c.mint(address(this), 20);
        c.transfer(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f, 100);
    }
}
