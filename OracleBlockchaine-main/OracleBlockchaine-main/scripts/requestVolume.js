// scripts/requestVolume.js
async function main() {
  const [deployer] = await ethers.getSigners();

  const apiConsumerAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"; // APIConsumer
  const apiConsumer = await ethers.getContractAt(
    "APIConsumer",
    apiConsumerAddress
  );

  console.log("Requesting volume data...");
  const tx = await apiConsumer.requestVolumeData();
  await tx.wait();
  console.log("Request sent. Waiting for fulfillment...");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
