
export type AuctionContractFunctionReturnType = {
    tx?: any;
    isError: boolean;
    errorMessage?: string;
}

export interface AuctionContractDepositDTO {
    auctionId: number;
    value: string;
}

export interface AuctionContractCreateAuctionDto {
    auctionId: number;
}

export interface AuctionContractFunctions {
    deposit: (args: AuctionContractDepositDTO) => Promise<AuctionContractFunctionReturnType>;
    createAuction: (args: AuctionContractCreateAuctionDto) => Promise<AuctionContractFunctionReturnType>;
    isConnected: boolean;
}

export interface AuctionContractErrors {
    AlreadySelledError: string;
    AuctionNotFoundError: string;
    AuctionFinishedError: string;
    AuctionNotFinishedError: string;
    AuctionNotStartedError: string;
    AuctionStartPriceError: string;
    UnknownError: string;
    OwnableError: string;
    BelowBuyNowPriceError: string;
    AuctionRefundAlreadyDoneError: string;
}
