import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";


export class Indexer {


    constructor(
        private readonly eventEmitter: EventEmitter2
    ) {
    }

    @OnEvent("auction.created")
    created() {
        console.log("auction.created 2")
    }
}
