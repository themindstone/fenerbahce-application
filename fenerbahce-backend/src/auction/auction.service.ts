import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuctionDto, Auction } from "./auction.model";
import { v4 } from "uuid";
import { Auction as AuctionRepository, Balance } from "~/shared/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { AuctionContract } from "~/contracts/auction.contract";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AuctionContractCreatedHash } from "~/shared/data";
import { parseUnits } from "nestjs-ethers";

@Injectable()
export class AuctionService {

    auctions: Auction[] = [];

    constructor(
        @InjectRepository(AuctionRepository) private readonly auctionRepository: Repository<AuctionRepository>,
        private readonly auctionContract: AuctionContract,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async create(auction: CreateAuctionDto) {
        const auctionId = v4();
        await this.auctionContract.createAuction({
            auctionId,
            startDate: auction.startDate,
            endDate: auction.endDate,
            bidIncrement: auction.bidIncrement,
            startPrice: auction.startPrice,
            buyNowPrice: auction.buyNowPrice,
        });

        const newAuction: DeepPartial<AuctionRepository> = {
            ...auction,
            id: auctionId,
            isActive: true,
        };

        const createdAuction = this.auctionRepository.create(newAuction);
        await this.auctionRepository.save(createdAuction);
        // this.eventEmitter.emit("auction.created", {});
    }

    listByPage(page: number = 1): Auction[] | null {
        if ((page-1) * 10 > this.auctions.length) {
            return null;
        }
        const auctions = [...this.auctions.slice((page - 1) * 10, page * 10)];

        return auctions;
    }

    async getById(auctionId: string): Promise<any> {
        const auction = await this.auctionRepository
            .findOne({
                select: ["id", "name", "photoUrls", "bidIncrement", "buyNowPrice", "startPrice", "startDate", "endDate"],
                where: {
                    id: auctionId,
                    isActive: true
                }
            });

        if (!auction) {
            throw new NotFoundException();
        }

        return auction;
    }

    async list(): Promise<AuctionRepository[]> {
        return await this.auctionRepository.find();
    }

    async listActiveAuctions(): Promise<AuctionRepository[]> {
        return await this.auctionRepository.find();
    }

    async listHighestOfferAuctions(): Promise<AuctionRepository[]> {
        return await this.auctionRepository.find();
    }

    async activate(auctionId: string) {
        await this.auctionRepository.update(
            { id: auctionId },
            { isActive: true }
        );
    }

}
