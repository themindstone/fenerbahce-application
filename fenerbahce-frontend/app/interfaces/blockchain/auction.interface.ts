
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
    isConnected: boolean;
}

export interface AuctionContractErrors {
    UnknownError: string;
    InsufficentAllowance: string;
    InsufficentBalance: string;
    InsufficentFBTokenBalance: string;
	UserDeniedTransaction: string;
}
