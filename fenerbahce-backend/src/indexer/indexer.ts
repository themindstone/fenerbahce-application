import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Auction as AuctionRepository, Offer as OfferRepository } from "~/shared/entities";
import { Repository } from "typeorm";
import { IndexerAuctionContractCreatedDTO, IndexerAuctionContractDepositedDTO } from "./indexer.model";

export class Indexer {

    constructor(
        @InjectRepository(AuctionRepository) private readonly auctionRepository: Repository<AuctionRepository>,
        @InjectRepository(OfferRepository) private readonly offerRepository: Repository<OfferRepository>,
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
        // create a new offer
        this.offerRepository.save({
            auction_id: auctionId,
            address,
            value
        });
    }
}
