const fs = require("fs");
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const SVGNFT = await ethers.getContractFactory("SVGNFT");
  const svgNft = await SVGNFT.deploy();
  await svgNft.deployed();

  console.log("SVGNFT address:", svgNft.address);

  console.log("Lets create NFT now!");
  const filePath = "./img/round.svg";
  let svg = fs.readFileSync(filePath, { encoding: "utf8" });
  console.log(
    `We will use ${filePath} as our SVG, and this will turn into a tokenURI. `
  );
  const tx = await svgNft.create(svg);
  console.log("NFT details", await svgNft.tokenURI(0));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
