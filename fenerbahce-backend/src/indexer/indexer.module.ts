import { Module } from "@nestjs/common";
import { Indexer } from "./indexer";

@Module({
    providers: [Indexer],
})
export class IndexerModule {}
