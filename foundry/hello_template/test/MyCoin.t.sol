// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/MyCoin.sol";


contract TestMyCoin is Test{
    MyCoin c;

    function setUp() public{
        c = new MyCoin();
    }

    function testMint() public{
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100, "ok");
        assertEq(c.balanceOf(address(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd)), 0, "ok");

        c.mint(address(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), 200);
        assertEq(c.balanceOf(address(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd)), 200, "ok");

    }

    function testTransfer() public{
        c.mint(address(this), 100);
        c.transfer(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 50);

        assertEq(c.balanceOf(address(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd)), 50,"ok");
        assertEq(c.balanceOf(address(this)), 50, "ok");

        vm.prank(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd);
        c.transfer(address(this), 50);

        assertEq(c.balanceOf(address(this)), 100, "ok");
        assertEq(c.balanceOf(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), 0, "ok");
    }

    function testApprovals() public {
        c.mint(address(this), 100);

        c.approve(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 20);

        assertEq(c.allowance(address(this), 0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), 20);
        assertEq(c.allowance(address(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), address(this)),0);

        vm.prank(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd);

        c.transferFrom(address(this), 0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 10);
        assertEq(c.allowance(address(this), 0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), 10, "ok");
        assertEq(c.balanceOf(address(this)), 90, "ok");
        assertEq(c.balanceOf(address(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd)), 10, "ok");
    }

    function testFailApprovals() public{
        c.mint(address(this), 100);
        c.approve(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 20);

        vm.prank(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd);
        c.transferFrom(address(this), 0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 50);
    }

    function testFailTransfer()public{
        c.mint(address(this), 20);
        c.transfer(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 100);
    }

}


// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// contract TestSarfCoin is Test {
    
//     SarCoin c;

//     function setUp() public{
//         c = new SarCoin();
//     }

//    function textMint() public {
//     c.mint(address(this), 100);
//     assertEq(c.balanceOf(address(this)),100, "ok");
//     assertEq(c.balanceOf(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), 0, "ok");


//     c.mint(address(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd),100);
//     assertEq(c.balanceOf(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), 100, "ok");
//    }


//    function testTransfer() public{
//     c.mint(address(this), 100);
//     c.transfer(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 50);

//     assertEq(c.balanceOf(address(this)), 50);
//     assertEq(c.balanceOf(address(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd)), 50);

//     vm.prank(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd);
//     c.transfer(address(this), 50);

//     assertEq(c.balanceOf(address(this)), 100);
//     assertEq(c.balanceOf(address(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd)), 0);

//    }
 
//    function testApprovals() public{
//     c.mint(address(this), 100);

//     c.approve(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 10);

//     assertEq(c.allowance(address(this),0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), 10);
//     assertEq(c.allowance(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, address(this)), 0);

//     vm.prank(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd);
//     c.transferFrom(address(this), 0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 5);

//     assertEq(c.balanceOf(address(this)), 95, "ok");
//     assertEq(c.balanceOf(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), 5, "ok");
//     assertEq(c.allowance(address(this), 0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd), 5);

//    }

//    function testFailApprovals() public{
//     c.mint(address(this), 100);
//     c.approve(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 10);

//     vm.prank(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd);
//     c.transferFrom(address(this), 0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 20);

//    }

//    function testFailTransfer() public{
//     c.mint(address(this), 20);
//     c.transfer(0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd, 100);
    
//    }
// }

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// contract TestCount is Test{
//     Counter c;

//     function setUp()public{
//         c = new Counter(0);
//     }

//     function testValue() public{
//         c.increment();
//         c.increment();
//         c.decrement();
//         assertEq(c.getCount(), uint(1), "ok");
//     }


// }