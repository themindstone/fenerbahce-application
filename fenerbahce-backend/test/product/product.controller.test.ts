import { UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthService } from "~/auth/auth.service";
import { AuctionController } from "~/auction/auction.controller";
import { AuctionService } from "~/auction/auction.service";
import { Auction } from "~/shared/entities";
import { BalanceService } from "~/balance/balance.service";

describe("Test Auction Controller", () => {
    let auctionController: AuctionController;
    let auctionService: AuctionService;
    let authService: AuthService;
    let balanceService: BalanceService;

    const mockedAuctionRepo = {
        create: jest.fn((id) => Promise.resolve("resolve")),
        save: jest.fn((id) => Promise.resolve("resolve")),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuctionService,
                BalanceService,
                {
                    provide: getRepositoryToken(Auction),
                    useValue: mockedAuctionRepo,
                },
            ],
        }).compile();

        auctionService = module.get(AuctionService);
        authService = new AuthService();
        balanceService = module.get(BalanceService);
        auctionController = new AuctionController(
            auctionService,
            balanceService,
            authService,
        );
    });

    describe("Test Create Function", async () => {
        const res = await auctionController.create({
            username: "fb-admin",
            password: "fb-admin",
            startDate: new Date("09-09-2022").toString(),
            endDate: new Date("09-09-2022").toString(),
            name: "name",
            // slug: "name",
            buyNowPrice: 1500,
            startPrice: 150,
            photoUrls: [
                "/build/_assets/uniform-W6QJQIUR.png",
                "/build/_assets/uniform-W6QJQIUR.png",
                "/build/_assets/uniform-W6QJQIUR.png",
            ],
            bidIncrement: 5,
        });

        expect(res).toBe({ message: "Auction Created" });

        const res2 = await auctionController.create({
            username: "",
            password: "fb-admin",
            startDate: new Date("09-09-2022").toString(),
            endDate: new Date("09-09-2022").toString(),
            name: "name",
            // slug: "name",
            buyNowPrice: 1500,
            startPrice: 150,
            photoUrls: [
                "/build/_assets/uniform-W6QJQIUR.png",
                "/build/_assets/uniform-W6QJQIUR.png",
                "/build/_assets/uniform-W6QJQIUR.png",
            ],
            bidIncrement: 5,
        });

        expect(res2).toThrowError(new UnauthorizedException());
    });
});
