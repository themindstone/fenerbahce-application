import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuctionDto, Auction } from "./auction.model";
import { v4 } from "uuid";
import {
    Auction as AuctionRepository,
    Balance as BalanceRepository,
} from "~/shared/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, NoConnectionForRepositoryError, Repository } from "typeorm";
import { AuctionContract } from "~/contracts/auction.contract";

@Injectable()
export class AuctionService {
    auctions: Auction[] = [];

    constructor(
        @InjectRepository(AuctionRepository)
        private readonly auctionRepository: Repository<AuctionRepository>,
        @InjectRepository(BalanceRepository)
        private readonly balanceRepository: Repository<BalanceRepository>,
        private readonly auctionContract: AuctionContract,
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

    listByPage(page = 1): Auction[] | null {
        if ((page - 1) * 10 > this.auctions.length) {
            return null;
        }
        const auctions = [...this.auctions.slice((page - 1) * 10, page * 10)];

        return auctions;
    }

    async getById(auctionId: string): Promise<any> {
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
        return await this.auctionRepository.find();
    }

    async listHighestOfferAuctions(): Promise<AuctionRepository[]> {
        return await this.auctionRepository.find();
    }

    async activate(auctionId: string) {
        await this.auctionRepository.update(
            { id: auctionId },
            { isActive: true },
        );
    }

    async finishAuction(auctionId: string) {
        console.log(auctionId);
        const res = await this.balanceRepository.find({
            select: ["userAddress"],
            where: { auctionId },
            order: { balance: "DESC" },
        });

        if (res.length === 0) {
            return { message: "There is no user paying that auction" };
        }

        const [maxOffer, ...allOtherOffers] = res;
        // we need to send MaxOffer with address to paribu and burn it

        if (allOtherOffers.length === 0) {
            return { message: "Auction max offer refunded" };
        }

        const addresses = allOtherOffers.map((offer) => {
            return offer.userAddress;
        });

        await this.auctionContract.finishAuction(
            auctionId,
            addresses,
        );

        await this.balanceRepository
            .createQueryBuilder()
            .update({
                isRefunded: true,
            })
            .where(`user_address in (:...addresses)`, { addresses })
            .execute();

        return {
            message: "success",
        };
    }
}
