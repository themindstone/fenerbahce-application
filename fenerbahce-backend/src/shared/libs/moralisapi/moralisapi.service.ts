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
        Moralis.start({
            appId: "vdNEmjLEmhe2ppNlNcCTOHwsIlRpBjdvx51Cddou",
            serverUrl: "https://x4cxia5l3uzt.usemoralis.com:2053/server",
            masterKey: "N0CtY14pMh3mWqvYJaSLUAOeiiD7FjvbouYGaoO1"
        });
    }

    public getClient() {
        return Moralis;
    }

    public async LiveQuery(event: string, listener: (obj: IMoralis.Object<IMoralis.Attributes>) => void) {
        const subs = await new Moralis.Query(event).subscribe();
        subs.on("update", listener);
    }

}

