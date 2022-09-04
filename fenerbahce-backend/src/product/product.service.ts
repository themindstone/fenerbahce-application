import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto, Product } from "./product.model";
import { v4 } from "uuid";
import { Product as ProductRepository } from "~/shared/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class ProductService {

    products: Product[] = [];

    constructor(
        @InjectRepository(ProductRepository) private readonly productRepository: Repository<ProductRepository>,
    ) {}

    create(product: CreateProductDto) {
        const newProduct: DeepPartial<ProductRepository> = {
            id: v4(),
            name: product.name,
            startDate: product.startDate,
            endDate: product.endDate,
            slug: product.slug,
            auctionStartPrice: product.auctionStartPrice,
            auctionImmediatePrice: product.auctionImmediatePrice,
            offers: [],
            photoUrls: product.photoUrls,
        };

        // this.productRepository.create(newProduct);
        this.productRepository.save(newProduct);
    }

    listByPage(page: number = 1): Product[] | null {
        if ((page-1) * 10 > this.products.length) {
            return null;
        }
        const products = [...this.products.slice((page - 1) * 10, page * 10)];

        return products;
    }

    get(productId: string) {
        return Object.assign({}, this.products[0]);
    }

    async getBySlug(slug: string): Promise<ProductRepository> {
        const product = await this.productRepository.findOne({
            select: ["auctionImmediatePrice", "auctionStartPrice", "id", "offers", "photoUrls", "startDate", "slug", "endDate"],
            where: {
                slug
            },
        });

        if (!product) {
            throw new NotFoundException();
        }

        return product;
    }

    async list(): Promise<ProductRepository[]> {
        return await this.productRepository.find();
    }

    async listActiveAuctions(): Promise<ProductRepository[]> {
        return await this.productRepository.find();
    }

    async listHighestOfferAuctions(): Promise<ProductRepository[]> {
        return await this.productRepository.find();
    }
}
