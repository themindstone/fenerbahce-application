export const auctionAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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
                internalType: "string",
                name: "auctionId",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newBuyNowPrice",
                type: "uint256",
            },
        ],
        name: "AuctionBuyNowPriceUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "auctionId",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "startPrice",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "buyNowPrice",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "bidIncrement",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "startDate",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "endDate",
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
                internalType: "string",
                name: "auctionId",
                type: "string",
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
                internalType: "string",
                name: "auctionId",
                type: "string",
            },
        ],
        name: "AuctionFinished",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "auctionId",
                type: "string",
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
                internalType: "string",
                name: "auctionId",
                type: "string",
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
                indexed: false,
                internalType: "string",
                name: "auctionId",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
        ],
        name: "AuctionSelled",
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
                internalType: "string",
                name: "_auctionId",
                type: "string",
            },
        ],
        name: "buyNow",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_auctionId",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_startDate",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_endDate",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_bidIncrement",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_startPrice",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_buyNowPrice",
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
                internalType: "string",
                name: "_auctionId",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "depositToAuction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_auctionId",
                type: "string",
            },
            {
                internalType: "address[]",
                name: "_addresses",
                type: "address[]",
            },
        ],
        name: "finishAuction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_auctionId",
                type: "string",
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
                internalType: "string",
                name: "_auctionId",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_newPrice",
                type: "uint256",
            },
        ],
        name: "updateBuyNowPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
