// scripts/fundAPIConsumer.js
async function main() {
  const [deployer] = await ethers.getSigners();

  const linkTokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Mock LINK Token
  const apiConsumerAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"; // APIConsumer

  const linkToken = await ethers.getContractAt("LinkToken", linkTokenAddress);
  const amount = ethers.utils.parseUnits("1.0", 18); // 1 LINK Token

  console.log(`Funding APIConsumer with LINK...`);
  const tx = await linkToken.transfer(apiConsumerAddress, amount);
  await tx.wait();
  console.log(`APIConsumer funded with 1 LINK`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
