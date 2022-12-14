import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "~/auth/auth.service";
import { Auction, Balance } from "~/shared/entities";
import { AuctionController } from "./auction.controller";
import { AuctionService } from "./auction.service";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Auction, Balance])],
    controllers: [AuctionController],
    providers: [AuctionService, AuthService],
    exports: [AuctionService],
})
export class AuctionModule {}
