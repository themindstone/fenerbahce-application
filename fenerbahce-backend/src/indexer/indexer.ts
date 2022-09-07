import { AuctionContract } from "~/contracts/auction.contract";
import { OnEvent } from "@nestjs/event-emitter";
import { AuctionService } from "~/auction/auction.service";

export class Indexer {

    constructor(
        private readonly auctionContract: AuctionContract,
        private readonly auctionService: AuctionService
    ) {}


    @OnEvent("auction.created")
    auctionCreated() {
        console.log("auction.created 2")
    }
}
