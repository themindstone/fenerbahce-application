import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import {
    Auction as AuctionRepository,
    Balance as BalanceRepository,
} from "~/shared/entities";
import { Repository } from "typeorm";
import { IndexerAuctionContractDepositedDTO } from "./indexer.model";
import { v4 } from "uuid";

export class Indexer {
    constructor(
        @InjectRepository(AuctionRepository)
        private readonly auctionRepository: Repository<AuctionRepository>,
        @InjectRepository(BalanceRepository)
        private readonly balanceRepository: Repository<BalanceRepository>,
    ) {}

    @OnEvent("auction.deposited")
    async deposited({
        auctionId,
        address,
        value,
    }: IndexerAuctionContractDepositedDTO) {
        const auction = await this.auctionRepository.findOne({
            where: { id: auctionId },
        });

        if (!auction) {
            console.log("auction not found");
            return;
        }

        if (auction.isSelled) {
            console.log("auction is already selled");
            return;
        }
        console.log(auction.endDate.getTime(), new Date().getTime());
        if (auction.endDate.getTime() < new Date().getTime()) {
            console.log("auction is already ended");
            return;
        }

        if (auction.startDate.getTime() > new Date().getTime()) {
            console.log("auction is not started yet");
            return;
        }

        console.log("value", value)

        const balance = await this.balanceRepository.query(
            `
            insert into balances (id, auction_id, user_address, balance)
            values ($1, $2, $3, $4)
            on conflict ( user_address, auction_id )
            do
            update set balance = $4
            where
            balances.auction_id = $2 and
            balances.user_address = $3
            returning *;
        `,
            [v4(), auctionId, address, value],
        );

        // let endDate = auction.endDate;
        let obj: any = {};
        let willBeUpdated = false;

        if (
            auction.endDate.getTime() > new Date().getTime() &&
            auction.endDate.getTime() - 60 * 30 * 1000 < new Date().getTime()
        ) {
            const addDate =
                60 * 30 * 1000 -
                (auction.endDate.getTime() - new Date().getTime());
            obj.endDate = new Date(auction.endDate.getTime() + addDate);
            willBeUpdated = true;
            console.log("auction new dates", auction.endDate, obj.endDate);
            // last 30 minutes
        }

        if (balance[0].balance >= auction.buyNowPrice) {
            willBeUpdated = true;
            obj = { isSelled: true, selledToAddress: address, ...obj };
        }

        if (willBeUpdated) {
            await this.auctionRepository.update({ id: auctionId }, obj);
        }
    }

    // @OnEvent("auction.refunded")
    // async refunded({
    //     auctionId,
    //     to,
    //     value,
    // }: IndexerAuctionContractRefundedDTO) {
    //     this.balanceRepository.query(
    //         `
    //         update balances set balance = balance - $1
    //         where auction_id = $2 and user_address = $3
    //     `,
    //         [value, auctionId, to],
    //     );
    // }

    // @OnEvent("auction.prolonged")
    // async prolonged({
    //     auctionId,
    //     endDate,
    // }: IndexerAuctionContractProlongedDTO) {
    //     await this.auctionRepository
    //         .createQueryBuilder()
    //         .update({ endDate })
    //         .where({ id: auctionId })
    //         .execute();
    // }

    // @OnEvent("auction.buynowpriceupdated")
    // async buyNowPriceUpdated({
    //     auctionId,
    //     newBuyNowPrice,
    // }: IndexerAuctionContractBuyNowPriceUpdatedDTO) {
    //     await this.auctionRepository
    //         .createQueryBuilder()
    //         .update({ buyNowPrice: newBuyNowPrice })
    //         .where({ id: auctionId })
    //         .execute();
    // }
}
