const Enrollment = artifacts.require("Enrollment");

module.exports = function(deployer) {
  deployer.deploy(Enrollment);
};

