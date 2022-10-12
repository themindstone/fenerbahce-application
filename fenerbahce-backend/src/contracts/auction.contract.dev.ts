import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Contract, BigNumber, parseUnits, formatUnits } from "nestjs-ethers";

interface AuctionContractCreateAuctionDto {
    auctionId: string;
    startDate: string;
    endDate: string;
    bidIncrement: number;
    startPrice: number;
    buyNowPrice: number;
}

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

    async auctionSelled(auctionId: string, buyer: string, e: any) {
        if (this.startBlockNumber >= e.block_number) {
            return;
        }

        this.eventEmitter.emit("auction.selled", {
            auctionId,
            buyer: buyer.toLocaleLowerCase(),
        });
    }

    auctionRefunded({ auctionId, to, value, block_number }: any) {
        if (this.startBlockNumber >= block_number) {
            return;
        }

        this.eventEmitter.emit("auction.refunded", {
            auctionId,
            to: to.toLocaleLowerCase(),
            value: formatUnits(value, "6"),
        });
    }

    async auctionBuyNowPriceUpdated({
        auctionId,
        newBuyNowPrice,
        block_number,
    }: any) {
        if (this.startBlockNumber >= block_number) {
            return;
        }

        this.eventEmitter.emit("auction.buynowpriceupdated", {
            auctionId,
            newBuyNowPrice: formatUnits(newBuyNowPrice, "6"),
        });
    }

    auctionProlonged(auctionId: string, date: string, e: any) {
        if (this.startBlockNumber >= e.block_number) {
            return;
        }

        this.eventEmitter.emit("auction.prolonged", {
            auctionId,
            endDate: new Date(Number(date) * 1000),
        });
    }

    async createAuction({
        startDate,
        endDate,
        startPrice,
        buyNowPrice,
    }: AuctionContractCreateAuctionDto) {
        const tx = await this.contract.createAuction(
            BigNumber.from(Math.floor(new Date(startDate).getTime() / 1000)),
            BigNumber.from(Math.floor(new Date(endDate).getTime() / 1000)),
            parseUnits(startPrice.toString(), "6"),
            parseUnits(buyNowPrice.toString(), "6"),
        );
        return await tx.wait();
    }

    async refundTokensToUsers(auctionId: string, losers: string[]) {
        return await Promise.all(
            losers.map(async (loser) => {
                const tx = await this.contract.refund(auctionId, loser);
                await tx.wait();
            }),
        );
    }
}
