import { Inject, Injectable } from "@nestjs/common";
import MoralisAPI from "moralis-v1/node";
import { MoralisAPIModuleOptions } from "./moralisapi.constants";
import { Moralis } from "./interface";

@Injectable()
export class MoralisAPIService {

    constructor(
        @Inject(MoralisAPIModuleOptions)
        private readonly options: Moralis.Options
    ) {
    }

    async onModuleInit() {
        await MoralisAPI.start(this.options);
    }

    static client() {
        return MoralisAPI;
    }

}

