import { Body, Controller, Get, NotFoundException, Param, Post, Req, UnauthorizedException } from "@nestjs/common";
import { Product as ProductRepository } from "~/shared/entities";
import { Request } from "express";
import { AuthService } from "~/auth/auth.service";
import { CreateProductDto, Product } from "./product.model";
import { ProductService } from "./product.service";

interface CreateProductDtoWithCred extends CreateProductDto {
    username: string;
    password: string;
}

@Controller("/product")
export class ProductController {

    constructor(
        private readonly productService: ProductService,
        private readonly authService: AuthService,
        ) {}

    @Post("/create")
    async create(@Body() { username, password, ...createProductDto }: CreateProductDtoWithCred): Promise<{ message: string }> {

        const isAuthenticated = this.authService.isAuthenticated(username, password);

        if (isAuthenticated) {
            await this.productService.create(createProductDto);
            return {
                message: "Product Created"
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
