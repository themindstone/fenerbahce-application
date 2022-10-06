import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { KYCService } from "./kyc.service";

@Controller("/kyc")
export class KYCController {
    constructor(private readonly kycService: KYCService) {}

    @Post("/create")
    async create(
        @Body()
        params: {
            fullname: string;
            address: string;
            email: string;
            phone: string;
        },
    ) {
        try {
            await this.kycService.create({
                fullname: params.fullname,
                address: params.address,
                email: params.email,
                phone: params.phone,
            });
        } catch (error) {
            throw new Error("An error occured");
        }
    }

    @Get("/address/:address")
    async getUserByAddress(@Param("address") address: string) {
        return await this.kycService.getUserByAddress({ address });
    }
}
