import { Global, Module } from "@nestjs/common";
import { AuctionContract } from "./auction.contract";

@Global()
@Module({
    providers: [AuctionContract],
    exports: [AuctionContract],
})
export class ContractsModule {};
