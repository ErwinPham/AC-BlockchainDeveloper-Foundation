// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract StudentRegistry {
    // Struct để lưu thông tin sinh viên
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    // mapping từ địa chỉ ví -> thông tin Student
    mapping(address => Student) private students;

    // Hàm để đăng ký sinh viên
    function register(string memory name, uint age) public {
        require(!students[msg.sender].isRegistered, "Already registered");

        students[msg.sender] = Student({
            name: name,
            age: age,
            isRegistered: true
        });
    }

    // Hàm trả về thông tin của 1 student theo địa chỉ
    function getStudent(address user) public view returns (string memory, uint, bool) {
        Student memory s = students[user];
        return (s.name, s.age, s.isRegistered);
    }

    // Kiểm tra xem student đã đăng ký hay chưa
    function isStudentRegistered(address user) public view returns (bool) {
        return students[user].isRegistered;
    }
}
