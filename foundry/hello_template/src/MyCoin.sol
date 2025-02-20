// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MyCoin is ERC20{
    uint256 public number;

    constructor() ERC20("Mycoin", "MYCOIN"){

    }

    function mint(address to, uint256 amount) public{
        _mint(to, amount);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// contract SarCoin is ERC20 {

//   uint256 public number;
  
//   constructor() ERC20("Sarf", "SARF"){
    
//   }

//   function mint(address to, uint256 amount) public{
//     _mint(to, amount);
//   }

// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// contract Counter{
//     uint public count;

//     constructor(uint _count){
//         count = _count;
//     }

//     function increment() public {
//         count = count+1;
//     }

//     function decrement() public{
//         count = count-1;
//     }

//     function getCount() public view returns(uint){
//         return count;
//     }

// }

//////////////////////////////////////////////////////////////////////////////////////////////ERC-20 contract ///////////////////////////////////////////////////

