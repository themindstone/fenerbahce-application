import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "~/auth/auth.module";
import { Product } from "~/shared/entities";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            Product,
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
