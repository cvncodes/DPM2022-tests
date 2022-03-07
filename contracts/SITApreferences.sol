pragma solidity >=0.4.22 <0.8.0;
 
contract SITApreferences{
   // Model a preferences set
    struct Preferences { // Might be easier to store preferences as a list or a different structure, particularly when we want to encrypt
        uint spatial;
        uint identity;
        uint temporal;
        uint activity;
    }

    mapping(address => Preferences) userpreferences;

    constructor() public{}

    function setPreferences(uint spatial, uint identity, uint temporal, uint activity) public returns(bool success){
      // Require statement here to ensure all dimensions are 0-4
      userpreferences[msg.sender] = Preferences(spatial,temporal,identity,activity);
      return(true);
    }

 function getPreferences() public returns(uint[4] memory preferencesList){
   // Can't just return a struct unless using an experimental method (may be changed in future), will need to just return the 4 variables then re-create struct later?
   Preferences memory userspreferences = userpreferences[msg.sender];
   return([userspreferences.spatial,userspreferences.identity,userspreferences.temporal,userspreferences.activity]);
 }

}