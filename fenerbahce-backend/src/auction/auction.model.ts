import { IsArray, IsISO8601, IsNumber, IsString, ValidateIf } from "class-validator";

export class Auction {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsISO8601()
    @ValidateIf(o => new Date(o.startDate).getTime() > new Date().getTime())
    @IsString()
    startDate: string;

    @IsString()
    endDate: string;

    @IsNumber()
    startPrice: number;

    @IsNumber()
    buyNowPrice: number;

    @IsNumber()
    bidIncrement: number;

    @IsArray()
    photoUrls: string[];

    @IsArray()
    balances: number[];
}

export class CreateAuctionDto {
    @IsString()
    name: string;

    @IsISO8601()
    startDate: string;

    @IsISO8601()
    endDate: string;

    @IsNumber()
    startPrice: number;

    @IsNumber()
    buyNowPrice: number;

    @IsNumber()
    bidIncrement: number;

    @IsArray()
    photoUrls: string[];
}

export class FinishAuctionDto {
    auctionId: number;
}
