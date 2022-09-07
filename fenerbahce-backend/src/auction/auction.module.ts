import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "~/auth/auth.module";
import { Auction } from "~/shared/entities";
import { AuctionController } from "./auction.controller";
import { AuctionService } from "./auction.service";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            Auction,
        ]),
    ],
    controllers: [AuctionController],
    providers: [AuctionService],
})
export class ProductModule {}
