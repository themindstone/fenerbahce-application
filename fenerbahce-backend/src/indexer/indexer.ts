import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Auction as AuctionRepository, Balance as BalanceRepository } from "~/shared/entities";
import { Repository } from "typeorm";
import { IndexerAuctionContractCreatedDTO, IndexerAuctionContractDepositedDTO, IndexerAuctionContractRefundedDTO, IndexerAuctionContractProlongedDTO } from "./indexer.model";
import { v4 } from "uuid";

export class Indexer {

    constructor(
        @InjectRepository(AuctionRepository) private readonly auctionRepository: Repository<AuctionRepository>,
        @InjectRepository(BalanceRepository) private readonly balanceRepository: Repository<BalanceRepository>,
    ) {
    }

    @OnEvent("auction.created")
    async created({ auctionId, bidIncrement }: IndexerAuctionContractCreatedDTO) {
        await this.auctionRepository
            .createQueryBuilder()
            .update({ isActive: true, bidIncrement: bidIncrement })
            .where({ id: auctionId })
            .execute();
    }

    @OnEvent("auction.deposited")
    async deposited({ auctionId, address, value }: IndexerAuctionContractDepositedDTO) {
        console.log("address: ", address);
        // this will switch to typeorm query builder
        this.balanceRepository.query(`
            insert into balances (id, auction_id, user_address, balance)
            values ($1, $2, $3, $4)
            on conflict ( user_address, auction_id )
            do
            update set balance = balances.balance + 100
            where
            balances.auction_id = $2 and
            balances.user_address = $3;
        `, [v4(), auctionId, address, value]);
    }

    @OnEvent("auction.refunded")
    async refunded({ auctionId, toAddress, value }: IndexerAuctionContractRefundedDTO) {
        this.balanceRepository.query(`
            update balances set balance = balance - $1
            where auction_id = $2 and user_address = $3
        `, [value, auctionId, toAddress]);
    }

    @OnEvent("auction.refunded")
    async prolonged({ auctionId, endDate }: IndexerAuctionContractProlongedDTO) {
    }

};