import { IsNumber, IsString, IsUUID } from "class-validator";

export class IndexerAuctionContractCreatedDTO {
    @IsUUID()
    auctionId: string;

    @IsNumber()
    bidIncrement: number;
}

export class IndexerAuctionContractDepositedDTO {
    @IsUUID()
    auctionId: string;

    @IsString()
    address: string;

    value: string;
}

export class IndexerAuctionContractRefundedDTO {
    @IsString()
    auctionId: string;

    @IsString()
    to: string;

    value: number;
}

export class IndexerAuctionContractProlongedDTO {
    @IsString()
    auctionId: string;

    @IsString()
    endDate: string;
}

export class IndexerAuctionContractBuyNowPriceUpdatedDTO {
    @IsString()
    auctionId: string;

    @IsNumber()
    newBuyNowPrice: number;
}