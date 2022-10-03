import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KYC } from "~/shared/entities";
import { KYCController } from "./kyc.controller";
import { KYCService } from "./kyc.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([KYC]),
    ],
    controllers: [KYCController],
    providers: [KYCService],

})
export class KYCModule {
}