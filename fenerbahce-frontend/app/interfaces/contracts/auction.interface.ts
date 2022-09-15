
export type AuctionContractFunctionReturnType = {
    tx?: any;
    isError: boolean;
    errorMessage?: string;
}

export interface AuctionContractDepositDTO {
    auctionId: string;
    value: string;
}

export interface AuctionContractBuyNowDTO {
    auctionId: string;
    buyNowPrice: string;
}

export interface AuctionContractFunctions {
    deposit: (args: AuctionContractDepositDTO) => Promise<AuctionContractFunctionReturnType>;
    buyNow: (args: AuctionContractBuyNowDTO) => Promise<AuctionContractFunctionReturnType>;
}

export interface AuctionContractErrors {
    AlreadySelledError: string;
    AuctionNotFoundError: string;
    AuctionFinishedError: string;
    AuctionNotStartedError: string;
    AuctionStartPriceError: string;
    IncreaseByBidIncrementError: string;
    UnknownError: string;
}