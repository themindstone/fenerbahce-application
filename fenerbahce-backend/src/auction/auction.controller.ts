import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    UnauthorizedException,
} from "@nestjs/common";
import { Auction as AuctionRepository } from "~/shared/entities";
import { AuthService } from "~/auth/auth.service";
import { CreateAuctionDto, Auction } from "./auction.model";
import { AuctionService } from "./auction.service";
import { IsString } from "class-validator";
import { BalanceService } from "~/balance/balance.service";

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

    @Get("/list")
    async list(): Promise<AuctionRepository[]> {
        return await this.auctionService.list();
    }

    @Get("/list-active-auctions")
    listActiveAuctions(): any {
        return this.auctionService.listActiveAuctions();
    }

    @Get("/list-highest-offer-auctions")
    async listHighestOfferAuctions(): Promise<AuctionRepository[]> {
        return await this.auctionService.listHighestOfferAuctions();
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
            userAddress,
        );
    }

    @Get("/:auctionId")
    async getById(
        @Param("auctionId") auctionId: string,
    ): Promise<AuctionRepository> {
        return await this.auctionService.getById(auctionId);
    }
}
