import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import {
    Contract,
    BigNumber,
    formatUnits,
} from "nestjs-ethers";

@Injectable()
export class AuctionContractDevelopment {
    private contract: Contract;

    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly startBlockNumber: number,
    ) {
        this.startBlockNumber = startBlockNumber;
        this.eventEmitter = eventEmitter;
    }

    async auctionCreated(auctionId: BigNumber, e: any) {
        console.log("auction created");
        console.log(auctionId);
        if (this.startBlockNumber >= e.block_number) {
            return;
        }

        this.eventEmitter.emit("auction.created", {
            auctionId,
        });
    }

    async auctionDeposited(
        auctionId: string,
        from: string,
        value: BigNumber,
        e: any,
    ) {
        if (this.startBlockNumber >= e.block_number) {
            return;
        }

        this.eventEmitter.emit("auction.deposited", {
            auctionId,
            address: from.toLocaleLowerCase(),
            value: formatUnits(value, "6"),
        });
    }

    // auctionRefunded({ auctionId, to, value, block_number }: any) {
    //     if (this.startBlockNumber >= block_number) {
    //         return;
    //     }

    //     this.eventEmitter.emit("auction.refunded", {
    //         auctionId,
    //         to: to.toLocaleLowerCase(),
    //         value: formatUnits(value, "6"),
    //     });
    // }

    // async refundTokensToUsers(auctionId: string, losers: string[]) {
    //     return await Promise.all(
    //         losers.map(async (loser) => {
    //             const tx = await this.contract.refund(auctionId, loser);
    //             await tx.wait();
    //         }),
    //     );
    // }
}
