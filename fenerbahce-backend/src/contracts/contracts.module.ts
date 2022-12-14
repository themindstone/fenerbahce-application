import { Global, Module } from "@nestjs/common";
import { MoralisAPIService } from "~/shared/libs";
import { AuctionContract } from "./auction.contract";


// @deprecated
@Global()
@Module({
    providers: [AuctionContract, MoralisAPIService],
    exports: [AuctionContract],
})
export class ContractsModule {
}
