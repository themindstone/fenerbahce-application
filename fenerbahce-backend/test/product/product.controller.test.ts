import { UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthService } from "~/auth/auth.service";
import { ProductController } from "~/product/product.controller";
import { ProductService } from "~/product/product.service";
import { Product } from "~/shared/entities";

describe("Test Product Controller", () => {
    let productController: ProductController;
    let productService: ProductService;
    let authService: AuthService;

    const mockedRepo = {
        create: jest.fn((id) => Promise.resolve("resolve")),
        save: jest.fn((id) => Promise.resolve("resolve")),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockedRepo,
                },
            ],
        }).compile();

        productService = module.get(ProductService);
        authService = new AuthService();
        productController = new ProductController(productService, authService);
    });

    describe("Test Create Function", async () => {
        const res = await productController.create({
            username: "fb-admin",
            password: "fb-admin",
            startDate: new Date("09-09-2022").toString(),
            endDate: new Date("09-09-2022").toString(),
            name: "name",
            slug: "name",
            auctionImmediatePrice: 1500,
            auctionStartPrice: 150,
            photoUrls: ["/build/_assets/uniform-W6QJQIUR.png", "/build/_assets/uniform-W6QJQIUR.png", "/build/_assets/uniform-W6QJQIUR.png"],
            bidIncrement: 5,
        });

        expect(res).toBe({ message: "Product Created" });

        const res2 = await productController.create({
            username: "",
            password: "fb-admin",
            startDate: new Date("09-09-2022").toString(),
            endDate: new Date("09-09-2022").toString(),
            name: "name",
            slug: "name",
            auctionImmediatePrice: 1500,
            auctionStartPrice: 150,
            photoUrls: ["/build/_assets/uniform-W6QJQIUR.png", "/build/_assets/uniform-W6QJQIUR.png", "/build/_assets/uniform-W6QJQIUR.png"],
            bidIncrement: 5,
        });

        expect(res2).toThrowError(new UnauthorizedException())

    });

});
