// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OrcaToken is ERC20 {
    address stakingContract;
    address owner;
    constructor(address _stakingContract) ERC20("OrcaCoin", "ORC"){
        stakingContract = _stakingContract;
        owner = msg.sender;
    }

    function mint(address _to, uint _amount) public {
        require(msg.sender == stakingContract);
        _mint(_to, _amount);
    }

    function updateStakingContract(address _stakingContract) public {
        require(msg.sender == owner);
        stakingContract = _stakingContract;
    }

}