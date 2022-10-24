export const auctionAddress = {
	development: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
	test: "0xD835468F3f53Fe041426F6DE4077Af8fB465d663",
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
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint32",
				name: "auctionId",
				type: "uint32",
			},
		],
		name: "AuctionCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint32",
				name: "auctionId",
				type: "uint32",
			},
			{
				indexed: false,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "AuctionDeposited",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint32",
				name: "auctionId",
				type: "uint32",
			},
			{
				indexed: false,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "AuctionRefunded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
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
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
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
				name: "_to",
				type: "address",
			},
		],
		name: "refund",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "withdraw",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenAddress",
				type: "address",
			},
		],
		name: "withdrawOtherTokens",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
