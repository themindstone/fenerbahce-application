import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Balance } from "~/shared/entities";
import { BalanceService } from "./balance.service";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Balance])],
    providers: [BalanceService],
    exports: [BalanceService],
})
export class BalanceModule {}
