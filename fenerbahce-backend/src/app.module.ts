import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "~/auth/auth.module";
import { AuctionModule } from "~/auction/auction.module";
import { DatabaseModule } from "~/shared/database.module";
import { EthersModule, EthersModuleOptions } from "nestjs-ethers";
import { envPath } from "~/shared/utils";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { IndexerModule } from "~/indexer/indexer.module";
import { ContractsModule } from "~/contracts";
import { BalanceModule } from "~/balance/balance.module";
// import { MoralisAPIModule } from "./shared/libs";

const localEthersConfig: EthersModuleOptions = {
    custom: "http://localhost:8545",
    useDefaultProvider: false,
};

// const fujiEthersConfig: EthersModuleOptions = {
//     custom: {
//         url: "https://eth-mainnet.g.alchemy.com/v2/fMCE1lXY5v0mfIOR0lZjxG_MVcZqT0BE",
//     },
//     useDefaultProvider: false,
//     alchemy: "fMCE1lXY5v0mfIOR0lZjxG_MVcZqT0BE",
// };

const fujiEthersConfig: EthersModuleOptions = {
    network: {
        chainId: 43113,
        name: "avalanche-fuji",
    },
    useDefaultProvider: false,
    custom: { url: "https://api.avax-test.network/ext/bc/C/rpc" },
};

@Module({
    imports: [
        // MoralisAPIModule.forRoot({
        // appId: "TQbbsjto3Rbo2ZUkHZtpx6mD9Pj8pMRNcnL7GNUc", serverUrl: "https://rfkyqvw4bkox.usemoralis.com:2053/server", masterKey: "uyCmaY0URZL3DJfZFzsv1i1GZx6Gf90sPejaAGWx"
        // }),
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
