pragma solidity >=0.4.22 <0.8.0;
 
contract SITApreferences2{
    mapping(bytes => uint[4]) userpreferences; // Mapping bytes (address + key) as you cant use struct or array as mapping keys
    // Need to use bytes to be able to concatenate the address and key, should change later to a particular size bytes when we know address and key combined size

    constructor() public{}

    function setPreferences(uint spatial, uint identity, uint temporal, uint activity, string memory key) public returns(bool success){
      // Require statement here to ensure all dimensions are 0-4
      bytes memory keyBytes = abi.encodePacked(key); // Convert string parameter for the secret key to bytes
      userpreferences[abi.encodePacked(msg.sender, keyBytes)] = [spatial,identity,temporal,activity]; // Store the preference array mapped under address + secret key as the mapping key
      return(true); // Need to return upon success of setting, but need require statement
    }

    function getPreferences(string memory key) public returns(uint[4] memory preferencesList){
      bytes memory keyBytes = abi.encodePacked(key); // Convert string parameter for the secret key to bytes
      return(userpreferences[abi.encodePacked(msg.sender, keyBytes)]);

    }

}