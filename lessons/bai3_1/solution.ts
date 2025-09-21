// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//3.1
contract Profile {
    //state varibales
    string public name;
    uint public age;

    // set profile
    function setProfile(string memory _name, uint _age) internal {
        name = _name;
        age = _age;
    }
}

contract Student is Profile {
    function setProfile() private {
        setProfile("Huy", 18);
    }
}
