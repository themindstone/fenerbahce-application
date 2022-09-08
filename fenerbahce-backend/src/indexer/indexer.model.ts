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

    @IsNumber()
    value: number;
}

export class IndexerAuctionContractRefundedDTO {
    @IsString()
    auctionId: string;

    @IsString()
    toAddress: string;

    @IsNumber()
    value: number;
}

export class IndexerAuctionContractProlongedDTO {

    @IsString()
    auctionId: string;

    @IsString()
    endDate: string;

}
