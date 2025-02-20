// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract WSarf is ERC20, Ownable {

    constructor() ERC20("WSarf", "SAR") Ownable(msg.sender) {
        
    }

    function mint(address _to, uint amount) public onlyOwner{
        _mint(_to, amount);
    }

    function burn(address _to, uint amount) public onlyOwner {
        _burn(_to, amount);
    }

}

