import { IsArray, IsNumber, IsString } from "class-validator";

export class Auction {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    startDate: string;

    @IsString()
    endDate: string;

    // @IsString()
    // slug: string;

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

    @IsString()
    startDate: string;

    @IsString()
    endDate: string;

    // @IsString()
    // slug: string;

    @IsNumber()
    startPrice: number;

    @IsNumber()
    buyNowPrice: number;

    @IsNumber()
    bidIncrement: number;

    @IsArray()
    photoUrls: string[];
}
