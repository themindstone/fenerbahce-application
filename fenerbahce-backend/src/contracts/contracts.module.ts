import { Module } from "@nestjs/common";
import { AuctionContract } from "./auction.contract";

@Module({
    providers: [AuctionContract],
    exports: [AuctionContract],
})
export class ContractsModule {};

