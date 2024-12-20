const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const linkTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Mock LINK Token address
  const apiConsumerAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Địa chỉ APIConsumer

  const LinkToken = await hre.ethers.getContractAt(
    "LinkToken",
    linkTokenAddress
  );

  const amount = hre.ethers.utils.parseEther("1"); // Gửi 1 LINK
  const tx = await LinkToken.transfer(apiConsumerAddress, amount);
  await tx.wait();

  console.log(`Sent 1 LINK to ${apiConsumerAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
