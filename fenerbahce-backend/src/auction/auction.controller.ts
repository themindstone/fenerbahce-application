import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UnauthorizedException,
} from "@nestjs/common";
import { Auction as AuctionRepository } from "~/shared/entities";
import { AuthService } from "~/auth/auth.service";
import { CreateAuctionDto, FinishAuctionDto } from "./auction.model";
import { AuctionService } from "./auction.service";
import { IsString } from "class-validator";
import { BalanceService } from "~/balance/balance.service";

class FinishAuctionWithCred extends FinishAuctionDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

class CreateAuctionDtoWithCred extends CreateAuctionDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

@Controller("/auction")
export class AuctionController {
    constructor(
        private readonly auctionService: AuctionService,
        private readonly balanceService: BalanceService,
        private readonly authService: AuthService,
    ) {}

    @Post("/create")
    async create(
        @Body()
        { username, password, ...createAuctionDto }: CreateAuctionDtoWithCred,
    ): Promise<{ message: string }> {
        const isAuthenticated = this.authService.isAuthenticated(
            username,
            password,
        );

        if (!isAuthenticated) {
            throw new UnauthorizedException();
        }

        await this.auctionService.create(createAuctionDto);

        return {
            message: "Auction Created",
        };
    }

    @Post("/finish")
    async finish(
        @Body() { username, password, auctionId }: FinishAuctionWithCred,
    ) {
        if (!this.authService.isAuthenticated(username, password)) {
            throw new UnauthorizedException();
        }
        const res = await this.auctionService.finishAuction(auctionId);
        console.log(res);
        return res;
    }

    @Get("/list")
    async list(): Promise<AuctionRepository[]> {
        return await this.auctionService.list();
    }

    @Get("/list-active-auctions")
    listActiveAuctions(): any {
        return this.auctionService.listActiveAuctions();
    }

    @Get("/byPage")
    getAuctionsByPage(
        @Query("page") page: number,
        @Query("auctionByPage") auctionByPage: number,
    ) {
        return this.auctionService.getAuctionsByPage({ page, auctionByPage });
    }

    @Get("/list-highest-offer-auctions")
    async listHighestOfferAuctions(): Promise<AuctionRepository[]> {
        return await this.auctionService.listHighestOfferAuctions();
    }

    async listFinishedAuctionsByPage(
        @Query("page") page: number,
        @Query("auctionByPage") auctionByPage: number,
    ): Promise<AuctionRepository[]> {
        return await this.auctionService.listFinishedAuctionsByPage(page, auctionByPage);
    }

    @Get("/:auctionId/highest-offers")
    async getHighestOffersByAuctionId(@Param("auctionId") auctionId: string) {
        return await this.balanceService.getHighestBalancesByAuctionId(
            auctionId,
        );
    }

    @Get("/:auctionId/address/:userAddress/balance")
    async getUserBalanceByAuctionId(
        @Param("auctionId") auctionId: string,
        @Param("userAddress") userAddress: string,
    ) {
        return await this.balanceService.getUserBalanceByAuctionId(
            auctionId,
            userAddress.toLowerCase(),
        );
    }

    @Get("/:auctionId")
    async getById(
        @Param("auctionId") auctionId: string,
    ): Promise<AuctionRepository> {
        return await this.auctionService.getById(auctionId);
    }
}
