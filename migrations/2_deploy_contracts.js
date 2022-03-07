var SITApreferences = artifacts.require("./SITApreferences.sol"); // Artifact to represent our election contract we can interact with

module.exports = function(deployer) {
  deployer.deploy(SITApreferences);
};

