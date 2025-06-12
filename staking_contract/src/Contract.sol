// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract StackingContract {
    mapping(address => uint256) public balances;
    uint256 public totalStackes;

    function stack(uint256 _amount) public payable {
        require(_amount > 0);
        require(_amount == msg.value);
        balances[msg.sender] += _amount;
        totalStackes += _amount;
    }

    function unStack(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Not enough token");

        payable(address(msg.sender)).transfer(_amount/2);
        balances[msg.sender] -= _amount;
        totalStackes -= _amount;
    }
}
