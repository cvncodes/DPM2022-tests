pragma solidity >=0.4.22 <0.8.0;
 
contract SITApreferences2{
   // Model a preferences set
    //struct Preferences { // Might be easier to store preferences as a list or a different structure, particularly when we want to encrypt
        //uint spatial;
        //uint identity;
        //uint temporal;
        //uint activity;
    //}


    mapping(address => uint[4]) userpreferences;

    constructor() public{}

    function setPreferences(uint spatial, uint identity, uint temporal, uint activity) public returns(bool success){
      // Require statement here to ensure all dimensions are 0-4
      userpreferences[msg.sender] = [spatial,identity,temporal,activity];
      return(true); // Need to return upon success of setting, but need require statement
    }

    function getPreferences() public returns(uint[4] memory preferencesList){
      return(userpreferences[msg.sender]);

    }

}