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
        this.kycService.create({
            fullname: params.fullname,
            address: params.address,
            email: params.email,
            phone: params.phone,
        });
    }

    @Get("/address/:address")
    async getUserByAddress(@Param("address") address: string) {
        console.log("heyoo");
        return await this.kycService.getUserByAddress({ address });
    }
}
