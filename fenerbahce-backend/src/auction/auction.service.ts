import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuctionDto, Auction } from "./auction.model";
import { Auction as AuctionRepository } from "~/shared/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, LessThan, LessThanOrEqual, MoreThan, Repository } from "typeorm";
import { AuctionContract } from "~/contracts/auction.contract";
import { BalanceService } from "~/balance/balance.service";

@Injectable()
export class AuctionService {
    auctions: Auction[] = [];

    constructor(
        @InjectRepository(AuctionRepository)
        private readonly auctionRepository: Repository<AuctionRepository>,
        private readonly auctionContract: AuctionContract,
        private readonly balanceService: BalanceService,
    ) {}

    async create(auction: CreateAuctionDto): Promise<number> {
        const auctionId = await this.auctionRepository
            .createQueryBuilder()
            .insert()
            .into(AuctionRepository)
            .values({
                ...auction,
                isActive: true
            })
            .returning("id")
            .execute()
            .then((r) => r.generatedMaps[0].id);
        return Number(auctionId);
    }

    listByPage(page = 1): Auction[] | null {
        if ((page - 1) * 10 > this.auctions.length) {
            return null;
        }
        const auctions = [...this.auctions.slice((page - 1) * 10, page * 10)];

        return auctions;
    }

    async getById(auctionId: number): Promise<any> {
        const auction = await this.auctionRepository.findOne({
            select: [
                "id",
                "name",
                "selledToAddress",
                "photoUrls",
                "bidIncrement",
                "buyNowPrice",
                "startPrice",
                "startDate",
                "endDate",
                "isSelled",
                "isActive",
            ],
            where: {
                id: auctionId,
            },
        });

        if (!auction) {
            throw new NotFoundException();
        }

        return auction;
    }

    async getAuctionsByPage({
        page,
        auctionByPage,
    }: {
        page: number;
        auctionByPage: number;
    }): Promise<any> {
        const startPoint = (page - 1) * auctionByPage;

        return await this.auctionRepository.find({
            select: [
                "id",
                "buyNowPrice",
                "name",
                "balances",
                "isActive",
                "isSelled",
                "photoUrls",
                "startDate",
                "endDate",
                "selledToAddress",
            ],
            skip: startPoint,
            take: auctionByPage,
        });
    }

    async list(): Promise<AuctionRepository[]> {
        return await this.auctionRepository.find();
    }

    async listActiveAuctions(): Promise<AuctionRepository[]> {
        const res = await this.auctionRepository.find({
            select: [
                "id",
                "name",
                "selledToAddress",
                "photoUrls",
                "bidIncrement",
                "buyNowPrice",
                "startPrice",
                "startDate",
                "endDate",
                "isSelled",
                "isActive",
            ],
            where: {
                isSelled: false,
                startDate: LessThan(new Date()),
                endDate: MoreThan(new Date()),
                isActive: true
            },
        });
        return res;
    }

    async listHighestOfferAuctions(): Promise<AuctionRepository[]> {
        return await this.auctionRepository.find({
            select: [
                "id",
                "name",
                "selledToAddress",
                "photoUrls",
                "bidIncrement",
                "buyNowPrice",
                "startPrice",
                "startDate",
                "endDate",
                "isSelled",
                "isActive",
            ],
            where: {
                isSelled: false,
                endDate: MoreThan(new Date()),
            },
        });
    }

    async listFinishedAuctionsByPage(
        page: number,
        auctionByPage: number,
    ): Promise<AuctionRepository[]> {
        return await this.auctionRepository.find({
            select: [
                "id",
                "buyNowPrice",
                "name",
                "balances",
                "isActive",
                "isSelled",
                "photoUrls",
                "startDate",
                "endDate",
                "selledToAddress",
            ],
            where: [
                {
                    endDate: LessThan(new Date()),
                },
                { isSelled: true },
            ],
        });
    }

    async activate(auctionId: number) {
        await this.auctionRepository.update(
            { id: auctionId },
            { isActive: true },
        );
    }

    async update(auctionId: number, params: DeepPartial<AuctionRepository>) {
        const res = await this.auctionRepository.update(
            { id: auctionId },
            params,
        );

        return res;
    }
}
