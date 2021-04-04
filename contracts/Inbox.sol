// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract inbox {
    string public message;

    constructor(string memory _initiasMessage) {
        message = _initiasMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;   
    }
}

