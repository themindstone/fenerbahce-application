import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { formatEther, formatUnits } from "nestjs-ethers";

interface AuctionContractCreateAuctionDto {
    auctionId: string;
    startDate: string;
    endDate: string;
    bidIncrement: number;
    startPrice: number;
    buyNowPrice: number;
}

@Injectable()
export class AuctionContractProduction {

    constructor(private eventEmitter: EventEmitter2, private startBlockNumber: number) {
        this.eventEmitter = eventEmitter;
        this.startBlockNumber = startBlockNumber;
    }


    // async auctionCreated({ auctionId, block_number }: any) {
    //     console.log(auctionId);
    //     if (this.startBlockNumber >= block_number) {
    //         return;
    //     }

    //     this.eventEmitter.emit("auction.created", {
    //         auctionId: formatEther(auctionId),
    //     });
    // }


    // async auctionDeposited({ auctionId, from, value, block_number }: any) {
    //     if (this.startBlockNumber >= block_number) {
    //         return;
    //     }

    //     this.eventEmitter.emit("auction.deposited", {
    //         auctionId,
    //         address: from,
    //         value: formatUnits(value, "6"),
    //     });
    // }

    // async auctionSelled({ auctionId, buyer, block_number }: any) {
    //     if (this.startBlockNumber >= block_number) {
    //         return;
    //     }

    //     this.eventEmitter.emit("auction.selled", {
    //         auctionId,
    //         buyer,
    //     });
    // }

    // auctionRefunded({ auctionId, to, value, block_number }: any) {
    //     if (this.startBlockNumber >= block_number) {
    //         return;
    //     }

    //     this.eventEmitter.emit("auction.refunded", {
    //         auctionId,
    //         to,
    //         value: formatUnits(value, "6"),
    //     });
    // }

    // auctionBuyNowPriceUpdated({
    //     auctionId,
    //     newBuyNowPrice,
    //     block_number,
    // }: any) {
    //     if (this.startBlockNumber >= block_number) {
    //         return;
    //     }

    //     this.eventEmitter.emit("auction.buynowpriceupdated", {
    //         auctionId,
    //         newBuyNowPrice: formatUnits(newBuyNowPrice, "6"),
    //     });
    // }

    // auctionProlonged({ auctionId, toDate, block_number }: any) {
    //     if (this.startBlockNumber >= block_number) {
    //         return;
    //     }
    //     this.eventEmitter.emit("auction.prolonged", {
    //         auctionId,
    //         endDate: new Date(Number(toDate) * 1000),
    //     });
    // }

    // async createAuction({
    //     auctionId,
    //     startDate,
    //     endDate,
    //     bidIncrement = 100,
    //     startPrice,
    //     buyNowPrice,
    // }: AuctionContractCreateAuctionDto) {
    //     const tx = await this.contract.createAuction(
    //         auctionId,
    //         BigNumber.from(Math.floor(new Date(startDate).getTime() / 1000)),
    //         BigNumber.from(Math.floor(new Date(endDate).getTime() / 1000)),
    //         parseUnits(bidIncrement.toString(), "18"),
    //         parseUnits(startPrice.toString(), "18"),
    //         parseUnits(buyNowPrice.toString(), "18"),
    //     );
    //     return await tx.wait();
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
