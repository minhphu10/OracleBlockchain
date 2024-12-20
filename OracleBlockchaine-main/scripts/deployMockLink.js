const { ethers } = require("hardhat");

async function main() {
  // Lấy account deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Triển khai Mock LINK Token
  const LinkToken = await ethers.getContractFactory("LinkToken");
  const linkToken = await LinkToken.deploy();
  await linkToken.deployed();
  console.log("Mock LINK Token deployed at:", linkToken.address);

  // Cấp phát LINK cho tài khoản của bạn
  const recipient = deployer.address; // Thay địa chỉ bạn muốn nhận LINK
  const amount = ethers.utils.parseUnits("1000", 18); // 1000 LINK
  await linkToken.transfer(recipient, amount);
  console.log(`1000 LINK has been sent to ${recipient}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
