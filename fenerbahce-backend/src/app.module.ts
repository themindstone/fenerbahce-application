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
            appId: "AWcjcv7yXDtXE5xnBab8nJriGDYeiOORlBoIVcfc",
            serverUrl: "https://ou5qzymisfzs.usemoralis.com:2053/server",
            masterKey: "KNEbIJandZZZ6MBNZF4gYhx0ExPeXVdt73bRsrN0"
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: envPath,
        }),
        EthersModule.forRoot(localEthersConfig),
        DatabaseModule,
        EventEmitterModule.forRoot(),
        AuthModule,
        AuctionModule,
        BalanceModule,
        ContractsModule,
        IndexerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
