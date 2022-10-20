import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { Auction as AuctionRepository } from "~/shared/entities";
import { AuthService } from "~/auth/auth.service";
import { CreateAuctionDto, FinishAuctionDto } from "./auction.model";
import { AuctionService } from "./auction.service";
import { BalanceService } from "~/balance/balance.service";
import { AccessTokenAuthGuard } from "~/auth/guards";

@Controller("/auction")
export class AuctionController {
    constructor(
        private readonly auctionService: AuctionService,
        private readonly balanceService: BalanceService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(AccessTokenAuthGuard)
    @Post("/create")
    async create(
        @Body()
        params: CreateAuctionDto,
    ) {
        const res = await this.auctionService.create(params);

        return {
            message: "Auction created",
            data: {
                auctionId: res,
            },
        };
    }

    @UseGuards(AccessTokenAuthGuard)
    @Post("/finish")
    async finish(@Body() params: FinishAuctionDto) {
        // TODO: change authentication rules
        // if (!this.authService.isAuthenticated(username, password)) {
        //     throw new UnauthorizedException();
        // }
        // TODO: add a script for finsihing auctions
        // const res = await this.auctionService.finishAuction(params.auctionId);
        // return res;
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

    @Get("/list-finished-auctions")
    async listFinishedAuctionsByPage(
        @Query("page") page: number,
        @Query("auctionByPage") auctionByPage: number,
    ): Promise<AuctionRepository[]> {
        return await this.auctionService.listFinishedAuctionsByPage(
            page,
            auctionByPage,
        );
    }

    @Get("/:auctionId/highest-offers")
    async getHighestOffersByAuctionId(@Param("auctionId") auctionId: number) {
        return await this.balanceService.getHighestBalancesByAuctionId(
            auctionId,
        );
    }

    @Get("/:auctionId/address/:userAddress/balance")
    async getUserBalanceByAuctionId(
        @Param("auctionId") auctionId: number,
        @Param("userAddress") userAddress: string,
    ) {
        return await this.balanceService.getUserBalanceByAuctionId(
            auctionId,
            userAddress.toLowerCase(),
        );
    }

    @Get("/:auctionId")
    async getById(
        @Param("auctionId") auctionId: number,
    ): Promise<AuctionRepository> {
        return await this.auctionService.getById(auctionId);
    }
}
