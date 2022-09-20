import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuctionDto, Auction } from "./auction.model";
import { v4 } from "uuid";
import {
    Auction as AuctionRepository,
    Balance as BalanceRepository,
} from "~/shared/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { AuctionContract } from "~/contracts/auction.contract";
import {
    AuctionContractErrorsEnglish,
    getAuctionContractErrorMessage,
} from "~/shared/utils";

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
        console.log("merhaba dunya");
        const res = await this.auctionContract.createAuction({
            auctionId,
            startDate: auction.startDate,
            endDate: auction.endDate,
            bidIncrement: auction.bidIncrement,
            startPrice: auction.startPrice,
            buyNowPrice: auction.buyNowPrice,
        });

        console.log("merhaba dunya2");
        console.log(res);
        const newAuction: DeepPartial<AuctionRepository> = {
            ...auction,
            id: auctionId,
            isActive: true,
        };

        const createdAuction = this.auctionRepository.create(newAuction);
        await this.auctionRepository.save(createdAuction);
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

    async finishAuction(
        auctionId: string,
    ): Promise<{ message?: string; error?: string }> {
        let balances, auction;
        try {
            const balancePromise = this.balanceRepository.find({
                select: ["userAddress", "isRefunded"],
                where: { auctionId },
                order: { balance: "DESC" },
            });
            const auctionPromise = this.auctionRepository.findOne({
                select: ["endDate"],
                where: { id: auctionId },
            });

            [balances, auction] = await Promise.all([
                balancePromise,
                auctionPromise,
            ]);
            balances = balances.filter((balance) => !balance.isRefunded);
        } catch (e: any) {
            console.log(e);
            return {
                error: "An error occured, you need to try again",
            };
        }

        if (!auction) {
            return { error: AuctionContractErrorsEnglish.AuctionNotFoundError };
        }

        if (new Date(auction.endDate) >= new Date()) {
            // this auction have yet not to be finished
            return {
                error: AuctionContractErrorsEnglish.AuctionNotFinishedError,
            };
        }

        if (balances.length === 0) {
            try {
                await this.auctionContract.finishAuction(auctionId, []);
                return { message: "There is no user paying that auction" };
            } catch (e: any) {
                return { error: getAuctionContractErrorMessage(e.message) };
            }
        }
        const [maxOffer, ...allOtherOffers] = balances;
        // TODO: we need to send MaxOffer with address to paribu and burn it

        if (allOtherOffers.length === 0) {
            return { message: "Auction max offer will be burnt in Paribu" };
        }

        const addresses = allOtherOffers.map((offer) => {
            return offer.userAddress;
        });

        try {
            await this.auctionContract.finishAuction(auctionId, addresses);
        } catch (e: any) {
            console.log(e);
            return {
                error: getAuctionContractErrorMessage(e.message),
            };
        }

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
