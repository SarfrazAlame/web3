// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {console} from "forge-std/console.sol";

contract SarCoin is ERC20 {
    uint256 public number;

    constructor() ERC20("SarCoin", "SAR") {}

    function mint(address to, uint256 amount) public {
        console.logString("hi there");
        console.logAddress(to);
        console.logUint(amount);
        _mint(to, amount);
    }
}


// contract Counter {
//     uint private num;

//     // constructor(uint _num){
//     //     num = _num;
//     // }

//     // function increment() public{
//     //     num++;
//     // }

//     // function decrement() public{
//     //     num--;
//     // }

//     // function getNum() public view returns (uint256){
//     //     return num;
//     // }

// }
