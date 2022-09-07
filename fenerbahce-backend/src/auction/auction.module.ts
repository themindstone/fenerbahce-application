import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "~/auth/auth.service";
import { AuctionContract } from "~/contracts/auction.contract";
import { Auction } from "~/shared/entities";
import { AuctionController } from "./auction.controller";
import { AuctionService } from "./auction.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Auction,
        ]),
    ],
    controllers: [AuctionController],
    providers: [AuctionService, AuthService, AuctionContract],
})
export class AuctionModule {}
