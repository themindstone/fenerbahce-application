import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Balance as BalanceRepository } from "~/shared/entities";


@Injectable()
export class BalanceService {

    constructor(
        @InjectRepository(BalanceRepository) private readonly balanceRepository: Repository<BalanceRepository>
    ) {}

    async getHighestBalancesByAuctionId(auctionId: string): Promise<BalanceRepository[]> {
        return await this.balanceRepository.find({
            select: ["id", "balance", "userAddress"],
            where: {
                auctionId
            },
            order: {
                balance: "desc"
            }
        })
    }

    async getUserBalanceByAuctionId(auctionId: string, userAddress: string): Promise<BalanceRepository | null> {
        return await this.balanceRepository.findOne({
            select: ["id", "balance", "userAddress"],
            where: { auctionId, userAddress }
        });
    }

}