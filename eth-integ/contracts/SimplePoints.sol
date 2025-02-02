pragma solidity ^0.8.0;

contract SimplePoints {
    mapping(address => uint256) public points;

    function earnPoints(uint256 _points) public {
        points[msg.sender] += _points;
    }

    function getPoints() public view returns (uint256) {
        return points[msg.sender];
    }

    function redeemPoints(uint256 _points) public {
        require(points[msg.sender] >= _points, "Not enough points.");
        points[msg.sender] -= _points;
    }
}
