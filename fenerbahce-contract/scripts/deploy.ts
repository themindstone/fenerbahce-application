import { ethers } from "hardhat";

async function main() {
	let accounts = await ethers.getSigners();

	const FenerbahceAuction = await ethers.getContractFactory(
		"FenerbahceAuction"
	);
	const fenerbahceAuction = await FenerbahceAuction.connect(accounts[0]).deploy();

	await fenerbahceAuction.deployed();

	console.log(`FenerbahceAuction deployed to ${fenerbahceAuction.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
