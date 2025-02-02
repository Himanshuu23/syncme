const SimplePoints = artifacts.require("SimplePoints");

module.exports = function(deployer) {
  deployer.deploy(SimplePoints);
};
