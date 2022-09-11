import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuctionModule } from "~/auction/auction.module";
import { AuctionService } from "~/auction/auction.service";
import { Auction, Balance } from "~/shared/entities";
import { Indexer } from "./indexer";

@Module({
    imports: [TypeOrmModule.forFeature([Auction, Balance]), AuctionModule],
    providers: [Indexer, AuctionService],
})
export class IndexerModule {}
