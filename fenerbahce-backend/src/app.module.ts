import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "~/auth/auth.module";
import { AuctionModule } from "~/auction/auction.module";
import { DatabaseModule } from "~/shared/database.module";
import { EthersModule, EthersModuleOptions, GOERLI_NETWORK } from "nestjs-ethers";
import { envPath } from "~/shared/utils";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { IndexerModule } from "~/indexer/indexer.module";
import { ContractsModule } from "~/contracts";
import { BalanceModule } from "~/balance/balance.module";
import { MoralisAPIModule } from "./shared/libs";
import { KYCModule } from "./kyc/kyc.module";

const localEthersConfig: EthersModuleOptions = {
    custom: "http://localhost:8545",
    useDefaultProvider: false,
};

const goerliEthersConfig: EthersModuleOptions = {
    network: GOERLI_NETWORK,
};


@Module({
    imports: [
        MoralisAPIModule.forRoot({
            appId: "vdNEmjLEmhe2ppNlNcCTOHwsIlRpBjdvx51Cddou",
            serverUrl: "https://x4cxia5l3uzt.usemoralis.com:2053/server",
            masterKey: "N0CtY14pMh3mWqvYJaSLUAOeiiD7FjvbouYGaoO1"
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: envPath,
        }),
        EthersModule.forRoot(goerliEthersConfig),
        DatabaseModule,
        EventEmitterModule.forRoot(),
        AuthModule,
        AuctionModule,
        BalanceModule,
        KYCModule,
        ContractsModule,
        IndexerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
