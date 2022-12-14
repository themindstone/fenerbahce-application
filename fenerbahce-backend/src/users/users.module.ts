import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "~/shared/entities";
import { UsersService } from "./users.service";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}