// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract StakingContract {

    mapping(address => uint) stakes;
    uint public totalStake;

    constructor(){

    }

    function stack(uint _amount) public payable {
        require(_amount > 0);
        require(_amount == msg.value);
        stakes[msg.sender] += _amount;
        totalStake += _amount;
    }

    function unstack(uint _amount) public {
        require(stakes[msg.sender] >= _amount);
        payable(msg.sender).transfer(_amount);
        totalStake -= _amount;
        stakes[msg.sender] -= _amount;
    }
}
