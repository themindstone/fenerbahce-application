
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
}

export interface AuctionContractUpdateBuyNowPriceDTO {
    auctionId: string;
    newBuyNowPrice: string;
}

export interface AuctionContractFunctions {
    deposit: (args: AuctionContractDepositDTO) => Promise<AuctionContractFunctionReturnType>;
    buyNow: (args: AuctionContractBuyNowDTO) => Promise<AuctionContractFunctionReturnType>;
    updateBuyNowPrice: (args: AuctionContractUpdateBuyNowPriceDTO) => Promise<AuctionContractFunctionReturnType>;
    isConnected: boolean;
}

export interface AuctionContractErrors {
    AlreadySelledError: string;
    AuctionNotFoundError: string;
    AuctionFinishedError: string;
    AuctionNotFinishedError: string;
    AuctionNotStartedError: string;
    AuctionStartPriceError: string;
    IncreaseByBidIncrementError: string;
    UnknownError: string;
    OwnableError: string;
}
