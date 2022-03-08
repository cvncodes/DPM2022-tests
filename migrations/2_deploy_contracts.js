var SITApreferences = artifacts.require("./SITApreferences.sol"); 
var SITApreferences2 = artifacts.require("./SITApreferences2.sol");

module.exports = function(deployer) {
  deployer.deploy(SITApreferences);
  deployer.deploy(SITApreferences2);
};

