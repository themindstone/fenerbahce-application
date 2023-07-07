import { Type } from "class-transformer";
import {
    ArrayMinSize,
    IsArray,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateIf,
} from "class-validator";

class PhotoUrls {
    @IsString()
    @IsNotEmpty()
    photoUrl: string;
}

export class Auction {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsISO8601()
    @ValidateIf((o) => new Date(o.startDate).getTime() > new Date().getTime())
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

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => PhotoUrls)
    photoUrls: Array<PhotoUrls>;
}

export class UpdateAuctionDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsISO8601()
    @IsOptional()
    startDate: string;

    @IsISO8601()
    @IsOptional()
    endDate: string;

    @IsNumber()
    @IsOptional()
    startPrice: number;

    @IsNumber()
    @IsOptional()
    buyNowPrice: number;

    @IsNumber()
    @IsOptional()
    bidIncrement: number;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => PhotoUrls)
    @IsOptional()
    photoUrls: Array<PhotoUrls>;
}

export class FinishAuctionDto {
    auctionId: number;
}
