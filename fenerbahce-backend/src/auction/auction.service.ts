import { ConsoleLogger, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuctionDto, Auction } from "./auction.model";
import { v4 } from "uuid";
import { Auction as AuctionRepository } from "~/shared/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, LessThan, MoreThan, Repository } from "typeorm";
import { AuctionContract } from "~/contracts/auction.contract";
import {
    AuctionContractErrorsEnglish,
    getAuctionContractErrorMessage,
} from "~/shared/utils";
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

    async create(auction: CreateAuctionDto) {
        // TODO: generate a normal number for auctionId
        // const auctionId = v4();
        try {
            await this.auctionContract.createAuction({
                // auctionId,
                startDate: auction.startDate,
                endDate: auction.endDate,
                startPrice: auction.startPrice,
                buyNowPrice: auction.buyNowPrice,
            });
        } catch (error) {
            throw new NotFoundException();
        }
        try {
            const res = await this.auctionContract.getLatestId();

            if (!Number(res)) {
                throw new Error(
                    "Auction contract createAuction method response is not number",
                );
            }

            // res is the auctionId
            const newAuction: DeepPartial<AuctionRepository> = {
                ...auction,
                id: Number(res),
                // id: auctionId,
                isActive: true,
            };

            const createdAuction = this.auctionRepository.create(newAuction);
            await this.auctionRepository.save(createdAuction);
        } catch (e: any) {
            throw new NotFoundException();
        }
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
                endDate: MoreThan(new Date()),
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

    async finishAuction(
        auctionId: number,
    ): Promise<{ message?: string; error?: string }> {
        let balances, auction;
        try {
            const balancePromise = this.balanceService.getBalancesByAuctionId(
                auctionId,
                {
                    select: ["userAddress", "isRefunded", "balance"],
                    where: { isRefunded: false },
                    order: { balance: "DESC" },
                },
            );
            const auctionPromise = this.auctionRepository.findOne({
                select: [
                    "endDate",
                    "isSelled",
                    "selledToAddress",
                    "buyNowPrice",
                ],
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

        let winner, losers;

        if (auction.isSelled) {
            winner = auction.selledToAddress;
            losers = balances.map((balance) => balance.userAddress);
        } else {
            [winner, ...losers] = balances.map(
                (balance) => balance.userAddress,
            );
        }

        // TODO: we need to send auction.buyNowPrice to Paribu for burning
        // burnMaxOffer()

        try {
            // TODO: update is_refunded to true for all losers with listening events
            await this.auctionContract.refundTokensToUsers(auctionId, losers);
        } catch (e: any) {
            console.log(e);
            return { error: getAuctionContractErrorMessage(e.message) };
        }

        // await this.balanceService.refundAllUsersFBToken(auctionId, losers);

        return {
            message: "success",
        };
    }
}
