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