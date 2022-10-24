import { Global, Module } from "@nestjs/common";
import { MoralisStreamController } from "./moralisstream.controller";
import { MoralisStreamService } from "./moralisstream.service";

@Global()
@Module({
    providers: [MoralisStreamService],
    controllers: [MoralisStreamController],
    exports: [MoralisStreamService]
})
export class MoralisStreamModule {}
