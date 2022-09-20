import { Inject, Injectable } from "@nestjs/common";
// import { Moral as MoralisAPI } from "moralis-v1/node";
import { MoralisAPIModuleOptions } from "./moralisapi.constants";
import { Moralis as MoralisInterface } from "./interface";
import * as Moralis from "moralis-v1/node";


// const MoralisAPI = require("moralis/node");

@Injectable()
export class MoralisAPIService {

    constructor(
        @Inject(MoralisAPIModuleOptions)
        private readonly options: MoralisInterface.Options
    ) {
    }

    async onModuleInit() {
        console.log(Moralis)
        // start(this.options);
    }

    public getClient() {
        // console.log("merhaba dunya")
        return Moralis;
    }

}

