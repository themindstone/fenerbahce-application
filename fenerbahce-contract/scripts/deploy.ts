import { ethers } from "hardhat";

async function main() {
	let accounts = await ethers.getSigners();

	let fenerbahceAddress = "0xFB19075D77a0F111796FB259819830F4780f1429";

	if (process.env.NODE_ENV !== "mainnet") {

		const FenerbahceToken = await ethers.getContractFactory("FBToken");
		const fenerbahceToken = await FenerbahceToken.connect(accounts[0]).deploy([
			"0x1070cF71bEFe2D83faE5CfD337f5A118F61F227f",
			"0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
		]);
		await fenerbahceToken.deployed();

		console.log(`FBToken deployed to ${fenerbahceToken.address}`);
		fenerbahceAddress = fenerbahceToken.address;
	}

	const FenerbahceAuction = await ethers.getContractFactory(
		"FenerbahceAuction"
	);
	const fenerbahceAuction = await FenerbahceAuction.connect(accounts[0]).deploy(fenerbahceAddress);

	await fenerbahceAuction.deployed();

	console.log(`FenerbahceAuction deployed to ${fenerbahceAuction.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
