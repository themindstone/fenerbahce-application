import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuctionDto, Auction } from "./auction.model";
import { v4 } from "uuid";
import { Auction as AuctionRepository } from "~/shared/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class AuctionService {

    auctions: Auction[] = [];

    constructor(
        @InjectRepository(AuctionRepository) private readonly auctionRepository: Repository<AuctionRepository>,
    ) {}

    async create(auction: CreateAuctionDto) {
        const newAuction: DeepPartial<AuctionRepository> = {
            id: v4(),
            name: auction.name,
            startDate: auction.startDate,
            endDate: auction.endDate,
            slug: auction.slug,
            auctionStartPrice: auction.auctionStartPrice,
            auctionImmediatePrice: auction.auctionImmediatePrice,
            offers: [],
            photoUrls: auction.photoUrls,
            bidIncrement: auction.bidIncrement,
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
            select: ["auctionImmediatePrice", "auctionStartPrice", "id", "offers", "photoUrls", "startDate", "slug", "endDate", "name"],
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
}
