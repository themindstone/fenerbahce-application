import { ethers } from "hardhat";

async function main() {
	let accounts = await ethers.getSigners();

	// let fenerbahceAddress = "0x9b77053b733DDdA6B9F1E120280D154fb71a9392";
	let fenerbahceAddress = "0xFB19075D77a0F111796FB259819830F4780f1429";

	if (process.env.NODE_ENV !== "mainnet") {

		const FenerbahceToken = await ethers.getContractFactory("FBToken");
		const fenerbahceToken = await FenerbahceToken.connect(accounts[0]).deploy([
			"0x3b1a7ed59dc25D1438aAD9D139630DB1613953b2",
		]);
		await fenerbahceToken.deployed();

		console.log(`FBToken deployed to ${fenerbahceToken.address}`);
		fenerbahceAddress = fenerbahceToken.address;
	}

	const FenerbahceAuction = await ethers.getContractFactory(
		"FenerbahceAuction"
	);
	// console.log(FenerbahceAuction);
	const fenerbahceAuction = await FenerbahceAuction.connect(accounts[0]).deploy(fenerbahceAddress);
	// console.log(fenerbahceAuction);

	await fenerbahceAuction.deployed();

	console.log(`FenerbahceAuction deployed to ${fenerbahceAuction.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
