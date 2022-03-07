var Election = artifacts.require("./Election.sol"); // Using mocha and chai from Truffle Suite

contract("Election", function(accounts) {
  var electionInstance;

  it("initializes with two candidates", function() { // Declare message
    return Election.deployed().then(function(instance) { // Fetch instance of deployed contract
      return instance.candidatesCount(); // Fetch candidates count
    }).then(function(count) { // Need to execute a promise chain, so inject value to count
      assert.equal(count, 2); // Assert candidate account should be 2
    });
  });

  it("it initializes the candidates with the correct values", function() {
    return Election.deployed().then(function(instance) { // Fetch instance of deployed contract
      electionInstance = instance; // Assign deployed contract to electionInstance variable (as you can't acces the instance variable in line above)
      return electionInstance.candidates(1); // Test values for candidate 1
    }).then(function(candidate) {
      assert.equal(candidate[0], 1, "contains the correct id"); // These messages will appear in error if test fails
      assert.equal(candidate[1], "Candidate 1", "contains the correct name");
      assert.equal(candidate[2], 0, "contains the correct votes count");
      return electionInstance.candidates(2);
    }).then(function(candidate) { // Test values for candidate 2
      assert.equal(candidate[0], 2, "contains the correct id");
      assert.equal(candidate[1], "Candidate 2", "contains the correct name");
      assert.equal(candidate[2], 0, "contains the correct votes count");
    });
  });

  it("allows a voter to cast a vote", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, { from: accounts[0] });
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1, "an event was triggered");
      assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
      assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct");
      return electionInstance.voters(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted");
      return electionInstance.candidates(candidateId);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "increments the candidate's vote count");
    })
  });

it("throws an exception for invalid candidates", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.vote(99, { from: accounts[1] }) // Vote for candidate 99
    }).then(assert.fail).catch(function(error) { // Check for error with assert.fail, catch it in promise chain
      console.log("ERROR MESSAGE: " + error.message.toString())
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert"); // Want a error containing 'revert'
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes"); // Want to check vote count for candidate 1 is unaltered (has 1 vote from cast vote test)
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 0, "candidate 2 did not receive any votes"); // Want to check vote count for candidate 2 is unaltered
    });
  });

// !!THIS TEST DOES NOT WORK, THE ERROR MESSAGE DOES NOT CONTAIN 'revert', TRYING TO DOUBLE VOTE IN TRUFFLE CONSOLE IT DOES PRODUCE RIGHT ERROR MESSAGE THOUGH!!
it("throws an exception for double voting", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 2;
      electionInstance.vote(candidateId, { from: accounts[1] }); // Try to vote from account 1 this time for candidate 2
      return electionInstance.candidates(candidateId);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "accepts first vote"); // Check candidate 2 received the vote
      // Try to vote again
      return electionInstance.vote(candidateId, { from: accounts[1] }) // Try to vote again from account 1
    }).then(assert.fail).catch(function(error) { // assertfail to check for error
      console.log("ERROR MESSAGE: " + error.message.toString());
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert"); // Should receive error with 'revert'
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes"); // Want to check vote count for candidate 1 is unaltered (has 1 vote from cast vote test)
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 1, "candidate 2 did not receive any votes"); // Want to check vote count for candidate 2 is unaltered (has 1 vote from earlier in this test)
    });
  });

});