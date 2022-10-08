import { Inject, Injectable } from "@nestjs/common";
// import { MoralisAPIModuleOptions } from "./moralisapi.constants";
// import { Moralis as MoralisInterface } from "./interface";
const Moralis = require("moralis-v1/node");
import IMoralis from "moralis-v1/types";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class MoralisAPIService {

    constructor(
        private readonly configService: ConfigService
    ) {
        const configs = {
            appId: this.configService.get("MORALIS_APP_ID"),
            serverUrl: this.configService.get("MORALIS_SERVER_URL"),
            masterKey: this.configService.get("MORALIS_MASTER_KEY"),
        };
        Moralis.start(configs);
    }

    public getClient() {
        return Moralis;
    }

    public async LiveQuery(event: string, listener: (obj: IMoralis.Object<IMoralis.Attributes>) => void) {
        const subs = await new Moralis.Query(event).subscribe();
        subs.on("update", listener);
    }

}

