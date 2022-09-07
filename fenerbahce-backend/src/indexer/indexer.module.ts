import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer, Auction } from '~/shared/entities';
import { IndexerController } from './indexer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Auction,
            Offer
        ]),
        // ContractModule,
    ],
    controllers: [IndexerController]
})
export class IndexerModule {}
