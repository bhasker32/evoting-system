const hre = require("hardhat");

async function main() {

  const Voting = await hre.ethers.getContractFactory("VotingPlatform");

  const voting = await Voting.deploy();

  await voting.waitForDeployment();

  console.log("VotingPlatform deployed to:", await voting.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});