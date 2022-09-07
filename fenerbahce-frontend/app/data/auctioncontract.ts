export const auctionAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const auctionABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bytes32",
				name: "auctionId",
				type: "bytes32",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "auctionStartDate",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "auctionEndDate",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "bidIncrement",
				type: "uint256",
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
				internalType: "bytes32",
				name: "auctionId",
				type: "bytes32",
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
				internalType: "bytes32",
				name: "auctionId",
				type: "bytes32",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "toDate",
				type: "uint256",
			},
		],
		name: "AuctionProlonged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bytes32",
				name: "auctionId",
				type: "bytes32",
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
				internalType: "bytes32",
				name: "_auctionId",
				type: "bytes32",
			},
			{
				internalType: "uint256",
				name: "_auctionStartDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_auctionEndDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_bidIncrement",
				type: "uint256",
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
				internalType: "bytes32",
				name: "_auctionId",
				type: "bytes32",
			},
		],
		name: "depositToAuction",
		outputs: [],
		stateMutability: "payable",
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
				internalType: "bytes32",
				name: "_auctionId",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "_to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "refund",
		outputs: [],
		stateMutability: "payable",
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
];
