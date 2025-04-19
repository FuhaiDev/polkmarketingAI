// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WndTipper {
    address public owner;
    address public developer = /*try your address*/;
    bool private locked;
    
    // 📢 event
    event Deposited(address indexed from, uint256 amount);
    event Tipped(address indexed tipper, address indexed recipient, uint256 totalAmount, uint256 toRecipient, uint256 toDeveloper);
    event Withdrawn(address indexed by, uint256 amount);
    
    constructor() {
        owner = msg.sender;
        locked = false;
    }
    
    modifier nonReentrant() {
        require(!locked, "Reentrancy detected!");
        locked = true;
        _;
        locked = false;
    }
    
    // receive
    receive() external payable {
        emit Deposited(msg.sender, msg.value); // auto same as save
    }
    
    // deposit
    function deposit() public payable {
        require(msg.value > 0, "Must send some WND");
        emit Deposited(msg.sender, msg.value); // launch save event
    }
    
    function tip(address payable recipient, uint256 amount) public nonReentrant {
        require(amount > 0, "Tip amount must be greater than 0");
        require(address(this).balance >= amount, "Insufficient contract balance");
        require(recipient != address(0), "Cannot tip to zero address");
        
        uint256 toRecipient = (amount * 90) / 100;
        uint256 toDeveloper = amount - toRecipient;
        
        (bool successRecipient, ) = recipient.call{value: toRecipient}("");
        require(successRecipient, "Transfer to recipient failed");
        
        (bool successDeveloper, ) = payable(developer).call{value: toDeveloper}("");
        require(successDeveloper, "Transfer to developer failed");
        
        emit Tipped(msg.sender, recipient, amount, toRecipient, toDeveloper); // tipping
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function withdrawAll() public nonReentrant {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Withdraw failed");
        
        emit Withdrawn(msg.sender, balance); // launch event
    }
}
