async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying LinkToken...");
  const linkTokenFactory = await ethers.getContractFactory("LinkToken");
  const linkToken = await linkTokenFactory.deploy();
  await linkToken.deployed();
  console.log("LinkToken deployed to:", linkToken.address);

  console.log("Deploying MockOracle...");
  const mockOracleFactory = await ethers.getContractFactory("MockOracle");
  const mockOracle = await mockOracleFactory.deploy(linkToken.address);
  await mockOracle.deployed();
  console.log("MockOracle deployed to:", mockOracle.address);

  console.log("Deploying APIConsumer...");
  const apiConsumerFactory = await ethers.getContractFactory("APIConsumer");
  const apiConsumer = await apiConsumerFactory.deploy(
    linkToken.address,
    mockOracle.address
  );
  await apiConsumer.deployed();
  console.log("APIConsumer deployed to:", apiConsumer.address);

  console.log("\nDeployment complete:");
  console.log(`LinkToken address: ${linkToken.address}`);
  console.log(`MockOracle address: ${mockOracle.address}`);
  console.log(`APIConsumer address: ${apiConsumer.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
