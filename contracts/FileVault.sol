// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract FileVault {
  struct File {
    string cid;
    uint256 timestamp;
  }

  mapping (address => File[]) private userFiles;

  event FileAdded(address indexed user, string cid);

  function addFile(string calldata cid) external {
    userFiles[msg.sender].push(
        File(cid, block.timestamp)
    );
    
    emit FileAdded(msg.sender, cid);
  }

  function getMyFiles() external view returns (File[] memory) {
    return userFiles[msg.sender];
  }

}