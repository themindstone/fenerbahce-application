export const auctionAddress = {
	development: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
	test: "0xe13C622B564216F4483BcadFa2B01De18a484377",
	production: "0x91E21fB57780bFF919a0D77B9882EfF18936f672",
};

export const auctionABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_address",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "uint32",
				name: "_auctionId",
				type: "uint32",
			},
		],
		name: "createAuction",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint32",
				name: "_auctionId",
				type: "uint32",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "deposit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getLatestId",
		outputs: [
			{
				internalType: "uint32",
				name: "",
				type: "uint32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint32",
				name: "_auctionId",
				type: "uint32",
			},
			{
				internalType: "address",
				name: "_address",
				type: "address",
			},
		],
		name: "getUserBalanceByAuctionId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
