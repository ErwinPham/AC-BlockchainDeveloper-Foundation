// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Voting {
    // Struct cho ứng viên
    struct Candidate {
        string name;
        uint voteCount;
    }

    // Danh sách ứng viên: id => Candidate
    mapping(uint => Candidate) public candidates;
    uint public candidateCount;

    // Mapping lưu xem địa chỉ đã vote chưa
    mapping(address => bool) public hasVoted;

    // Địa chỉ admin (người deploy contract)
    address public owner;

    // Event log mỗi lần vote
    event Voted(address indexed voter, uint candidateId);

    // Modifier chỉ cho owner gọi
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Owner thêm ứng viên mới
    function addCandidate(string memory name) public onlyOwner {
        candidates[candidateCount] = Candidate({name: name, voteCount: 0});
        candidateCount++;
    }

    // Người dùng vote cho 1 ứng viên
    function vote(uint candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(candidateId < candidateCount, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount++;

        emit Voted(msg.sender, candidateId);
    }

    // Lấy thông tin ứng viên
    function getCandidate(uint candidateId) public view returns (string memory, uint) {
        Candidate memory c = candidates[candidateId];
        return (c.name, c.voteCount);
    }
}
