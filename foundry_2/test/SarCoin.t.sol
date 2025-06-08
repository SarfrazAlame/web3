// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/SarCoin.sol";

contract SarCoins is Test {
    event Transfer(address indexed from, address indexed to, uint256 value);

    SarCoin c;

    function setUp() public {
        c = new SarCoin();
    }

    function testTransferEmit() public{
        c.mint(address(this), 100);
        vm.expectEmit(true, true, false, true);
        emit Transfer(address(this), 0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 10);
        
        c.transfer(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 10);
        
    }

    function test_DealExample() public {
        address account = 0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD;
        uint256 balance = 10 ether;

        vm.deal(account, balance);

        assertEq(address(account).balance, balance);
    }

    function testMint() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100, "ok");

        c.mint(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 100);

        assertEq(c.balanceOf(address(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD)), 100, "ok");
    }

    function testTransfer() public {
        c.mint(address(this), 100);
        c.transfer(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 50);

        assertEq(c.balanceOf(address(this)), 50, "ok");
        assertEq(c.balanceOf(address(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD)), 50, "ok");

        vm.prank(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD);
        c.transfer(address(this), 50);

        assertEq(c.balanceOf(address(this)), 100, "ok");
        assertEq(c.balanceOf(address(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD)), 0, "ok");
    }

    function testApprovals()public {
        c.mint(address(this), 100);

        c.approve(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 40);
        vm.startPrank(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD);
        assertEq(c.allowance(address(this), 0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD), 40);
        assertEq(c.allowance(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, address(this)), 0, "ok");

        assertEq(c.balanceOf(address(this)), 100, "ok");
        assertEq(c.balanceOf(address(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD)), 0, "ok");

        c.transferFrom(address(this), 0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 20);

        assertEq(c.balanceOf(address(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD)), 20, "ok");
        assertEq(c.balanceOf(address(this)), 80, "ok");

        assertEq(c.allowance(address(this), 0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD), 20);
    }

    function testFailApprovals() public {
        c.mint(address(this), 100);
        c.approve(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 10);

        vm.prank(0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD);
        c.transferFrom(address(this), 0xfc857f41a3c1d1A943E29a0b6E57c9CD6e04DFdD, 30);
    }

    function testFailTransfer() public {
        c.mint(address(this), 10);
        c.transfer(address(this), 20);
    }
}












// contract TestContract is Test {
//     Counter c;

//     function setUp() public {
//         c = new Counter(5);
//     }

//     function testInc() public{
//         c.increment();
//         c.increment();
//         assertEq(c.getNum(), 7, "ok");
//     }

//     function testDec() public{
//         c.decrement();
//         c.decrement();
//         assertEq(c.getNum(), 3, "ok");
//     }

//     function testFailDec() public {
//         c.decrement();
//         c.decrement();
//         c.decrement();
//         c.decrement();
//     }
// }
