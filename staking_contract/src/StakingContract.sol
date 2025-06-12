// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract StackingContract {
    mapping(address => uint256) balances;
    mapping(address => uint256) unclaimedRewards;
    mapping(address => uint256) lastUpdateTime;

    function stack() public payable {
        require(msg.value > 0);

        if (!lastUpdateTime[msg.sender]) {
            lastUpdateTime[msg.sender] = block.timestamp;
        } else {
            unclaimedRewards[msg.sender] +=
                (block.timestamp - lastUpdateTime[msg.sender]) *
                balances[msg.sender];
            lastUpdateTime[msg.sender] = block.timestamp;
        }
        balances[msg.sender] += msg.value;
    }

    function unStack() public {
        require(balances[msg.sender] >= msg.value, "Not enough token");

        unclaimedRewards[msg.sender] +=
            (block.timestamp - lastUpdateTime[msg.sender]) *
            balances[msg.sender];
        lastUpdateTime[msg.sender] = block.timestamp;

        payable(address(msg.sender)).transfer(msg.value);
        balances[msg.sender] -= msg.value;
    }

    function balanceOf(address _address) public view returns (uint) {
        return balances[_address];
    }

    function getRewards(address _address) public view {
        uint currentReward = unclaimedRewards[_address];
        uint updateTime = lastUpdateTime[_address];

        uint newRewards = (block.timestamp - updateTime) * balances[_address];

        return currentReward + newRewards;
    }

    function claimRewards() public {
        uint currentReward = unclaimedRewards[msg.sender];
        uint updateTime = lastUpdateTime[msg.sender];
        uint newReward = (block.timestamp - updateTime) * balances[msg.sender];

        // transfer currentreward + newreward

        unclaimedRewards[msg.sender] = 0;

        lastUpdateTime[msg.sender] = block.timestamp;
    }
}
