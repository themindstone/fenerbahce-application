import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { KYC } from "~/shared/entities";

@Injectable()
export class KYCService {
    constructor(
        @InjectRepository(KYC)
        private readonly kycRepository: Repository<KYC>,
    ) {}

    async create(params: {
        fullname: string;
        address: string;
        phone: string;
        email: string;
    }) {
        const createdKYC = await this.kycRepository.create(params);
        await this.kycRepository.save(createdKYC);
    }

    async getUserByAddress(params: { address: string }) {
        return await this.kycRepository.findOne({
            select: ["id", "fullname", "address", "phone", "email"],
            where: {
                address: params.address,
            },
        });
    }
}
