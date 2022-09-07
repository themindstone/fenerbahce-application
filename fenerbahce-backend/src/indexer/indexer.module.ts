import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer, Auction } from '~/shared/entities';
import { Indexer } from './indexer';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Auction,
            Offer
        ]),
    ],
    providers: [Indexer],
    exports: [Indexer]
})
export class IndexerModule {}
