import { IsArray, IsNumber, IsString } from "class-validator";

export class Product {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    startDate: string;

    @IsString()
    endDate: string;

    @IsString()
    slug: string;

    @IsNumber()
    auctionStartPrice: number;

    @IsNumber()
    auctionImmediatePrice: number;

    @IsArray()
    photoUrls: string[];

    @IsArray()
    offers: string[];
}

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    startDate: string;

    @IsString()
    endDate: string;

    @IsString()
    slug: string;

    @IsNumber()
    auctionStartPrice: number;

    @IsNumber()
    auctionImmediatePrice: number;

    @IsArray()
    photoUrls: string[];
}
