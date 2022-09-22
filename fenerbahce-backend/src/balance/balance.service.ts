import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { Balance as BalanceRepository } from "~/shared/entities";

@Injectable()
export class BalanceService {
    constructor(
        @InjectRepository(BalanceRepository)
        private readonly balanceRepository: Repository<BalanceRepository>,
    ) {}

    async getHighestBalancesByAuctionId(
        auctionId: string,
    ): Promise<BalanceRepository[]> {
        return await this.balanceRepository.find({
            select: ["id", "balance", "userAddress"],
            where: {
                auctionId,
            },
            order: {
                balance: "desc",
            },
        });
    }

    async getUserBalanceByAuctionId(
        auctionId: string,
        userAddress: string,
    ): Promise<BalanceRepository[] | null> {
        const res = await this.balanceRepository
            .createQueryBuilder()
            .select("*")
            .where("auction_id = :auctionId", { auctionId })
            .execute();
        if (res.length === 0) {
            return null;
        }

        return res[0];
    }

    async getBalancesByAuctionId(
        auctionId: string,
        options: FindManyOptions<BalanceRepository>,
    ): Promise<BalanceRepository[]> {
        return await this.balanceRepository.find({
            ...options,
            where: {
                ...options.where,
                auctionId,
            },
        });
    }

    async refundAllUsersFBToken(auctionId: string, addresses: string[]) {
        await this.balanceRepository
            .createQueryBuilder()
            .update({
                isRefunded: true,
            })
            .where(`user_address in (:...addresses)`, { addresses })
            .andWhere("auction_id = :auctionId", { auctionId })
            .execute();
    }
}
