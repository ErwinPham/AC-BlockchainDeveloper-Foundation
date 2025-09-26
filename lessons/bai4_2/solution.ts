// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract StudentRegistryV2 {
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    mapping(address => Student) private students;
    address public owner;

    // Event khi thêm student thành công
    event StudentAdded(address indexed user, string name, uint age);

    // Constructor: đặt owner = người deploy
    constructor() {
        owner = msg.sender;
    }

    // Modifier chỉ cho owner gọi
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Hàm để owner thêm student cho user
    function addStudent(address user, string memory name, uint age) public onlyOwner {
        require(!students[user].isRegistered, "Already registered");

        students[user] = Student({
            name: name,
            age: age,
            isRegistered: true
        });

        emit StudentAdded(user, name, age);
    }

    // Hàm lấy thông tin student
    function getStudent(address user) public view returns (string memory, uint, bool) {
        Student memory s = students[user];
        return (s.name, s.age, s.isRegistered);
    }

    // Kiểm tra user đã đăng ký hay chưa
    function isStudentRegistered(address user) public view returns (bool) {
        return students[user].isRegistered;
    }
}
