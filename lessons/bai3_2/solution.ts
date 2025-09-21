// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//3.2
contract VotingEligibility {
    uint public miniAge;
    address public owner;

    constructor() {
        owner = msg.sender;
        miniAge = 18; 
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function checkEligibility() public returns(bool) {
        if (miniAge >= 18) {
            return true;
        } else {
            return false;
        }
    }

    function updateMinAge(uint newMinAge) public onlyOwner {
        miniAge = newMinAge;
    }
}
