import { DynamicModule, Global, Module } from "@nestjs/common";
import { MoralisAPIModuleOptions } from "./moralisapi.constants";
import { MoralisAPIService } from "./moralisapi.service";
import type { Moralis } from "./interface";


@Global()
@Module({})
export class MoralisAPIModule {
    static forRoot(options: Moralis.Options): DynamicModule {
        return {
            ...options,
            global: true,
            module: MoralisAPIModule,
            exports: [MoralisAPIService, MoralisAPIModuleOptions],
            providers: [
                {
                    provide: MoralisAPIService,
                    useValue: MoralisAPIService
                },
                {
                    provide: MoralisAPIModuleOptions,
                    useValue: options
                },
            ]
        }
    }
};

