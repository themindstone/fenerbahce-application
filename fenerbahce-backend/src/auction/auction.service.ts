import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuctionDto, Auction } from "./auction.model";
import { v4 } from "uuid";
import { Auction as AuctionRepository } from "~/shared/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { AuctionContract } from "~/contracts/auction.contract";

@Injectable()
export class AuctionService {

    auctions: Auction[] = [];

    constructor(
        @InjectRepository(AuctionRepository) private readonly auctionRepository: Repository<AuctionRepository>,
        private readonly auctionContract: AuctionContract
    ) {}

    async create(auction: CreateAuctionDto) {
        const auctionId = v4()
        this.auctionContract.createAuction(auctionId, auction.startDate, auction.endDate, auction.bidIncrement);

        const newAuction: DeepPartial<AuctionRepository> = {
            id: auctionId,
            ...auction
        };

        const createdAuction = this.auctionRepository.create(newAuction);
        await this.auctionRepository.save(createdAuction);
    }

    listByPage(page: number = 1): Auction[] | null {
        if ((page-1) * 10 > this.auctions.length) {
            return null;
        }
        const auctions = [...this.auctions.slice((page - 1) * 10, page * 10)];

        return auctions;
    }

    get(auctionId: string) {
        return Object.assign({}, this.auctions[0]);
    }

    async getBySlug(slug: string): Promise<AuctionRepository> {
        const auction = await this.auctionRepository.findOne({
            select: ["auctionImmediatePrice", "auctionStartPrice", "id", "balances", "photoUrls", "startDate", "slug", "endDate", "name"],
            where: {
                slug
            },
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
