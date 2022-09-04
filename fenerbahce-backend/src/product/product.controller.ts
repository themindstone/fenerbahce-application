import { Controller, Get, NotFoundException, Param, Post, Req, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product as ProductRepository } from "~/shared/entities";
import { Request } from "express";
import { AuthService } from "~/auth/auth.service";
import { Product } from "./product.model";
import { ProductService } from "./product.service";

@Controller("/product")
export class ProductController {

    constructor(
        private readonly productService: ProductService,
        private readonly authService: AuthService,
        ) {}

    @Post("/create")
    create(@Req() req: Request): any {
        const { username, password, ...createProductDto } = req.body;

        const isAuthenticated = this.authService.isAuthenticated(username, password);

        if (isAuthenticated) {
            this.productService.create(createProductDto);
            return {
                message: "Product created"
            };
        }
        else {
            throw new UnauthorizedException();
        }
    }

    @Get("/page/:page")
    listByPage(@Param("page") page: number): Product[] {
        const products = this.productService.listByPage(page);
        if (!products) {
            throw new NotFoundException();
        }
        
        return products;
    }

    @Get("/list")
    async list(): Promise<ProductRepository[]> {
        return await this.productService.list();
    }

    @Get("/list-active-auctions")
    listActiveAuctions(): any {
        return this.productService.listActiveAuctions();
    }

    @Get("/list-highest-offer-auctions")
    async listHighestOfferAuctions(): Promise<ProductRepository[]> {
        return await this.productService.listHighestOfferAuctions();
    }

    @Get("/slug/:slug")
    async getBySlug(@Param("slug") slug: string): Promise<ProductRepository> {
        return await this.productService.getBySlug(slug);
    }

    @Get("/:productId")
    get(@Param("productId") productId: string): any {
        this.productService.get(productId);
        return {
            message: "product"
        }
    }

}
