import { Inject, Injectable } from "@nestjs/common";
import { MoralisAPIModuleOptions } from "./moralisapi.constants";
import { Moralis as MoralisInterface } from "./interface";
const Moralis = require("moralis-v1/node");
import IMoralis from "moralis-v1/types";


@Injectable()
export class MoralisAPIService {

    constructor(
        @Inject(MoralisAPIModuleOptions)
        private readonly options: MoralisInterface.Options
    ) {
        Moralis.start(this.options);
    }

    public getClient() {
        return Moralis;
    }

    public async LiveQuery(event: string, listener: (obj: IMoralis.Object<IMoralis.Attributes>) => void) {
        const subs = await new Moralis.Query(event).subscribe();
        subs.on("update", listener);
    }

}

