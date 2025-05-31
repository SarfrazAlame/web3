// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SarCoin is ERC20 {
    address owner;

    constructor(uint256 _initalValue) ERC20("SarCoin", "SAR") {
        _mint(msg.sender, _initalValue);
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == owner);
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
