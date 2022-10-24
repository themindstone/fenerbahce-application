import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "~/auth/auth.module";
import { AuctionModule } from "~/auction/auction.module";
import { DatabaseModule } from "~/shared/database.module";
import {
    EthersModule,
    EthersModuleOptions,
    GOERLI_NETWORK,
    MAINNET_NETWORK,
} from "nestjs-ethers";
import { envPath } from "~/shared/utils";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { IndexerModule } from "~/indexer/indexer.module";
import { ContractsModule } from "~/contracts";
import { BalanceModule } from "~/balance/balance.module";
import { MoralisAPIModule } from "./shared/libs";
import { KYCModule } from "./kyc/kyc.module";
import { UsersModule } from "./users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { MoralisStreamModule } from "./moralisstream/moralisstream.module";

const localEthersConfig: EthersModuleOptions = {
    custom: "http://localhost:8545",
    useDefaultProvider: false,
};

const goerliEthersConfig: EthersModuleOptions = {
    network: GOERLI_NETWORK,
};

const mainnetEthersConfig: EthersModuleOptions = {
    network: MAINNET_NETWORK,
};

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                //   secret: configService.get('JWT_SECRET'),
                //   signOptions: {
                //     expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                //   },
                secret: "secret",
                signOptions: {
                    expiresIn: "60s",
                },
            }),
        }),
    ],
    exports: [JwtModule],
})
export class CoreModule {}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: envPath,
        }),
        CoreModule,
        MoralisAPIModule.forRoot(),
        MoralisStreamModule,
        EthersModule.forRoot(goerliEthersConfig),
        DatabaseModule,
        EventEmitterModule.forRoot(),
        AuthModule,
        UsersModule,
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
