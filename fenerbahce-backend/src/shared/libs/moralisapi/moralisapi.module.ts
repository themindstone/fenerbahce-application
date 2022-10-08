import { DynamicModule, Global, Module } from "@nestjs/common";
import { MoralisAPIService } from "./moralisapi.service";


@Global()
@Module({})
export class MoralisAPIModule {
    static forRoot(): DynamicModule {
        return {
            global: true,
            module: MoralisAPIModule,
            exports: [MoralisAPIService],
            providers: [
                {
                    provide: MoralisAPIService,
                    useValue: MoralisAPIService
                },
            ]
        }
    }
};

