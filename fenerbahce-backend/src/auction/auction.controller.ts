import { Body, Controller, Get, NotFoundException, Param, Post, Req, UnauthorizedException } from "@nestjs/common";
import { Auction as AuctionRepository } from "~/shared/entities";
import { AuthService } from "~/auth/auth.service";
import { CreateAuctionDto, Auction } from "./auction.model";
import { AuctionService } from "./auction.service";

interface CreateAuctionDtoWithCred extends CreateAuctionDto {
    username: string;
    password: string;
}

@Controller("/auction")
export class AuctionController {

    constructor(
        private readonly auctionService: AuctionService,
        private readonly authService: AuthService,
        ) {}

    @Post("/create")
    async create(@Body() { username, password, ...createAuctionDto }: CreateAuctionDtoWithCred): Promise<{ message: string }> {

        const isAuthenticated = this.authService.isAuthenticated(username, password);

        if (isAuthenticated) {
            await this.auctionService.create(createAuctionDto);
            return {
                message: "Auction Created"
            };
        }
        else {
            throw new UnauthorizedException();
        }
    }

    @Get("/page/:page")
    listByPage(@Param("page") page: number): Auction[] {
        const auctions = this.auctionService.listByPage(page);
        if (!auctions) {
            throw new NotFoundException();
        }

        return auctions;
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

    @Get("/slug/:slug")
    async getBySlug(@Param("slug") slug: string): Promise<AuctionRepository> {
        return await this.auctionService.getBySlug(slug);
    }

    @Get("/:auctionId")
    get(@Param("auctionId") auctionId: string): any {
        this.auctionService.get(auctionId);
        return {
            message: "Auction"
        }
    }

}
