import { Controller, Get } from "@nestjs/common";
import { KYCService } from "./kyc.service";

@Controller("/kyc")
export class KYCController {
    constructor(private readonly kycService: KYCService) {}

    @Get("/address/:address")
    async getUserByAddress() {}
}
