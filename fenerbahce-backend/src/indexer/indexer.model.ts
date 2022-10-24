import { IsNumber, IsString } from "class-validator";

export class IndexerAuctionContractCreatedDTO {
    @IsNumber()
    auctionId: number;

    @IsNumber()
    bidIncrement: number;
}

export class IndexerAuctionContractDepositedDTO {
    @IsNumber()
    auctionId: number;

    @IsString()
    address: string;

    value: string;
}
